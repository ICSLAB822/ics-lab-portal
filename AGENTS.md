# ICS LAB Jekyll project

This is one Git repository for the website, Markdown content and static assets.
The React/Vite implementation is preserved by the `pre-jekyll-portal` Git tag,
not used by the current build. Content-repository history was imported without
squashing in `88d5abe`.

## Commands

Activate the project's Conda environment (`ics-homepage`) before Ruby commands.
- `npm ci --ignore-scripts` and `bundle install`: locked build/test dependencies.
- `npm run build`: static Tailwind CSS, then native Jekyll HTML in `_site/`.
- `npm run dev`: rebuild CSS and serve at port 4000.
- `npm run watch:css`: separate CSS watcher while editing utility classes.
- `npm run validate`: content, generated HTML and internal links.
- `npm test`: Playwright; bundled Chromium locally and in CI (`npx playwright install chromium`).
- `npm run test:baseurls`: root, nested and GitHub Pages prefix checks.
- `npm run test:announcement`: in-memory announcement fixtures; requires port 4000.

## Structure

- `_config.yml`: collections, paths and build exclusions.
- `_data/`: site identity, bilingual labels, recruitment and announcement.
- `content/_{news,projects,publications,people,gallery}/`: YAML front matter + content.
- `_layouts/`, `_includes/`: Liquid markup; original UI is the design authority.
- `_plugins/presentation.rb`: deterministic collection/member ordering only.
- `assets/files/`: original images/downloads; filenames and case are significant.
- `assets/js/app.js`: progressive enhancements only; no runtime React or Markdown fetching.
- `styles/tailwind.css`, `tailwind.config.cjs`: CSS sources.
- `assets/css/tailwind.css`: checked-in generated CSS; regenerate after class edits.
- `content-review/`: preserved conflicting/unverified legacy material, never published.

## Rules

Preserve the original UI, bilingual behavior, light/dark themes and old hash links.
Do not reintroduce a second content repository, submodule or runtime content loader.
Use Jekyll `relative_url`/`absolute_url`; never hardcode the Pages prefix in templates.
Use `{% include asset-url.html folder='publications' path=paper.pdfUrl %}` for assets.
SVG include parameter is `pixels`, not `size` (Liquid Hash has a built-in size).
Keep utility class names literal so Tailwind can discover them.
Navigation expands below 1280px. Keep navbar xl utilities, its CSS and the JS
matchMedia breakpoint aligned; check tests/navigation.spec.cjs after changes.
Do not publish example data from `content-review` or enable an announcement for testing.
Do not edit generated `_site/`. Preserve Git history and unrelated user changes.

## Content authoring

Publication import guidance: `agent-skills/publication-import.md`.
People use `bio_en`/`bio_zh` front matter; gallery display dates use `display_date`.
Active member roles: Professors, Researchers, Lecturers, PhD Students, Master Students,
Alumni. Keep `order` numeric; equal values are sorted by source path deterministically.
Detail layouts use Jekyll's rendered `{{ content }}` once, never escaped source Markdown.
Body typography lives in `.content-body`; do not style the global page shell through it.
After edits run build, validation and relevant browser tests.
