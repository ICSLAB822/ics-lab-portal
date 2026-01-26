# Agent Skill: publication-import

Reusable SOP + prompt kit for adding a paper to the Publications list.

## Scope

Add a new publication to the site by:
- placing assets in `public/files/publications/` (PDF + thumbnail PNG)
- creating one markdown entry in `public/content/publications/`
- regenerating `public/content-index.json` and verifying build

Hard rule (project-specific):
- `tags` MUST be exactly the paper's printed `Keywords` / `Index Terms` list.
- If the paper does not contain a Keywords/Index Terms list, `tags: []`.

## Inputs (You Must Have)

- Asset filenames (case-sensitive):
  - `<stem>.pdf`
  - `<stem>.png`
- Metadata from the PDF (verbatim evidence preferred):
  - title
  - authors (ordered)
  - venue string + year
  - location (optional)
  - DOI/URL (optional)
  - abstract (verbatim)
  - Keywords/Index Terms (verbatim) OR confirmation it is missing

## Output Files

1) `public/content/publications/<id>.md`
2) `public/content-index.json` regenerated (via script/build)

## Naming Convention

- Prefer `id` to match the asset stem exactly.
  - Example: assets `ndss2026-ThinkTrap.pdf/png` => markdown `ndss2026-ThinkTrap.md`
- Reason: the app derives `Publication.id` from the markdown filename (`utils/cms.ts`), and assets are resolved under `/files/publications/<filename>`.

## Frontmatter Schema (Publications)

Minimum (recommended):
```yaml
---
title: "..."
authors: [A, B, C]
venue: "..."
year: 2026
track: Conference  # or Journal
topic: "..."      # optional but useful for filter
location: "..."   # optional
tags: ["Keyword 1", "Keyword 2"]
imageUrl: <stem>.png
pdfUrl: <stem>.pdf
---
```

Notes:
- Use only the filename in `pdfUrl`/`imageUrl` (no `publications/` prefix, no `/files/...`).
- `track` must be exactly `Journal` or `Conference` for the UI filter.

## Keyword -> tags Rules

Source of truth:
- the paper's printed `Keywords:` or `Index Terms:` section.

Transform:
- Split into items exactly as printed (typically comma-separated).
- Preserve spelling/casing.
- Keep multi-word phrases intact.
- Remove duplicates.

YAML quoting:
- Quote any tag containing `:` or leading `#`.
- Parentheses and hyphens are OK unquoted.

If missing:
- `tags: []`

## Copy/Paste Prompt: PDF Metadata Extraction (multimodal)

Use this prompt with the multimodal PDF reader:

```text
1. TASK: Read `<ABSOLUTE_PATH_TO_PDF>` and extract publication metadata for the website entry.
2. EXPECTED OUTCOME:
- Exact title line (verbatim) + page number
- Authors (ordered) + page number
- Venue/conference/journal line(s) (verbatim) + page number
- Year evidence (verbatim) + page number
- Location (verbatim) + page number (if present)
- DOI/arXiv URL (verbatim) + page number (if present)
- Abstract (verbatim) + page number
- Keywords / Index Terms list (verbatim) + page number
3. MUST DO:
- The keyword/index-terms list MUST be copied exactly as printed.
- If there is no Keywords/Index Terms section, explicitly say "未在文中找到" and list where you checked.
4. MUST NOT DO:
- Do not infer venue/year from filename; only use text printed in the PDF.
```

## Copy/Paste Prompt: Implementation Checklist (no code refactors)

```text
1) Confirm assets exist in `public/files/publications/` and note exact filenames.
2) Create `public/content/publications/<id>.md`:
   - `id` matches asset stem
   - `track` is `Conference` or `Journal`
   - `venue` matches the desired display string
   - `tags` equals Keywords/Index Terms ONLY (or empty)
   - `pdfUrl`/`imageUrl` use basenames
   - body contains abstract text (and optionally a DOI line)
3) Run `node scripts/generate-index.js`.
4) Verify index contains the new markdown path.
5) Run `npm run build`.
```

## Verification

Required evidence:
- `node scripts/generate-index.js` exits 0 and lists updated Publications count.
- `npm run build` exits 0.
- (Optional) `grep "<id>.md" public/content-index.json` finds the entry.
