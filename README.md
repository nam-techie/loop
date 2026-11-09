# LOOP — Adapt to Trail

A single English landing page: Home → Collections → About → Contact. Native scrolling reveals every section; navigation links are optional shortcuts. No shopping or pricing.

## Run
Node.js 22+, pnpm 10.20.0. Run pnpm install --frozen-lockfile, pnpm dev, pnpm typecheck, pnpm test:scroll, pnpm build, pnpm start.

## Scroll collection
Edit collectionFrames in lib/catalog.ts to change the ordered photo story. One full stage-height of scrolling is assigned to each image, including the final image, before the page continues to About. The scene length scales with the number of frames. Scroll up to revisit previous photographs. No wheel interception or nested scroll container is used.

The caption and image stack vertically on phones. Screens under 560px high use normal vertical flow; without JavaScript all photographs remain visible. Collection photographs overlap during a scroll-driven dissolve with a subtle vertical hand-off. Reduced motion removes spatial motion, retaining only an opacity dissolve with a shorter visual settling time. FAQ answers are always visible.

Old /collections, /about and /contact links redirect to /#collections, /#about and /#contact. Cart remains removed.

## Brand
Read BRAND_RULES.md. AVEGA is used for all headings and the wordmark; Roboto Slab for everything else. Both are self-hosted; licenses are in public/fonts. Forest green is #033224. Original photos in image/ remain unchanged, selected optimized images are in public/images/.

## Verified behavior
- Native scrolling reveals photographs 1–6 in order on desktop and mobile; About remains below the viewport until the collection has been explored. Reverse scrolling revisits previous frames.
- No horizontal overflow at 320, 390, 768, 1024 and 1440px; 844×390 landscape renders all six photographs in normal document flow.
- Old About and Contact links land under the sticky header after font loading; navigation follows the section in view. Contact answers are visible without clicks.
- AVEGA headings, Roboto Slab body text and #033224 remain unchanged. No prices, sizes, bag or checkout were reintroduced.
- Five scroll regression tests cover 1/5/6/10 images, final-frame dwell, reverse scrolling, resize and invalid geometry. TypeScript passes.
