import { useEffect, useRef, useState } from 'react'

const ANIM_DURATION = 250

const STEPS = [
  {
    number: '1',
    title: 'Configure your setup (Currently Ollama)',
    description: 'Choose your hardware and paste your Telegram bot token.',
  },
  {
    number: '2',
    title: 'Download the Demo config',
    description: 'Use the Demo card to copy or download the config file.',
  },
  {
    number: '3',
    title: 'Save to ~/.openclaw/openclaw.json',
    description: 'Place the config file in your OpenClaw home directory.',
  },
  {
    number: '4',
    title: 'Validate and start',
    description: 'Run the doctor command, then launch OpenClaw.',
    code: 'openclaw doctor --fix && openclaw gateway',
  },
  {
    number: '5',
    title: 'Pair with Telegram',
    description: 'Open Telegram and send any message to your bot. OpenClaw will prompt you to approve the pairing — once confirmed, you\'re connected.',
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
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error('Failed to copy:', err)
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
          {copied ? <CheckIcon className="text-green-600" /> : <CopyIcon />}
          <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-stone-800 px-1.5 py-0.5 text-[10px] font-medium text-white opacity-0 transition-opacity group-hover/btn:opacity-100">
            {copied ? 'Copied' : 'Copy'}
          </span>
        </span>
      </button>
    </div>
  )
}

export default function InfoModal({ open, onClose }) {
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
      }
      el.addEventListener('animationend', onEnd)
      // Fallback in case animationend doesn't fire
      setTimeout(() => { if (el.open) { onEnd() } }, ANIM_DURATION + 50)
    }

    return () => { document.body.style.overflow = '' }
  }, [open])

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
            className="cursor-pointer -mt-1 -mr-1 rounded-lg p-1.5 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
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
            Make sure Ollama is running and you've pulled the required model before starting. The <code className="rounded bg-stone-200 px-1 py-0.5 text-xs font-mono text-stone-700">openclaw doctor --fix</code> command will verify everything is set up correctly.
          </p>
        </div>
      </div>
    </dialog>
  )
}
