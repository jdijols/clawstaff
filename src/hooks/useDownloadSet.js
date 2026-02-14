import { useState, useCallback } from 'react'
import JSZip from 'jszip'
import { injectChannels } from '../utils/messaging'

const CONFIG_FILES = [
  'ux-designer.json',
  'software-developer.json',
  'ux-researcher.json',
  'qa-tester.json',
  'project-manager.json',
  'account-manager.json',
]

export default function useDownloadSet({ provider, whatsappPhone, discordToken, telegramToken, slackBotToken, slackAppToken }) {
  const [downloading, setDownloading] = useState(false)

  const channels = { whatsappPhone, discordToken, telegramToken, slackBotToken, slackAppToken }

  const downloadSet = useCallback(async () => {
    if (downloading) return
    setDownloading(true)

    try {
      const zip = new JSZip()

      const fetches = CONFIG_FILES.map(async (file) => {
        const res = await fetch(`/configs/${provider}/${file}`)
        const config = await res.json()
        injectChannels(config, channels)
        zip.file(file, JSON.stringify(config, null, 2))
      })

      await Promise.all(fetches)

      const blob = await zip.generateAsync({ type: 'blob' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `clawstaff-${provider}.zip`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Failed to download set:', err)
    } finally {
      setDownloading(false)
    }
  }, [provider, whatsappPhone, discordToken, telegramToken, slackBotToken, slackAppToken, downloading])

  return { downloadSet, downloading }
}
