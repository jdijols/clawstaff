import { useState, useCallback, useEffect } from 'react'
import RoleCard from './components/ui/RoleCard'
import ProviderToggle from './components/ui/ProviderToggle'
import HardwareToggle from './components/ui/HardwareToggle'
import MessagingInputs from './components/ui/MessagingInputs'
import InfoModal from './components/ui/InfoModal'
import { injectChannels } from './utils/messaging'

function WarningToast({ message, visible, onDone }) {
  useEffect(() => {
    if (visible) {
      const t = setTimeout(onDone, 4000)
      return () => clearTimeout(t)
    }
  }, [visible, onDone])

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-lg bg-amber-50 border border-amber-300 px-5 py-3 shadow-lg transition-all duration-300 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <p className="text-sm font-medium text-amber-800">{message}</p>
    </div>
  )
}

const ROLES = [
  {
    icon: '\u{1F91E}',
    title: 'Demo',
    description: 'General-purpose assistant — try it out',
    configFile: 'demo.json',
    disabled: false,
  },
  {
    icon: '\u{1F3A8}',
    title: 'UX Designer',
    description: 'Wireframes & prototypes in hours',
    configFile: 'ux-designer.json',
    disabled: true,
  },
  {
    icon: '\u{1F4BB}',
    title: 'Software Developer',
    description: 'Ship features 10x faster',
    configFile: 'software-developer.json',
    disabled: true,
  },
  {
    icon: '\u{1F52C}',
    title: 'UX Researcher',
    description: 'Insights in days, not months',
    configFile: 'ux-researcher.json',
    disabled: true,
  },
  {
    icon: '\u{1F9EA}',
    title: 'QA Tester',
    description: 'Catch bugs before they ship',
    configFile: 'qa-tester.json',
    disabled: true,
  },
  {
    icon: '\u{1F4CA}',
    title: 'Project Manager',
    description: 'Client updates on autopilot',
    configFile: 'project-manager.json',
    disabled: true,
  },
  {
    icon: '\u{1F91D}',
    title: 'Account Manager',
    description: 'Proposals & relationships, handled',
    configFile: 'account-manager.json',
    disabled: true,
  },
]

export default function App() {
  const [provider, setProvider] = useState('ollama')
  const [hardware, setHardware] = useState('intel')
  const [telegramToken, setTelegramToken] = useState('')
  const [infoOpen, setInfoOpen] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)

  // Build config base path: ollama uses hardware subdirectory
  const configBase = provider === 'ollama' && hardware
    ? `/configs/ollama/${hardware}`
    : `/configs/${provider}`

  const showTokenWarning = useCallback(() => {
    setToastVisible(true)
  }, [])

  const handleDownload = useCallback(async () => {
    if (!telegramToken.trim()) showTokenWarning()
    try {
      const res = await fetch(`${configBase}/demo.json`)
      const config = await res.json()
      injectChannels(config, { telegramToken })
      const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'openclaw.json'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Failed to download demo config:', err)
    }
  }, [configBase, telegramToken])

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          {/* Left: Logo */}
          <div className="flex items-center gap-2.5">
            <span className="text-2xl leading-none" role="img" aria-label="lobster">🦞</span>
            <span className="text-2xl font-bold tracking-tight">ClawStaff</span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="cursor-pointer rounded-lg bg-rust-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-rust-500"
            >
              Download
            </button>
            <button
              onClick={() => setInfoOpen(true)}
              className="cursor-pointer rounded-full border border-stone-200 p-2 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-700"
              aria-label="How to use"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="9" r="8" />
                <path d="M7 7a2 2 0 1 1 2.5 1.94c-.36.12-.5.36-.5.73V11" />
                <circle cx="9" cy="13.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Intro */}
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Agency-Ready OpenClaw Configs
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-500">
          For every role in your AI-native agency.
          <br />
          Download a config, drop it in, and deliver today.
        </p>
        <p className="mt-2 text-sm italic text-rust-500">(eventually..)</p>
      </section>

      {/* Config Setup */}
      <section className="mx-auto max-w-5xl px-6 pb-10">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          {/* Provider */}
          <div>
            <p className="text-sm font-medium text-stone-500">Provider</p>
            <div className="mt-3">
              <ProviderToggle selected={provider} onChange={setProvider} />
            </div>
          </div>

          {/* Hardware (Ollama only) */}
          {provider === 'ollama' && (
            <>
              <hr className="my-6 border-stone-100" />
              <div>
                <p className="text-sm font-medium text-stone-500">Hardware</p>
                <div className="mt-3">
                  <HardwareToggle selected={hardware} onChange={setHardware} />
                </div>
              </div>
            </>
          )}

          {/* Divider */}
          <hr className="my-6 border-stone-100" />

          {/* Messaging */}
          <div>
            <p className="text-sm font-medium text-stone-500">
              Messaging
            </p>
            <div className="mt-3">
              <MessagingInputs
                telegramToken={telegramToken}
                onTelegramChange={setTelegramToken}
              />
            </div>
          </div>

        </div>
      </section>

      {/* Card Grid */}
      <main className="mx-auto max-w-5xl px-6 pb-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(() => {
            let firstDisabledSeen = false
            return ROLES.map((role) => {
              const isFirstDisabled = role.disabled && !firstDisabledSeen
              if (role.disabled && !firstDisabledSeen) firstDisabledSeen = true
              return (
                <RoleCard
                  key={role.configFile}
                  {...role}
                  configPath={`${configBase}/${role.configFile}`}
                  telegramToken={telegramToken}
                  isFirstDisabled={isFirstDisabled}
                  onTokenWarning={showTokenWarning}
                />
              )
            })
          })()}
        </div>
      </main>

      {/* Footer */}
      <footer className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 pt-12 pb-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-stone-400">
          Stop building from scratch.<br className="sm:hidden" /> Start with curated setups by ClawStaff.
        </p>
        <a
          href="https://www.linkedin.com/in/jasondijols/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-stone-400 transition-colors hover:text-rust-600"
        >
          Jason Dijols 2026
        </a>
      </footer>

      {/* Info Modal */}
      <InfoModal open={infoOpen} onClose={() => setInfoOpen(false)} />

      {/* Warning Toast */}
      <WarningToast
        message="Heads up — without a Bot Token, the OpenClaw build will fail."
        visible={toastVisible}
        onDone={() => setToastVisible(false)}
      />
    </div>
  )
}
