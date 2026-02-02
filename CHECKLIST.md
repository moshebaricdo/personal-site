# Portfolio Setup Checklist

A step-by-step guide to get the portfolio live.

---

## Phase 1: Environment Setup

- [ ] **Install dependencies**
  ```bash
  npm install
  ```

- [ ] **Start development server**
  ```bash
  npm run dev
  ```
  Visit `http://localhost:3000` to see the site

---

## Phase 2: Personal Branding

### Avatar
- [ ] Add profile photo to `public/images/avatar.jpg`
  - Recommended: 120x120px minimum, square aspect ratio
  - Formats: JPG or PNG

### Typography (Choose one)
- [ ] **Option A:** Add Signifier font files
  - Add `signifier-regular.woff2` to `public/fonts/`
  - Purchase from [Klim Type Foundry](https://klim.co.nz/retail-fonts/signifier/)
  
- [ ] **Option B:** Swap for a free alternative
  - Update `--font-serif` in `src/styles/tokens.css`
  - Good alternatives: `'Playfair Display'`, `'Libre Baskerville'`, `'Source Serif Pro'`
  - Add Google Fonts link to `src/app/layout.tsx` if needed

### Social Links
- [ ] Update social URLs in `src/components/SocialLinks/index.tsx`
  - X (Twitter): `https://x.com/yourusername`
  - GitHub: `https://github.com/yourusername`
  - LinkedIn: `https://linkedin.com/in/yourusername`
  - Add/remove platforms as needed

### Bio & Metadata
- [ ] Update name and tagline in `src/components/Hero/index.tsx`
- [ ] Update site metadata in `src/app/layout.tsx`
  - Title, description, URL, Open Graph info

---

## Phase 3: Content

### Projects
- [ ] Add your projects to `src/data/projects.ts`
  ```ts
  {
    slug: 'project-name',
    title: 'Project Title',
    description: 'Brief description',
    url: '/work/project-name',
  }
  ```

- [ ] Add project images to `public/images/projects/{slug}/`
  - `hero.jpg` — Main project image
  - Additional images as needed

### Project Pages (Optional for MVP)
- [ ] Create case study pages at `src/app/work/[slug]/page.tsx`

### Writing (Optional)
- [ ] Add articles to `src/data/writing.ts`
- [ ] Create writing list component if needed

---

## Phase 4: Polish

### Open Graph Image
- [ ] Create and add `public/images/og-image.jpg` (1200x630px)
  - Used when sharing on social media

### Favicon
- [ ] Add favicon files to `public/`
  - `favicon.ico`
  - `apple-touch-icon.png` (180x180px)

### Test Dark Mode
- [ ] Toggle system dark mode and verify colors look correct

### Test Responsive
- [ ] Check mobile layout (375px width)
- [ ] Check tablet layout (768px width)
- [ ] Check desktop layout (1200px+ width)

### Accessibility
- [ ] Run Lighthouse audit in Chrome DevTools
- [ ] Verify keyboard navigation works
- [ ] Check color contrast ratios

---

## Phase 5: Deploy

### Build Check
- [ ] Run production build
  ```bash
  npm run build
  ```
- [ ] Fix any build errors

### Deployment Options
- [ ] **Vercel** (recommended for Next.js)
  ```bash
  npm i -g vercel
  vercel
  ```

- [ ] **Alternative:** Netlify, Cloudflare Pages, or self-hosted

### Domain
- [ ] Configure custom domain (e.g., moshebari.com)
- [ ] Update `metadataBase` URL in `src/app/layout.tsx`

---

## Optional Enhancements

- [ ] Add page transitions with Framer Motion
- [ ] Implement Bloom menu on project pages
- [ ] Add a signature micro-interaction (blur-focus effect, etc.)
- [ ] Set up analytics (Plausible, Fathom, or similar)
- [ ] Add RSS feed for writing
- [ ] Implement MDX for blog posts

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Run production server locally |
| `npm run lint` | Check for code issues |
