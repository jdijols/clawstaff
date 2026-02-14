/**
 * Copy text to clipboard with fallback for mobile Safari.
 *
 * navigator.clipboard.writeText() requires the call to happen
 * in the same synchronous user-gesture stack. If an async operation
 * (like fetch) runs first, Safari revokes the permission silently.
 * The fallback uses a hidden textarea + execCommand('copy').
 */
export async function copyToClipboard(text) {
  // Try the modern API first (works on desktop & Android)
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // Fall through to legacy fallback
    }
  }

  // Legacy fallback — works on iOS Safari
  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    Object.assign(textarea.style, {
      position: 'fixed',
      left: '-9999px',
      top: '-9999px',
      opacity: '0',
    })
    document.body.appendChild(textarea)
    textarea.select()
    textarea.setSelectionRange(0, text.length) // iOS needs explicit range
    document.execCommand('copy')
    document.body.removeChild(textarea)
    return true
  } catch {
    return false
  }
}
