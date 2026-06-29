# Sakron Hero (Next.js)

Pixel-matched recreation of the SAKRON hero screen with a fully interactive
background.

## What's interactive
- **Particle network** — nodes drift across the whole viewport; lines glow
  and nodes nudge away as your cursor passes near them.
- **Wireframe terrain** (bottom-left) — the glowing grid ripples and lifts
  toward your cursor, like a responsive heightmap.
- **Crosshair reticle** (bottom-right) — eases toward your pointer with a
  soft lag, like a tracking scope.
- **Nav + side dots** — active states respond to clicks.

Everything respects `prefers-reduced-motion`.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure
```
app/
  layout.tsx        Fonts (Anton + Inter) and global shell
  page.tsx           Hero composition
  globals.css        Tailwind layers + glow utility
components/
  InteractiveBackground.tsx   Canvas: particle network + wireframe terrain
  CursorCrosshair.tsx         Lagging reticle that tracks the pointer
  Navbar.tsx                  Top nav with active-link dot indicator
  SideNavDots.tsx             Left vertical section dots
  Logo.tsx                    Mark
```

## Notes
- Swap `lucide-react`'s `ArrowUpRight` for any icon set you prefer.
- The accent color lives in `tailwind.config.js` as `acid` (`#D7FF1E`) — change
  it there to retheme everything in one place.
