function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="5" width="8" height="8" rx="1.5" />
      <path d="M9 5V2.5A1.5 1.5 0 0 0 7.5 1h-5A1.5 1.5 0 0 0 1 2.5v5A1.5 1.5 0 0 0 2.5 9H5" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7.5l3 3 5-6" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 1v9M3.5 6.5 7 10l3.5-3.5M2 12.5h10" />
    </svg>
  )
}

const BTN_BASE = 'w-[7.5rem] cursor-pointer justify-center inline-flex items-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-colors'

export function CopyButton({ state, onClick, className = '', disabled = false }) {
  const isDone = state === 'done'
  const isError = state === 'error'
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${BTN_BASE} border border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-stone-50 disabled:hover:text-stone-600 ${className}`}
    >
      {isDone ? <CheckIcon /> : <CopyIcon />}
      {isDone ? 'Copied!' : isError ? 'Copy failed' : 'Copy'}
    </button>
  )
}

export function DownloadButton({ state, onClick, className = '', disabled = false }) {
  const isDone = state === 'done'
  const isError = state === 'error'
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${BTN_BASE} bg-rust-600 text-white hover:bg-rust-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-rust-600 ${className}`}
    >
      {isDone ? <CheckIcon /> : <DownloadIcon />}
      {isDone ? 'Downloaded!' : isError ? 'Download failed' : 'Download'}
    </button>
  )
}
