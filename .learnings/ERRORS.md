# Errors

## [ERR-20260711-001] hugo-config-validation

**Logged**: 2026-07-11T13:00:00+08:00
**Priority**: low
**Status**: resolved
**Area**: tests

### Summary
Hugo does not infer YAML format from the conventional `config.yml.example` filename.

### Error

```text
config.yml.example is not a valid configuration format
```

### Context

- Attempted to validate the example directly with `--config ../config.yml.example`.
- The file content is YAML, but its final extension is `.example`.

### Suggested Fix

Copy the example to a temporary file ending in `.yml` before passing it to Hugo.

### Metadata

- Reproducible: yes
- Related Files: config.yml.example

### Resolution

- **Resolved**: 2026-07-11T13:00:00+08:00
- **Notes**: Validation now uses a temporary `/tmp/hugo-spoon-example.yml` copy.

---

## [ERR-20260711-004] patch-context-mismatch

**Logged**: 2026-07-11T16:04:00+08:00
**Priority**: low
**Status**: resolved
**Area**: frontend

### Summary
An initial layout patch used stale template context and did not apply.

### Error

```text
apply_patch verification failed: Failed to find expected lines
```

### Context

- The code-block header had been changed in the prior turn.
- The requested copy-button placement patch referenced the older nesting.

### Suggested Fix

Inspect the current template before applying a follow-up patch that overlaps recent edits.

### Metadata

- Reproducible: no
- Related Files: layouts/_markup/render-codeblock.html

### Resolution

- **Resolved**: 2026-07-11T16:05:00+08:00
- **Notes**: Re-read the templates and applied the corrected metadata/action grouping.

---

## [ERR-20260711-003] codeblock-highlight-result

**Logged**: 2026-07-11T15:35:00+08:00
**Priority**: medium
**Status**: resolved
**Area**: frontend

### Summary
The code-block render hook printed Hugo's highlight result object instead of its rendered HTML.

### Error

```text
{510 2105 <div class="highlight">...}
```

### Context

- The new `render-codeblock.html` invoked `transform.HighlightCodeBlock` directly.
- The function returns a result object; rendering it directly escaped the generated code HTML in the example page.

### Suggested Fix

Render the result's `.Wrapped` field through `safeHTML`, and build the example site whenever a render hook changes.

### Metadata

- Reproducible: yes
- Related Files: layouts/_markup/render-codeblock.html

### Resolution

- **Resolved**: 2026-07-11T15:35:00+08:00
- **Notes**: The hook now renders `(transform.HighlightCodeBlock .).Wrapped`; the example site and local preview render code normally.

---

## [ERR-20260711-009] local-preview-stale-port

**Logged**: 2026-07-11T14:10:00+08:00
**Priority**: low
**Status**: resolved
**Area**: tests

### Summary
Port 1313 remained bound after a preview interruption, but the current environment could not reach that stale listener.

### Error

```text
listen tcp 127.0.0.1:1313: bind: address already in use
curl: (7) Failed to connect to 127.0.0.1 port 1313
```

### Context

- The prior local preview process was interrupted while browser diagnostics were running.
- The replacement preview uses a fresh port to avoid the inaccessible listener.

### Suggested Fix

Use a new explicit port after a preview session is interrupted.

### Metadata

- Reproducible: unknown
- Related Files: none

### Resolution

- **Resolved**: 2026-07-11T14:10:00+08:00
- **Notes**: Restarted the Hugo preview on port 1314.

---

## [ERR-20260711-008] computer-use-chrome-state-timeout

**Logged**: 2026-07-11T14:00:00+08:00
**Priority**: low
**Status**: resolved
**Area**: tests

### Summary
Computer Use could not read the Codex app and the Chrome accessibility-state request did not return.

### Error

```text
Computer Use is not allowed to use the Codex app for safety reasons.
Chrome state request was terminated after repeated timeouts.
```

### Context

- Used to inspect a user-reported local preview rendering issue.
- No browser or repository state was changed through Computer Use.

### Suggested Fix

Use the in-app browser screenshot as a fallback for local preview visual inspection.

### Metadata

- Reproducible: unknown
- Related Files: none

### Resolution

- **Resolved**: 2026-07-11T14:00:00+08:00
- **Notes**: Switched to the existing in-app browser preview for visual diagnosis.

---

## [ERR-20260711-007] browser-dom-order-api

**Logged**: 2026-07-11T13:45:00+08:00
**Priority**: low
**Status**: resolved
**Area**: tests

### Summary
The in-app browser's read-only evaluation bridge does not expose `compareDocumentPosition`.

### Error

```text
compareDocumentPosition is not a function
```

### Context

- Used only to assert the DOM order of the mobile table of contents and article body.
- The viewport and page navigation completed before this unsupported call.

### Suggested Fix

Verify layout with computed CSS and the accessibility snapshot instead of DOM-order methods unavailable in the bridge.

### Metadata

- Reproducible: yes
- Related Files: none

### Resolution

- **Resolved**: 2026-07-11T13:45:00+08:00
- **Notes**: Continued validation using supported computed-style checks.

---

## [ERR-20260711-006] hugo-param-key-normalization

**Logged**: 2026-07-11T13:40:00+08:00
**Priority**: low
**Status**: resolved
**Area**: frontend

### Summary
Page front matter keys are normalized to lowercase by Hugo before template lookup.

### Error

```text
readingProgress: false and imageZoom: false did not override site defaults
```

### Context

- The first article-control render correctly hid the table of contents.
- Camel-case keys were checked with `isset`, which did not find their normalized forms.

### Suggested Fix

Use lowercase map keys such as `readingprogress` and `imagezoom` when accessing front matter through `Params`.

### Metadata

- Reproducible: yes
- Related Files: layouts/partials/blog/article-content.html

### Resolution

- **Resolved**: 2026-07-11T13:40:00+08:00
- **Notes**: Updated the template lookups and rebuilt the control example.

---

## [ERR-20260711-005] hugo-template-scope

**Logged**: 2026-07-11T13:35:00+08:00
**Priority**: low
**Status**: resolved
**Area**: frontend

### Summary
Replacing a Hugo `with` block with `if` changed the dot context in the related-articles template.

### Error

```text
range can't iterate over pageMetaSource
```

### Context

- `layouts/blog/single.html` now conditionally renders related articles.
- The nested `range .` still referred to the current page after the `with` block was removed.

### Suggested Fix

Range over the explicit `$related` collection when using `if`.

### Metadata

- Reproducible: yes
- Related Files: layouts/blog/single.html

### Resolution

- **Resolved**: 2026-07-11T13:35:00+08:00
- **Notes**: Replaced `range .` with `range $related` and rebuilt the example site.

---

## [ERR-20260711-004] tool-call-argument-shape

**Logged**: 2026-07-11T13:25:00+08:00
**Priority**: low
**Status**: resolved
**Area**: tests

### Summary
An orchestration script used malformed JavaScript array syntax before issuing repository checks.

### Error

```text
SyntaxError: Unexpected token ':'
```

### Context

- The tool wrapper failed before any shell command ran.
- No repository files or generated outputs were modified.

### Suggested Fix

Use independently declared command strings for parallel repository inspection.

### Metadata

- Reproducible: yes
- Related Files: none

### Resolution

- **Resolved**: 2026-07-11T13:25:00+08:00
- **Notes**: Replaced the malformed batch with separate command variables.

---

## [ERR-20260711-003] hugo-cli-override

**Logged**: 2026-07-11T13:15:00+08:00
**Priority**: low
**Status**: resolved
**Area**: tests

### Summary
The installed Hugo CLI does not provide a generic `--set` configuration override flag.

### Error

```text
unknown flag: --set
```

### Context

- Attempted to override `params.darkModeTheme` only for an Icy Dark build check.
- The normal production build completed successfully before this extra check.

### Suggested Fix

Use Hugo's `HUGO_PARAMS_*` environment-variable override mechanism for temporary parameter checks.

### Metadata

- Reproducible: yes
- Related Files: assets/js/darkmode-init.js

### Resolution

- **Resolved**: 2026-07-11T13:15:00+08:00
- **Notes**: The Icy Dark check now uses `HUGO_PARAMS_DARKMODETHEME`.

---

## [ERR-20260711-002] shell-audit-search

**Logged**: 2026-07-11T13:10:00+08:00
**Priority**: low
**Status**: resolved
**Area**: tests

### Summary
A combined `rg` audit command used conflicting nested shell quotes.

### Error

```text
zsh: unmatched quote
```

### Context

- A single command mixed JavaScript, shell, and regular-expression quoting.
- No repository files or build outputs were affected.

### Suggested Fix

Split complex audit expressions into separate commands with simple patterns.

### Metadata

- Reproducible: yes
- Related Files: none

### Resolution

- **Resolved**: 2026-07-11T13:10:00+08:00
- **Notes**: Replaced the combined expression with simpler focused searches.

---
