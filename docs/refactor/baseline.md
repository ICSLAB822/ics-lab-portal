# React baseline before Jekyll migration

Captured on 2026-09-04 from commit `5cd05c9`.

## Build health

- TypeScript strict typecheck: passed.
- Vite production build: passed on Node 20.17 with an engine warning (Vite 7 requires Node 20.19+).
- Publication validation: passed for 87 Markdown files.
- Known warning: `/index.css` is referenced but missing.
- Main JavaScript bundle: 702.92 kB before gzip, 219.29 kB gzip.
- npm audit baseline: 14 findings (1 low, 5 moderate, 7 high, 1 critical).

## Content counts

- News: 6
- Projects: 3
- Publications: 87
- People: 14
- Gallery albums: 3
- Configuration pages: 3
- Static assets: 214 files, approximately 320 MB

## Compatibility contract

The Jekyll version must preserve the existing page hierarchy, light/dark themes,
English/Chinese toggle, search, announcement, publication filters and citations,
member biography modal, gallery lightbox, downloads, responsive navigation, and
legacy hash-route entry points.
