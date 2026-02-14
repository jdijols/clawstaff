import { useState } from 'react'
import { injectChannels } from '../../utils/messaging'
import { copyToClipboard } from '../../utils/clipboard'
import PreviewModal from './PreviewModal'
import { CopyButton, DownloadButton } from './ActionButtons'

/* ── Icon: code → eye crossfade ── */

function CodeIcon({ className }) {
  return (
    <svg width="24" height="24" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5.5 5 2 9l3.5 4M12.5 5 16 9l-3.5 4M10.5 3l-3 12" />
    </svg>
  )
}

function EyeIcon({ className }) {
  return (
    <svg width="24" height="24" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M1.5 9s3-6 7.5-6 7.5 6 7.5 6-3 6-7.5 6S1.5 9 1.5 9Z" />
      <circle cx="9" cy="9" r="2.5" />
    </svg>
  )
}

function PreviewIcon() {
  return (
    <span className="relative flex h-6 w-6">
      <CodeIcon className="absolute inset-0 text-stone-300 opacity-0 transition-opacity duration-200 sm:opacity-100 sm:group-hover:opacity-0" />
      <EyeIcon className="absolute inset-0 text-stone-600 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100" />
    </span>
  )
}

/* ── RoleCard ── */

export default function RoleCard({
  icon,
  title,
  description,
  configPath,
  whatsappPhone = '',
  discordToken = '',
  telegramToken = '',
  slackBotToken = '',
  slackAppToken = '',
}) {
  const [copyState, setCopyState] = useState('idle')
  const [dlState, setDlState] = useState('idle')
  const [previewOpen, setPreviewOpen] = useState(false)

  const channels = { whatsappPhone, discordToken, telegramToken, slackBotToken, slackAppToken }

  const handleCopy = async (e) => {
    e.stopPropagation()
    try {
      const res = await fetch(configPath)
      const config = await res.json()
      injectChannels(config, channels)
      const ok = await copyToClipboard(JSON.stringify(config, null, 2))
      if (ok) {
        setCopyState('done')
        setTimeout(() => setCopyState('idle'), 2000)
      }
    } catch (err) {
      console.error('Failed to copy config:', err)
    }
  }

  const handleDownload = async (e) => {
    e.stopPropagation()
    try {
      const res = await fetch(configPath)
      const config = await res.json()
      injectChannels(config, channels)
      const merged = JSON.stringify(config, null, 2)
      const blob = new Blob([merged], { type: 'application/json' })
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
    } catch (err) {
      console.error('Failed to download config:', err)
    }
  }

  return (
    <>
      <div
        onClick={() => setPreviewOpen(true)}
        className="group cursor-pointer rounded-2xl border border-rust-400/50 bg-white p-6 shadow-md transition-all sm:border-stone-200 sm:shadow-sm sm:hover:border-rust-400/50 sm:hover:shadow-md"
      >
        <div className="flex items-center justify-between">
          <span className="text-3xl" role="img" aria-label={title}>
            {icon}
          </span>
          <PreviewIcon />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-stone-900">{title}</h3>
        <p className="mt-1 text-sm text-stone-500">{description}</p>

        <div className="mt-5 flex gap-3">
          <CopyButton state={copyState} onClick={handleCopy} />
          <DownloadButton state={dlState} onClick={handleDownload} />
        </div>
      </div>

      <PreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        configPath={configPath}
        title={title}
        channels={channels}
      />
    </>
  )
}
