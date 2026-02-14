import { useState } from 'react'
import RoleCard from './components/ui/RoleCard'
import ProviderToggle from './components/ui/ProviderToggle'
import MessagingInputs from './components/ui/MessagingInputs'
import InfoModal from './components/ui/InfoModal'
import useDownloadSet from './hooks/useDownloadSet'

const ROLES = [
  {
    icon: '\u{1F3A8}',
    title: 'UX Designer',
    description: 'Wireframes & prototypes in hours',
    configFile: 'ux-designer.json',
  },
  {
    icon: '\u{1F4BB}',
    title: 'Software Developer',
    description: 'Ship features 10x faster',
    configFile: 'software-developer.json',
  },
  {
    icon: '\u{1F52C}',
    title: 'UX Researcher',
    description: 'Insights in days, not months',
    configFile: 'ux-researcher.json',
  },
  {
    icon: '\u{1F9EA}',
    title: 'QA Tester',
    description: 'Catch bugs before they ship',
    configFile: 'qa-tester.json',
  },
  {
    icon: '\u{1F4CA}',
    title: 'Project Manager',
    description: 'Client updates on autopilot',
    configFile: 'project-manager.json',
  },
  {
    icon: '\u{1F91D}',
    title: 'Account Manager',
    description: 'Proposals & relationships, handled',
    configFile: 'account-manager.json',
  },
]

export default function App() {
  const [provider, setProvider] = useState('ollama')
  const [whatsappPhone, setWhatsappPhone] = useState('')
  const [discordToken, setDiscordToken] = useState('')
  const [telegramToken, setTelegramToken] = useState('')
  const [slackBotToken, setSlackBotToken] = useState('')
  const [slackAppToken, setSlackAppToken] = useState('')
  const [infoOpen, setInfoOpen] = useState(false)
  const { downloadSet, downloading } = useDownloadSet({
    provider, whatsappPhone, discordToken, telegramToken, slackBotToken, slackAppToken,
  })

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
              onClick={downloadSet}
              disabled={downloading}
              className="cursor-pointer rounded-lg bg-rust-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-rust-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {downloading ? 'Zipping...' : 'Download Set'}
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
          Copy a single file or download the set. Deliver today.
        </p>
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

          {/* Divider */}
          <hr className="my-6 border-stone-100" />

          {/* Messaging */}
          <div>
            <p className="text-sm font-medium text-stone-500">
              Messaging integrations{' '}
              <span className="text-stone-400">(optional)</span>
            </p>
            <div className="mt-3">
              <MessagingInputs
                whatsappPhone={whatsappPhone}
                onWhatsappChange={setWhatsappPhone}
                discordToken={discordToken}
                onDiscordChange={setDiscordToken}
                telegramToken={telegramToken}
                onTelegramChange={setTelegramToken}
                slackBotToken={slackBotToken}
                onSlackBotChange={setSlackBotToken}
                slackAppToken={slackAppToken}
                onSlackAppChange={setSlackAppToken}
              />
            </div>
          </div>

          {/* Divider */}
          <hr className="my-6 border-stone-100" />

          {/* Download Set */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-stone-500">
              Download all 6 configs for{' '}
              <span className="font-medium text-stone-700 capitalize">{provider}</span>
            </p>
            <button
              onClick={downloadSet}
              disabled={downloading}
              className="cursor-pointer rounded-lg border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {downloading ? 'Zipping...' : 'Download Set (.zip)'}
            </button>
          </div>
        </div>
      </section>

      {/* Card Grid */}
      <main className="mx-auto max-w-5xl px-6 pb-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ROLES.map((role) => (
            <RoleCard
              key={role.configFile}
              {...role}
              configPath={`/configs/${provider}/${role.configFile}`}
              whatsappPhone={whatsappPhone}
              discordToken={discordToken}
              telegramToken={telegramToken}
              slackBotToken={slackBotToken}
              slackAppToken={slackAppToken}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 pt-12 pb-8 sm:flex-row sm:justify-between">
        <p className="text-sm text-stone-400">
          Stop building from scratch. Start with curated setups by ClawStaff.
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
    </div>
  )
}
