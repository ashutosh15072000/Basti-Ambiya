# Ambiya & Basti Ali — Muslim Wedding Invitation Website 🕊️✨

A luxury Muslim Wedding Invitation and Nikah celebration web application for **Ambiya & Basti Ali** (29th October 2026).

Built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS**.

---

## 🚀 Easy Hosting on GitHub Pages (Recommended)

This repository is already pre-configured for seamless GitHub hosting.

### Method 1: Automatic Deployment with GitHub Actions (Zero manual commands)

1. Create a new repository on [GitHub](https://github.com/new).
2. Push this project to your repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Wedding Invitation"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPOSITORY_NAME>.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** → **Pages** (in the left sidebar).
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. That's it! GitHub Actions will automatically build and publish your site at:
   `https://<YOUR_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>/`

---

### Method 2: One-Command Manual Deployment (`npm run deploy`)

If you prefer deploying directly from your local terminal:

1. In `package.json`, you can optionally add your homepage URL:
   ```json
   "homepage": "https://<YOUR_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>"
   ```
2. Run the deployment command:
   ```bash
   npm run deploy
   ```
3. In your GitHub repository under **Settings** → **Pages**, ensure the Source is set to deploy from the `gh-pages` branch.

---

## 💻 Local Development

To run the project locally on your machine:

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 📦 Production Build

To test the production build locally:

```bash
npm run build
npm run preview
```

The compiled static files will be generated in the `dist/` directory.

---

## 🎨 Key Features Included
- **Islamic Calligraphy & Duas**: Sacred *Bismillahir Rahmanir Raheem*, Surah Ar-Rum ayat, and Sunnah Nikah blessings.
- **Architectural Mihrab Arch & Gilded Lanterns**: Pure SVG Islamic motifs, fanous lanterns with ambient glowing lights, and geometric lattice patterns.
- **Interactive Scratch-to-Reveal Card**: Interactive scratch card revealing the wedding date with celebratory confetti.
- **Dynamic Real-Time Countdown**: Countdown to Thursday, 29th October 2026.
- **Ceremony Schedule Cards**: Haldi & Manjha, Mehndi & Sangeet, Nikah, and Walima with Google Maps links and calendar shortcuts.
- **Background Music Player**: Gentle instrumental wedding nasheed with toggle mute/unmute control.
- **Photo Gallery Carousel**: Smooth touch and drag navigation for cherished moments.
- **Interactive RSVP Form**: Client-side response form with instant guest confirmation.
