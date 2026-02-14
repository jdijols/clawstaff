const PHONE_REGEX = /^\+\d{7,15}$/

export function isValidPhone(raw) {
  if (!raw) return false
  return PHONE_REGEX.test(raw.replace(/[\s()-]/g, ''))
}

export function injectChannels(config, {
  whatsappPhone = '',
  discordToken = '',
  telegramToken = '',
  slackBotToken = '',
  slackAppToken = '',
} = {}) {
  const trimmedPhone = whatsappPhone.replace(/[\s()-]/g, '')
  if (trimmedPhone && isValidPhone(whatsappPhone)) {
    config.channels.whatsapp.allowFrom = [trimmedPhone]
  }

  if (discordToken.trim()) {
    config.channels.discord.token = discordToken.trim()
  }

  if (telegramToken.trim()) {
    config.channels.telegram.botToken = telegramToken.trim()
  }

  if (slackBotToken.trim()) {
    config.channels.slack.botToken = slackBotToken.trim()
  }
  if (slackAppToken.trim()) {
    config.channels.slack.appToken = slackAppToken.trim()
  }

  return config
}
