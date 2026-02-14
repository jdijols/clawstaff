export function injectChannels(config, {
  telegramToken = '',
} = {}) {
  if (telegramToken.trim()) {
    if (config.channels?.telegram) {
      config.channels.telegram.botToken = telegramToken.trim()
    }
  }

  return config
}
