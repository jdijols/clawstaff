import { useEffect, useRef, useState } from 'react'
import { injectChannels } from '../../utils/messaging'
import { CopyButton, DownloadButton } from './ActionButtons'

/* ── Syntax highlighting (lightweight, no deps) ── */

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function highlightJSON(json) {
  return json.replace(
    /("(?:[^"\\]|\\.)*")\s*(:)?|(\b(?:true|false|null)\b)|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g,
    (match, str, colon, keyword, num) => {
      if (str) {
        const safe = esc(str)
        if (colon) return `<span class="text-rust-600">${safe}</span>:`
        return `<span class="text-emerald-600">${safe}</span>`
      }
      if (keyword === 'true' || keyword === 'false') return `<span class="text-amber-600">${keyword}</span>`
      if (keyword === 'null') return `<span class="text-stone-400">${keyword}</span>`
      if (num) return `<span class="text-blue-500">${num}</span>`
      return esc(match)
    },
  )
}

/* ── PreviewModal ── */

export default function PreviewModal({
  open,
  onClose,
  configPath,
  title,
  channels,
}) {
  const dialogRef = useRef(null)
  const [json, setJson] = useState('')
  const [copyState, setCopyState] = useState('idle')
  const [dlState, setDlState] = useState('idle')
  const [closing, setClosing] = useState(false)

  // Open / close dialog with exit animation
  useEffect(() => {
    const el = dialogRef.current
    if (!el) return

    if (open) {
      setClosing(false)
      document.body.style.overflow = 'hidden'
      el.showModal()
    } else if (el.open) {
      // Play exit animation, then close
      setClosing(true)
      const onEnd = () => {
        el.removeEventListener('animationend', onEnd)
        document.body.style.overflow = ''
        el.close()
        setClosing(false)
      }
      el.addEventListener('animationend', onEnd)
    }

    return () => { document.body.style.overflow = '' }
  }, [open])

  // Fetch & merge config when opened or inputs change
  useEffect(() => {
    if (!open || !configPath) return
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(configPath)
        const config = await res.json()
        injectChannels(config, channels)
        if (!cancelled) setJson(JSON.stringify(config, null, 2))
      } catch (err) {
        if (!cancelled) setJson('// Failed to load config')
      }
    })()
    return () => { cancelled = true }
  }, [open, configPath, channels])

  const handleBackdrop = (e) => {
    if (e.target === dialogRef.current) onClose()
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(json)
      setCopyState('done')
      setTimeout(() => setCopyState('idle'), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = configPath.split('/').pop()
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setDlState('done')
    setTimeout(() => setDlState('idle'), 2000)
  }

  const highlighted = json ? highlightJSON(json) : ''

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => { e.preventDefault(); onClose() }}
      onClick={handleBackdrop}
      style={{
        position: 'fixed',
        top: 'auto',
        left: 0,
        right: 0,
        bottom: 0,
        margin: 0,
        width: '100%',
        maxWidth: 'none',
        maxHeight: '95vh',
      }}
      className={`
        rounded-t-2xl border border-stone-200 bg-white p-0 shadow-xl
        backdrop:backdrop-blur-sm
        ${closing ? 'animate-slide-down backdrop:animate-backdrop-out' : 'animate-slide-up backdrop:animate-backdrop-in'}
      `}
    >
      <div className="flex h-full max-h-[95vh] flex-col">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-stone-100 px-5 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <CopyButton state={copyState} onClick={handleCopy} />
            <DownloadButton state={dlState} onClick={handleDownload} />

            {/* Title */}
            <span className="hidden sm:inline text-sm font-medium text-stone-400">
              {title}
            </span>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg p-1.5 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>
        </div>

        {/* JSON Body */}
        <div className="flex-1 overflow-auto p-5 sm:p-6">
          <pre className="text-[13px] leading-relaxed font-mono">
            <code dangerouslySetInnerHTML={{ __html: highlighted }} />
          </pre>
        </div>

        {/* Mobile drag hint */}
        <div className="sm:hidden flex justify-center pb-2 pt-1">
          <div className="h-1 w-10 rounded-full bg-stone-200" />
        </div>
      </div>
    </dialog>
  )
}
