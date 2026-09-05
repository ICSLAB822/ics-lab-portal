# Content repository reconciliation

The complete, non-squashed history of `ics-lab-content` was imported under
`legacy/ics-lab-content` before content normalization.

## Inventory

- Five Markdown files are byte-identical in both repositories.
- Nine Markdown files existed only in the content repository.
- Nine assets are byte-identical in both repositories.
- Two hero assets share paths but have different bytes.
- The legacy Baro2Talk PDF is byte-identical to the portal PDF under a different name.

## Resolution policy

The portal copy is canonical because it is newer and more complete. Identical files
are retained once. Semantically duplicated publications are keyed by title and year,
not filename. Legacy-only documents containing placeholder images or example URLs
are retained in `content-review/` but are not published until editorial verification.
Conflicting binary assets are retained with explicit legacy names until reviewed.
