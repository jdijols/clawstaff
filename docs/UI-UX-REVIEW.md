# ClawStaff UI/UX Review — Pre-Launch

Review focused on design-engineer / UX / frontend quality. Issues grouped by severity.

**Fixed (implemented):** 1–9, 11 (external links already correct), 12. Focus restoration (8): InfoModal and PreviewModal now accept `onClosed`; focus returns to the trigger. TokenInput (9): helper text renders without trailing space when no link; external helper links have focus-visible. Meta/SEO (12): description and OG/Twitter copy are provider-agnostic.

---

## Critical (fix before posting)

### 1. **Role card not keyboard-accessible**
- The entire card is a clickable `<div>` with `onClick`; there is no `tabIndex`, `onKeyDown`, or focus management.
- **Impact:** Keyboard and screen-reader users cannot open the config preview.
- **Fix:** Make the card focusable (`tabIndex={0}`), handle `onKeyDown` for Enter/Space, and use `role="button"` with `aria-label` (e.g. "Preview {title} config").

### 2. **Modal close buttons missing accessible names**
- InfoModal and PreviewModal close buttons are icon-only with no `aria-label`.
- **Impact:** Screen readers announce a generic "button" with no purpose.
- **Fix:** Add `aria-label="Close"` (or "Close modal") to both close buttons.

### 3. **No user feedback when copy fails**
- `copyToClipboard()` can return `false` (e.g. permission denied, Safari after async). RoleCard, PreviewModal, and InfoModal CodeBlock do not show any feedback on failure.
- **Impact:** User thinks copy succeeded when it did not.
- **Fix:** On `false`, show a short-lived message (e.g. "Copy failed; try again" or keep "Copy" and optionally toast).

### 4. **No user feedback when config fetch fails**
- RoleCard and PreviewModal fetch config from `configPath`. On 404 or network error we only `console.error`; the UI does not show an error.
- **Impact:** User may see blank content, wrong content, or be able to download invalid content (PreviewModal sets `json = '// Failed to load config'` but still allows Download).
- **Fix:** Check `res.ok` before `res.json()`; on failure show inline error or toast and disable Copy/Download in PreviewModal when load failed.

### 5. **PreviewModal allows downloading error state**
- When fetch fails, `json` is set to `'// Failed to load config'`. User can still click Download and get a useless file.
- **Fix:** Track load error state; disable or hide Copy/Download when load failed, and show an error message in the body.

---

## Important (accessibility & consistency)

### 6. **Missing focus-visible styles on interactive elements**
- Provider and Hardware toggle pills, footer link, and some buttons rely on browser default focus outline (often a thin blue or dotted ring that can be hard to see or inconsistent).
- **Impact:** Keyboard users cannot clearly see focus position.
- **Fix:** Add `focus-visible:ring-2 focus-visible:ring-rust-400 focus-visible:ring-offset-2` (or equivalent) to primary/secondary buttons and toggle pills; use `outline: none` only when replacing with a visible ring.

### 7. **InfoModal step 2 copy incorrect for single-role (Ollama)**
- Step 2 says: "Use 'Download Set' in the header **or in the config panel** to get all configs…". When Ollama is selected, the config panel "Download all 6 configs" section is hidden, so "or in the config panel" is misleading.
- **Fix:** Make copy conditional or generic, e.g. "Use 'Download' or 'Download Set' in the header (and in the config panel when multiple roles are available)."

### 8. **Focus not restored after closing modals**
- When InfoModal or PreviewModal closes, focus is not explicitly returned to the trigger (e.g. the (?) button or the role card). `<dialog>` helps with focus trap but not always with return focus.
- **Fix:** On close, call `triggerRef.current?.focus()` if you store a ref to the element that opened the modal.

---

## Polish & edge cases

### 9. **TokenInput helper text when no link**
- When `helperLink` is omitted (e.g. Slack App Token, WhatsApp), the helper paragraph still renders `{helperText}{' '}` so there can be a trailing space. Minor.
- **Fix:** Omit the space when `helperLink` is absent, or structure so only one segment renders.

### 10. **Download without token still proceeds**
- Header and wizard download handlers call `showTokenWarning()` when token is empty but still fetch and download (with empty token injected). The toast says "without a Bot Token, the OpenClaw build will fail."
- **Note:** This may be intentional (allow download, user adds token later). If you want to require token, block download when empty and show the toast as the reason.

### 11. **External links**
- Footer "Jason Dijols 2026" and Hardware model links use `target="_blank"` and `rel="noopener noreferrer"` — good. Consider `rel="noopener noreferrer"` on all external links for consistency and security.

### 12. **Meta/SEO**
- `index.html` description and OG copy are Ollama-focused ("deploy locally with Ollama"). The app now defaults to OpenRouter and supports multiple providers. Consider updating meta description and OG text to be provider-agnostic.

---

## What’s working well

- **Semantic structure:** Header, main, footer, sections with headings.
- **Labels:** Form inputs have `<label htmlFor>`, token visibility toggle has `aria-label`.
- **Role card icons:** Decorative emoji have `role="img"` and `aria-label={title}`.
- **Clipboard utility:** Fallback for Safari and explicit selection range is solid.
- **Modal use of `<dialog>`:** Good for semantics and focus behavior when used correctly.
- **Visual hierarchy:** Section labels, button styles, and spacing are consistent.
- **Responsive:** Grid and layout use responsive classes (sm:, lg:).

---

## Summary

- **Must-fix:** Keyboard access to role cards, modal close button labels, copy/fetch failure feedback, and preventing download of failed config in PreviewModal.
- **Should-fix:** focus-visible on controls, InfoModal step 2 copy for single-role, and focus restoration on modal close.
- **Nice-to-have:** Helper text spacing, optional token gate on download, meta copy update.
