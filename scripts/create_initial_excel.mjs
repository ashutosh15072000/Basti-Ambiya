import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

// Initial structure with header and sample schema explanation
const headers = [
  'Submission Date & Time',
  'Guest Name',
  'Phone Number',
  'Attending?',
  'Total Guests Attending',
  'Ceremonies Attending',
  'Dietary Preferences',
  'Duas & Heartfelt Message',
];

const sampleRows = [
  {
    'Submission Date & Time': '2026-09-25 10:30 AM',
    'Guest Name': 'Sample Guest (System Template)',
    'Phone Number': '+91 98765 43210',
    'Attending?': 'Yes',
    'Total Guests Attending': 2,
    'Ceremonies Attending': 'The Sacred Wedding & Rukhsati (Shimla Resort); Wedding Reception (Radiant Resorts Gorakhpur)',
    'Dietary Preferences': 'Halal',
    'Duas & Heartfelt Message': 'May Allah SWT bless Basit & Ambiya with endless love, peace, and prosperity in their new journey together. Ameen!',
  },
];

const ws = XLSX.utils.json_to_sheet(sampleRows, { header: headers });

// Column widths for clean luxury presentation
ws['!cols'] = [
  { wch: 24 }, // Date
  { wch: 28 }, // Guest Name
  { wch: 18 }, // Phone
  { wch: 14 }, // Attending
  { wch: 22 }, // Guest Count
  { wch: 45 }, // Ceremonies
  { wch: 20 }, // Dietary
  { wch: 55 }, // Duas & Message
];

const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Wedding RSVPs');

// Write to public/wedding-rsvps.xlsx and root wedding-rsvps.xlsx
const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

if (!fs.existsSync('public')) {
  fs.mkdirSync('public', { recursive: true });
}

fs.writeFileSync('public/wedding-rsvps.xlsx', buffer);
fs.writeFileSync('wedding-rsvps.xlsx', buffer);
console.log('Successfully generated public/wedding-rsvps.xlsx and wedding-rsvps.xlsx');
