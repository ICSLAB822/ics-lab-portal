# Agent Skill: publication-import

Reusable SOP + prompt kit for adding a paper to the Publications list.

## Scope

Add a new publication to the site by:
- placing assets in `public/files/publications/` (PDF + thumbnail PNG)
- creating one markdown entry in `public/content/publications/`
- regenerating `public/content-index.json` and verifying build

## Hard Rules (Project-Specific)

1. **tags**: MUST be exactly the paper's printed `Keywords` / `Index Terms` list.
   - If the paper does not contain a Keywords/Index Terms section, use `tags: []`.

2. **authors format**: The last author MUST be connected with " and " (space-and-space), not comma.
   - ✅ Correct: `[Alice, Bob and Charlie]`
   - ❌ Wrong: `[Alice, Bob, Charlie]`

3. **imageCaption + award fields**: MUST be present in frontmatter (empty string is OK).
   - These fields are reserved for future use.

4. **venue format (Journal papers only)**: For journal papers (`track: Journal`), the venue MUST include volume, issue, pages, and year in this format:
   - `IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY (TVT), 73(12), pp. 19216-19228, 2024.`
   - Pattern: `<JOURNAL_NAME> (<ABBREV>), <VOL>(<ISSUE>), pp. <START>-<END>, <YEAR>.`

5. **venue format (Conference papers)**: For conference papers (`track: Conference`), use:
   - `in Proceedings of <CONFERENCE_NAME> <YEAR>`
   - Example: `in Proceedings of IEEE ICDCS 2022`

6. **Accuracy requirement**: All extracted information MUST match the actual PDF content exactly.
   - Title, authors, year must be verbatim from the paper.
   - Do NOT infer from filename.

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

Required fields:
```yaml
---
title: "..."
authors: [Author1, Author2 and LastAuthor]   # Note: "and" before last author
venue: "..."
year: 2026
track: Conference  # or Journal
topic: "..."      # optional but useful for filter
location: "..."   # optional (omit for Journal papers)
tags: ["Keyword 1", "Keyword 2"]
imageUrl: <stem>.png
imageCaption: ""  # REQUIRED field, can be empty
pdfUrl: <stem>.pdf
award: ""         # REQUIRED field, can be empty
---
```

**Conference example:**
```yaml
---
title: "Paper Title"
authors: [Alice, Bob and Charlie]
venue: "in Proceedings of IEEE ICDCS 2025"
year: 2025
track: Conference
topic: "Edge Computing"
location: "San Francisco, USA"
tags: ["edge computing", "latency"]
imageUrl: ICDCS2025-example.png
imageCaption: ""
pdfUrl: ICDCS2025-example.pdf
award: ""
---
```

**Journal example:**
```yaml
---
title: "Paper Title"
authors: [Alice, Bob and Charlie]
venue: "IEEE TRANSACTIONS ON MOBILE COMPUTING (TMC), 24(1), pp. 100-115, 2025."
year: 2025
track: Journal
topic: "Mobile Computing"
tags: ["mobile computing", "optimization"]
imageUrl: TMC2025-example.png
imageCaption: ""
pdfUrl: TMC2025-example.pdf
award: ""
---
```

Notes:
- Use only the filename in `pdfUrl`/`imageUrl` (no `publications/` prefix, no `/files/...`).
- `track` must be exactly `Journal` or `Conference` for the UI filter.
- `imageCaption` and `award` are REQUIRED fields but can be empty strings.
- Authors list: last author MUST be connected with " and " not comma.

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
1. TASK: Read the PDF and extract publication metadata for the website entry.

2. EXPECTED OUTCOME:
- Exact title line (verbatim) + page number
- Authors (ordered list, exactly as printed) + page number
- Venue/conference/journal line(s) (verbatim, including volume/issue/pages if journal) + page number
- Year evidence (verbatim) + page number
- Location (verbatim) + page number (if present, for conferences only)
- DOI/arXiv URL (verbatim) + page number (if present)
- Abstract (verbatim) + page number
- Keywords / Index Terms list (verbatim) + page number

3. MUST DO:
- The keyword/index-terms list MUST be copied exactly as printed.
- If there is no Keywords/Index Terms section, explicitly say "未在文中找到" and list where you checked.
- For journal papers, extract volume, issue number, page range, and year.
- Authors must be extracted in exact order as printed.

4. MUST NOT DO:
- Do not infer venue/year from filename; only use text printed in the PDF.
- Do not guess or infer missing information.

5. CLASSIFY:
- Is this a Journal or Conference paper? (look for "Proceedings", "Conference" vs journal masthead)
```

## Batch Import Workflow (Efficient)

When importing multiple PDFs:

1. **Parallel metadata extraction**: Fire multimodal agents for ALL PDFs simultaneously.
2. **Generate markdown files**: Create all `.md` files after metadata is collected.
3. **Single regeneration**: Run `node scripts/generate-index.js` ONCE after all files are created.
4. **Single build verification**: Run `npm run build` ONCE at the end.

## Authors Formatting Rule

Transform extracted author list to YAML format:
- Input: "John Smith, Jane Doe, Bob Johnson"
- Output: `[John Smith, Jane Doe and Bob Johnson]`

Key: Replace the LAST comma with " and ".

## Copy/Paste Prompt: Implementation Checklist (no code refactors)

```text
1) Confirm assets exist in `public/files/publications/` and note exact filenames.
2) Create `public/content/publications/<id>.md`:
   - `id` matches asset stem
   - `track` is `Conference` or `Journal`
   - `venue` matches the required format:
     - Conference: "in Proceedings of <CONF> <YEAR>"
     - Journal: "<JOURNAL> (<ABBREV>), <VOL>(<ISSUE>), pp. <START>-<END>, <YEAR>."
   - `authors` list: last author connected with " and " not comma
   - `tags` equals Keywords/Index Terms ONLY (or empty)
   - `pdfUrl`/`imageUrl` use basenames
   - `imageCaption` field present (can be empty string)
   - `award` field present (can be empty string)
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

## Track Classification

| Track | Indicators in PDF |
|-------|-------------------|
| Journal | Masthead with journal name, volume/issue/pages, no "Proceedings" |
| Conference | "Proceedings of", conference name, location, dates |

## Common Venue Abbreviations

| Full Name | Abbreviation |
|-----------|--------------|
| IEEE Transactions on Mobile Computing | TMC |
| IEEE Transactions on Vehicular Technology | TVT |
| IEEE Transactions on Wireless Communications | TWC |
| IEEE Internet of Things Journal | IOTJ |
| IEEE Transactions on Big Data | TBD |
| IEEE Network | Network |
| IEEE/ACM Transactions on Networking | TON |
