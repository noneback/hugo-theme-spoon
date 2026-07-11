# Learnings

## [LRN-20260711-001] layout-review

**Logged**: 2026-07-11T14:15:00+08:00
**Priority**: high
**Status**: resolved
**Area**: frontend

### Summary
A side table of contents must use additional viewport width rather than consume the article's existing reading column.

### Details
The first sticky-TOC implementation split the existing 80rem article container into a main column and a sidebar, reducing the main text width to roughly 53rem. The user correctly reported that this harmed reading comfort.

### Suggested Action
For wide viewports, expand the outer article container to include a dedicated TOC column while keeping the content column at 80rem. Fall back to the top-of-article TOC below that breakpoint.

### Metadata
- Source: user_feedback
- Related Files: assets/scss/_blog.scss
- Tags: layout, toc, readability
- Pattern-Key: preserve.reading-column-width

### Resolution
- **Resolved**: 2026-07-11T14:15:00+08:00
- **Notes**: The desktop grid now uses an 80rem content column plus a 22rem TOC column within a 104rem outer container at 1280px and above.

---

## [LRN-20260711-011] correction

**Logged**: 2026-07-11T16:35:00+08:00
**Priority**: high
**Status**: resolved
**Area**: frontend

### Summary
A confirmed visual regression must be fixed and verified before handing the result back.

### Details
The line-number layout regression was correctly diagnosed, but the previous response stopped at explanation even though the ongoing workflow was implementation-oriented. The broken preview remained visible to the user.

### Suggested Action
When a user reports a regression during an active implementation cycle, apply the scoped fix, rebuild, and visually verify the exact affected page before responding.

### Metadata
- Source: user_feedback
- Related Files: assets/scss/_blog.scss
- Tags: workflow, visual-regression, code-block
- Pattern-Key: implementation.fix-before-handoff

### Resolution
- **Resolved**: 2026-07-11T16:35:00+08:00
- **Notes**: Restored a compact line-number column, vertical line numbers, and a full-width code column, then verified the preview.

---

## [LRN-20260711-010] toc-gutter-width

**Logged**: 2026-07-11T16:15:00+08:00
**Priority**: medium
**Status**: resolved
**Area**: frontend

### Summary
The left companion TOC needs more horizontal room for long headings.

### Details
An 18rem gutter made multi-word or Chinese headings wrap too aggressively. The main article column can remain fixed while the TOC grows into unused space on wide screens.

### Suggested Action
Expand the desktop TOC column to 22rem and offset the grid by the same additional width, preserving the content column's existing position.

### Metadata
- Source: user_feedback
- Related Files: assets/scss/_blog.scss
- Tags: layout, toc, readability
- Pattern-Key: toc.wide-left-gutter

### Resolution
- **Resolved**: 2026-07-11T16:15:00+08:00
- **Notes**: Increased the left TOC from 18rem to 22rem without shifting the reading column.

---

## [LRN-20260711-009] code-copy-button-placement

**Logged**: 2026-07-11T16:05:00+08:00
**Priority**: medium
**Status**: resolved
**Area**: frontend

### Summary
The copy action should occupy the code header's upper-right position by itself.

### Details
Putting the language label in the same right-aligned action group made the copy control feel less clearly positioned. Code identity belongs on the left; the primary action belongs at the far right.

### Suggested Action
Group filename and language into left-side metadata and keep only the copy button in the right-side action region.

### Metadata
- Source: user_feedback
- Related Files: layouts/_markup/render-codeblock.html, layouts/shortcodes/code-file.html
- Tags: code-block, interaction-design
- Pattern-Key: code-block.action-right-metadata-left

### Resolution
- **Resolved**: 2026-07-11T16:05:00+08:00
- **Notes**: Copy is now the only right-side control; filename and language are grouped on the left.

---

## [LRN-20260711-008] code-block-language-duplication

**Logged**: 2026-07-11T15:58:00+08:00
**Priority**: medium
**Status**: resolved
**Area**: frontend

### Summary
Untitled code blocks must not display the language in both title and metadata positions.

### Details
The render hook used the language as a fallback filename and also rendered it in the dedicated language label. This made ordinary code blocks show the same type twice.

### Suggested Action
Only render the title element when the author explicitly provides a `title` code-fence attribute. Keep the language label as the single default identifier.

### Metadata
- Source: user_feedback
- Related Files: layouts/_markup/render-codeblock.html
- Tags: code-block, content-design
- Pattern-Key: code-block.explicit-title-only

### Resolution
- **Resolved**: 2026-07-11T15:58:00+08:00
- **Notes**: Ordinary code blocks now show only their language; titled blocks show filename plus language.

---

## [LRN-20260711-007] code-block-theme-and-controls

**Logged**: 2026-07-11T15:50:00+08:00
**Priority**: high
**Status**: resolved
**Area**: frontend

### Summary
Code-block controls must be initialized once and must follow the selected page theme.

### Details
The new code-block wrapper contains a nested Hugo highlight element. Initializing both elements appended two copy buttons. The first version also used a fixed dark surface even on the light site theme.

### Suggested Action
Skip highlight elements already contained by a code-block wrapper. Define a light code palette by default and override it explicitly for both supported dark modes.

### Metadata
- Source: user_feedback
- Related Files: assets/js/app.js, assets/scss/common/_global.scss, assets/scss/common/_dark.scss
- Tags: code-block, dark-mode, interaction
- Pattern-Key: code-block.single-control-theme-aware

### Resolution
- **Resolved**: 2026-07-11T15:50:00+08:00
- **Notes**: Removed nested copy-button initialization and introduced separate light, default-dark, and icy-dark code surfaces.

---

## [LRN-20260711-006] wide-screen-reading-width

**Logged**: 2026-07-11T15:12:00+08:00
**Priority**: high
**Status**: resolved
**Area**: frontend

### Summary
The centered article column left excessive unused space on large displays.

### Details
After the TOC moved into the left gutter, the original 80rem reading column felt too narrow at desktop sizes. Increasing the main column modestly improves use of the screen without turning the long-form layout into an unbounded full-width page.

### Suggested Action
Use a 92rem maximum width for individual blog articles and align the companion TOC grid to that same width. Keep the 18rem TOC and 2rem gutter unchanged.

### Metadata
- Source: user_feedback
- Related Files: assets/scss/_blog.scss
- Tags: layout, reading-width, large-screens
- See Also: LRN-20260711-005
- Pattern-Key: blog.adaptive-wide-reading-column

### Resolution
- **Resolved**: 2026-07-11T15:12:00+08:00
- **Notes**: Increased the article and companion-grid content column from 80rem to 92rem.

---

## [LRN-20260711-005] toc-left-gutter-companion

**Logged**: 2026-07-11T15:05:00+08:00
**Priority**: high
**Status**: resolved
**Area**: frontend

### Summary
The companion TOC should be placed in the left gutter, not the right gutter.

### Details
After rejecting the drawer, the user retained the non-overlay companion layout but requested that the navigation live to the left of the reading column. The reading column must remain centered and retain its full width.

### Suggested Action
At wide breakpoints, shift only the two-column grid into the left gutter: use an 18rem TOC column, a 2rem gap, and an 80rem content column. Keep the content column aligned with the normal centered article position.

### Metadata
- Source: user_feedback
- Related Files: assets/scss/_blog.scss
- Tags: layout, toc, left-gutter
- See Also: LRN-20260711-003
- Pattern-Key: toc.left-gutter-companion

### Resolution
- **Resolved**: 2026-07-11T15:05:00+08:00
- **Notes**: Moved the wide-screen companion TOC to the left gutter using a negative grid offset, without moving or narrowing the article column.

---

## [LRN-20260711-004] toc-drawer-reverted

**Logged**: 2026-07-11T14:55:00+08:00
**Priority**: high
**Status**: resolved
**Area**: frontend

### Summary
The drawer pattern was less comfortable than the earlier companion TOC layout.

### Details
The user rejected the drawer after comparing it with the prior design. The preferred fallback is a quiet, right-side TOC in the available desktop gutter, while the article column remains at its original centered width.

### Suggested Action
Avoid overlay, backdrop, and toggle UI for article navigation. Keep the TOC inline on narrow screens and as a lightweight sticky companion in the right gutter at wide breakpoints.

### Metadata
- Source: user_feedback
- Related Files: assets/scss/_blog.scss, layouts/partials/blog/article-content.html
- Tags: layout, toc, readability
- Pattern-Key: toc.right-gutter-companion

### Resolution
- **Resolved**: 2026-07-11T14:55:00+08:00
- **Notes**: Restored the non-drawer right-gutter TOC and removed the drawer's JavaScript, overlay, and modal controls.

---

## [LRN-20260711-004] toc-drawer-preference

**Logged**: 2026-07-11T14:45:00+08:00
**Priority**: high
**Status**: resolved
**Area**: frontend

### Summary
The preferred table-of-contents interaction is an on-demand drawer, not persistent floating navigation.

### Details
The user rejected the floating TOC after trying both right- and left-gutter variants. The navigation should preserve all reading space until explicitly requested.

### Suggested Action
Render a lightweight TOC trigger in the article flow and open a left drawer with a backdrop. Support close button, overlay click, Escape, link selection, and active-section highlighting.

### Metadata
- Source: user_feedback
- Related Files: layouts/partials/blog/article-content.html, assets/js/app.js
- Tags: toc, drawer, interaction-design
- Pattern-Key: toc.on-demand-drawer

### Resolution
- **Resolved**: 2026-07-11T14:45:00+08:00
- **Notes**: Replaced the persistent layout TOC with an accessible left-side drawer.

---

## [LRN-20260711-003] toc-preference

**Logged**: 2026-07-11T14:35:00+08:00
**Priority**: high
**Status**: resolved
**Area**: frontend

### Summary
For this reading theme, a left-side floating TOC is preferred over a right-side gutter TOC.

### Details
The user explicitly prefers the navigation on the left. The design must keep the main column fixed and centered while placing the TOC in the left gutter as a compact floating card.

### Suggested Action
Use a 18rem left TOC column that overflows into the left gutter at 1280px and above, with a translucent card surface and sticky behavior. Keep the inline TOC below the breakpoint.

### Metadata
- Source: user_feedback
- Related Files: assets/scss/_blog.scss
- Tags: layout, toc, floating-navigation
- Pattern-Key: toc.left-floating-gutter

### Resolution
- **Resolved**: 2026-07-11T14:35:00+08:00
- **Notes**: Switched the desktop TOC grid to an overflow-left gutter layout and added light and dark floating-card treatments.

---

## [LRN-20260711-002] layout-refinement

**Logged**: 2026-07-11T14:25:00+08:00
**Priority**: high
**Status**: resolved
**Area**: frontend

### Summary
Keeping a wide reading column is not enough if the layout also shifts that column away from its familiar centered position.

### Details
The first refinement preserved an 80rem content width by expanding the outer article container. This still moved the full article block left to make room for the table of contents, which remains visually intrusive.

### Suggested Action
Keep the article container centered at 80rem. Let the wide-screen TOC grid overflow only into the right gutter, and make the TOC more compact so it reads as secondary navigation.

### Metadata
- Source: user_feedback
- Related Files: assets/scss/_blog.scss
- Tags: layout, toc, readability
- Pattern-Key: preserve.centered-reading-column

### Resolution
- **Resolved**: 2026-07-11T14:25:00+08:00
- **Notes**: The content column remains centered at 80rem; the 18rem TOC extends only into the right gutter at 1280px and above.

---
