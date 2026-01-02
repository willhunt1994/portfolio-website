# Portfolio Website

A modern portfolio website built with Next.js, TypeScript, and Tailwind CSS, ready to deploy on Vercel.

## Getting Started

### Development

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
npm start
```

## Deployment on Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/mranav2/portfolio-website.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts to deploy.

### Environment Variables

If you need environment variables:
- Add them in the Vercel dashboard under Project Settings → Environment Variables
- Or create a `.env.local` file for local development (not committed to git)

## Project Structure

```
portfolio-website/
├── app/              # Next.js app directory
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   └── globals.css   # Global styles
├── public/           # Static assets
├── components/       # React components (create as needed)
└── lib/              # Utility functions (create as needed)
```

## Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Deployment:** Vercel
