import { useEffect, useRef, useState } from 'react'

const ANIM_DURATION = 250

const STEPS = [
  {
    number: '1',
    title: 'Configure your setup',
    description: 'Choose your provider (and hardware if you use Ollama). Add your Telegram bot token and any other messaging credentials you need.',
  },
  {
    number: '2',
    title: 'Download config(s)',
    description: 'Use a role card to copy or download a single config. Use "Download" or "Download Set" in the header—and the "Download Set (.zip)" row in the config panel when you have multiple roles—to get all configs for your chosen provider.',
  },
  {
    number: '3',
    title: 'Save to ~/.openclaw/openclaw.json',
    description: 'Place the config file in your OpenClaw home directory.',
  },
  {
    number: '4',
    title: 'Validate and start',
    description: 'Run the doctor command to verify your setup, then launch OpenClaw.',
    code: 'openclaw doctor --fix && openclaw gateway',
  },
  {
    number: '5',
    title: 'Connect messaging',
    description: 'OpenClaw uses the channels you added in step 1. For Telegram: send a message to your bot, then approve the pairing when prompted.',
  },
]

function CopyIcon({ className }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="5" y="5" width="8" height="8" rx="1.5" />
      <path d="M9 5V2.5A1.5 1.5 0 0 0 7.5 1h-5A1.5 1.5 0 0 0 1 2.5v5A1.5 1.5 0 0 0 2.5 9H5" />
    </svg>
  )
}

function CheckIcon({ className }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 7.5l3 3 5-6" />
    </svg>
  )
}

function CodeBlock({ code }) {
  const [copyState, setCopyState] = useState('idle') // 'idle' | 'done' | 'error'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopyState('done')
      setTimeout(() => setCopyState('idle'), 1500)
    } catch (err) {
      console.error('Failed to copy:', err)
      setCopyState('error')
      setTimeout(() => setCopyState('idle'), 1500)
    }
  }

  return (
    <div className="group/code relative mt-2 flex items-center rounded-lg bg-stone-100">
      <code className="block flex-1 overflow-x-auto px-3 py-2 text-xs text-stone-700">
        {code}
      </code>
      <button
        onClick={handleCopy}
        className="group/btn cursor-pointer mr-1.5 shrink-0 rounded-md p-1.5 text-stone-400 opacity-0 transition-all hover:bg-stone-200 hover:text-stone-600 group-hover/code:opacity-100"
        aria-label="Copy to clipboard"
      >
        <span className="relative flex items-center">
          {copyState === 'done' ? <CheckIcon className="text-green-600" /> : <CopyIcon />}
          <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-stone-800 px-1.5 py-0.5 text-[10px] font-medium text-white opacity-0 transition-opacity group-hover/btn:opacity-100">
            {copyState === 'done' ? 'Copied' : copyState === 'error' ? 'Copy failed' : 'Copy'}
          </span>
        </span>
      </button>
    </div>
  )
}

export default function InfoModal({ open, onClose, onClosed }) {
  const dialogRef = useRef(null)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return

    if (open) {
      setClosing(false)
      document.body.style.overflow = 'hidden'
      el.showModal()
    } else if (el.open) {
      setClosing(true)
      const onEnd = () => {
        el.removeEventListener('animationend', onEnd)
        document.body.style.overflow = ''
        el.close()
        setClosing(false)
        onClosed?.()
      }
      el.addEventListener('animationend', onEnd)
      // Fallback in case animationend doesn't fire
      setTimeout(() => { if (el.open) { onEnd() } }, ANIM_DURATION + 50)
    }

    return () => { document.body.style.overflow = '' }
  }, [open, onClosed])

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => { e.preventDefault(); onClose() }}
      onClick={handleBackdropClick}
      className={`m-auto max-w-lg w-full rounded-2xl border border-stone-200 bg-white p-0 shadow-xl backdrop:backdrop-blur-sm ${
        closing ? 'animate-fade-out backdrop:animate-backdrop-out' : 'animate-fade-in backdrop:animate-backdrop-in'
      }`}
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold text-stone-900">
            How to use ClawStaff
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer -mt-1 -mr-1 rounded-lg p-1.5 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-400 focus-visible:ring-offset-2"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>
        </div>

        <ol className="mt-6 space-y-5">
          {STEPS.map((step) => (
            <li key={step.number} className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rust-600 text-xs font-bold text-white">
                {step.number}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-stone-900">
                  {step.title}
                </p>
                <p className="mt-0.5 text-sm text-stone-500">
                  {step.description}
                </p>
                {step.code && <CodeBlock code={step.code} />}
              </div>
            </li>
          ))}
        </ol>

        {/* Reminder */}
        <div className="mt-6 rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
          <p className="text-sm font-medium text-stone-700">
            Don't forget!
          </p>
          <p className="mt-1 text-sm text-stone-500">
            Run <code className="rounded bg-stone-200 px-1 py-0.5 text-xs font-mono text-stone-700">openclaw doctor --fix</code> to verify your setup. If you use Ollama, ensure it's running and you've pulled the required model. For cloud providers, ensure your API keys are configured.
          </p>
        </div>
      </div>
    </dialog>
  )
}
