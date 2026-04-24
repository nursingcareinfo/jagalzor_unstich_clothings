# Agent Instructions for Velvet & Loom

## Critical Image Bug Fix (GitHub Pages)

**Problem:** Images 404 on live site. Repository deploys to `username.github.io/repo-name/` (subdirectory), but image paths in `src/App.tsx` use:
- Absolute paths: `/image.jpg` → goes to domain root → 404
- Bare filenames: `image.jpg` → treated as module import by Vite → fail

**Solution:** Use relative paths: `./image.jpg`

Apply to ALL image references in `src/App.tsx`:

**Static images** (Hero, StorySection, FabricZoomViewer):
```diff
- src="/image.jpg"
+ src="./image.jpg"
```

**Dynamic images** in `PRODUCTS` array:
```diff
- image: 'filename.jpg',
+ image: './filename.jpg',
```

Verification:
- Local: `npm run preview` → all images load with 200
- Live: Network panel shows `GET /repo-name/filename.jpg [200]`
- Snapshot confirms `<img src="./...">` renders with visible dimensions

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server at http://localhost:3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve production build locally |
| `npm run deploy` | Build + push to GitHub Pages (gh-pages) |
| `npm run clean` | Remove `dist/` |
| `npm run lint` | Type-check only (`tsc --noEmit`) |

**Order:** `lint` → `build` → `deploy`

## Architecture

- **Stack**: React 19, Vite 6, TypeScript 5.8, Tailwind CSS 4, shadcn/ui (base-nova)
- **Entry**: `src/main.tsx` → `App`
- **Alias**: `@/*` → project root (`tsconfig.json` + `vite.config.ts:15`)
- **Public assets**: `public/` — referenced with relative paths (`./filename.jpg`)
- **Components**: `components/ui/` (shadcn: button, card, badge, tabs, aspect-ratio, scroll-area)
- **Env vars**: `GEMINI_API_KEY` (AI Studio injects; local needs `.env.local`)
- **CSS**: Custom theme in `src/index.css` — gold (`#C5A059`) on deep navy (`#0A0F1E`)

## Conventions

- Pre-commit: Husky + lint-staged runs `npm run lint` on staged `src/**/*.{ts,tsx}`
  - Type-check errors block commit. If types from node_modules are missing, run `npm install` first.
- Deploys automatically on push to `main` via `.github/workflows/deploy.yml`
- `vite.config.ts`: `base: './'` for GitHub Pages relative asset resolution
- No tests configured (frontend-only)
- Single package — no monorepo

## Gotchas

- **NO `import.meta.env.BASE_URL`** — Use relative `./` paths, not dynamic base URLs
- **No `base` tag** in `index.html` — Vite handles asset paths via `base: './'`
- HMR disabled in AI Studio (`DISABLE_HMR=true`). Do not modify.
- `npm ci` or `npm install` before first `npm run dev`
