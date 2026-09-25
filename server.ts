import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as XLSX from 'xlsx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';

app.use(express.json());

const EXCEL_PUBLIC_PATH = path.resolve(__dirname, 'public/wedding-rsvps.xlsx');
const EXCEL_ROOT_PATH = path.resolve(__dirname, 'wedding-rsvps.xlsx');
const DATA_DIR = path.resolve(__dirname, 'data');
const JSON_BACKUP_PATH = path.resolve(DATA_DIR, 'rsvps.json');

// Ensure data directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(path.resolve(__dirname, 'public'))) {
  fs.mkdirSync(path.resolve(__dirname, 'public'), { recursive: true });
}

interface RsvpEntry {
  id: string;
  submitted_at: string;
  guest_name: string;
  phone?: string | null;
  attending: 'yes' | 'no';
  guest_count: number;
  events: string[];
  dietary?: string | null;
  message?: string | null;
}

function loadRsvps(): RsvpEntry[] {
  if (fs.existsSync(JSON_BACKUP_PATH)) {
    try {
      const data = fs.readFileSync(JSON_BACKUP_PATH, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  return [];
}

function saveRsvps(entries: RsvpEntry[]): void {
  // 1. Save JSON backup
  fs.writeFileSync(JSON_BACKUP_PATH, JSON.stringify(entries, null, 2), 'utf-8');

  // 2. Build and save Excel workbook
  const rows = entries.map((r, idx) => ({
    'S.No': idx + 1,
    'Submission Date': r.submitted_at,
    'Guest Name': r.guest_name,
    'Contact Phone': r.phone || 'N/A',
    'Attending Status': r.attending === 'yes' ? 'Confirmed (Attending)' : 'Respectfully Declined',
    'Total Guests Attending': r.attending === 'yes' ? r.guest_count : 0,
    'Ceremonies Selected': r.events && r.events.length > 0 ? r.events.join('; ') : 'All Celebrations / General',
    'Dietary Preferences': r.dietary || 'None specified',
    'Heartfelt Duas & Message': r.message || '—',
  }));

  const wb = XLSX.utils.book_new();
  const ws = rows.length > 0
    ? XLSX.utils.json_to_sheet(rows)
    : XLSX.utils.json_to_sheet([
        {
          'S.No': 1,
          'Submission Date': new Date().toISOString(),
          'Guest Name': 'Template Initialized',
          'Contact Phone': '—',
          'Attending Status': 'Awaiting Responses',
          'Total Guests Attending': 0,
          'Ceremonies Selected': '—',
          'Dietary Preferences': '—',
          'Heartfelt Duas & Message': 'Wedding RSVP Registry for Basit Ali & Ambiya Basher',
        },
      ]);

  ws['!cols'] = [
    { wch: 8 },
    { wch: 22 },
    { wch: 28 },
    { wch: 18 },
    { wch: 24 },
    { wch: 24 },
    { wch: 45 },
    { wch: 22 },
    { wch: 55 },
  ];

  XLSX.utils.book_append_sheet(wb, ws, 'RSVP Responses');

  const totalGuests = entries.reduce((acc, cur) => acc + (cur.attending === 'yes' ? cur.guest_count : 0), 0);
  const attendingCount = entries.filter((e) => e.attending === 'yes').length;
  const summaryWs = XLSX.utils.json_to_sheet([
    { Metric: 'Couple', Value: 'Basit Ali & Ambiya Basher' },
    { Metric: 'Wedding Date', Value: 'Thursday, 29th October 2026' },
    { Metric: 'Total RSVP Responses', Value: entries.length },
    { Metric: 'Confirmed Attending Responses', Value: attendingCount },
    { Metric: 'Total Guests (Heads)', Value: totalGuests },
    { Metric: 'Last Updated', Value: new Date().toISOString() },
  ]);
  summaryWs['!cols'] = [{ wch: 32 }, { wch: 35 }];
  XLSX.utils.book_append_sheet(wb, summaryWs, 'Summary & Statistics');

  const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
  fs.writeFileSync(EXCEL_PUBLIC_PATH, buffer);
  fs.writeFileSync(EXCEL_ROOT_PATH, buffer);
}

// REST API Endpoints
app.get('/api/rsvp', (_req: Request, res: Response) => {
  const rsvps = loadRsvps();
  res.json({ success: true, count: rsvps.length, rsvps });
});

app.post('/api/rsvp', async (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (!body || !body.guest_name) {
      return res.status(400).json({ success: false, error: 'guest_name is required' });
    }

    const current = loadRsvps();
    const newEntry: RsvpEntry = {
      id: body.id || `rsvp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      submitted_at: body.submitted_at || new Date().toISOString(),
      guest_name: String(body.guest_name).trim(),
      phone: body.phone ? String(body.phone).trim() : null,
      attending: body.attending === 'no' ? 'no' : 'yes',
      guest_count: Number(body.guest_count) || (body.attending === 'no' ? 0 : 1),
      events: Array.isArray(body.events) ? body.events : [],
      dietary: body.dietary ? String(body.dietary).trim() : null,
      message: body.message ? String(body.message).trim() : null,
    };

    current.push(newEntry);
    saveRsvps(current);

    // Optional: Auto-commit to GitHub if environment variables are set
    const ghToken = process.env.GITHUB_TOKEN;
    const ghOwner = process.env.GITHUB_OWNER;
    const ghRepo = process.env.GITHUB_REPO;
    const ghBranch = process.env.GITHUB_BRANCH || 'main';

    let githubStatus: string | null = null;
    if (ghToken && ghOwner && ghRepo) {
      try {
        const filePath = 'wedding-rsvps.xlsx';
        const buffer = fs.readFileSync(EXCEL_ROOT_PATH);
        const base64 = buffer.toString('base64');

        // Check existing file SHA
        let sha: string | undefined = undefined;
        try {
          const getRes = await fetch(
            `https://api.github.com/repos/${ghOwner}/${ghRepo}/contents/${filePath}?ref=${ghBranch}`,
            {
              headers: {
                Authorization: `Bearer ${ghToken}`,
                Accept: 'application/vnd.github.v3+json',
              },
            }
          );
          if (getRes.ok) {
            const data = (await getRes.json()) as any;
            sha = data.sha;
          }
        } catch {
          // New file
        }

        const putRes = await fetch(
          `https://api.github.com/repos/${ghOwner}/${ghRepo}/contents/${filePath}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${ghToken}`,
              Accept: 'application/vnd.github.v3+json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: `Update wedding RSVP Excel registry: ${newEntry.guest_name}`,
              content: base64,
              sha,
              branch: ghBranch,
            }),
          }
        );

        if (putRes.ok) {
          githubStatus = 'Synced to GitHub repository';
        }
      } catch (ghErr) {
        console.warn('Server GitHub commit error:', ghErr);
      }
    }

    return res.status(201).json({
      success: true,
      message: 'RSVP recorded and Excel sheet updated',
      record: newEntry,
      githubStatus,
    });
  } catch (err: any) {
    console.error('API /api/rsvp error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Server error' });
  }
});

app.get('/api/rsvp/download', (_req: Request, res: Response) => {
  if (fs.existsSync(EXCEL_PUBLIC_PATH)) {
    return res.download(EXCEL_PUBLIC_PATH, 'Basit-Ambiya-Wedding-RSVPs.xlsx');
  } else if (fs.existsSync(EXCEL_ROOT_PATH)) {
    return res.download(EXCEL_ROOT_PATH, 'Basit-Ambiya-Wedding-RSVPs.xlsx');
  }
  return res.status(404).send('Excel file not generated yet');
});

async function startServer() {
  if (!IS_PROD) {
    // In development, mount Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve dist folder
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Wedding server running at http://localhost:${PORT} (${IS_PROD ? 'prod' : 'dev'})`);
  });
}

startServer();
