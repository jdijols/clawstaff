import { useState } from 'react'
import { isValidPhone } from '../../utils/messaging'

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5Z" />
      <circle cx="8" cy="8" r="2" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 2l12 12M6.5 6.5a2 2 0 0 0 2.83 2.83M4.2 4.2C2.7 5.3 1 8 1 8s2.5 5 7 5c1.3 0 2.5-.4 3.5-1M9.9 4.2C14 5.5 15 8 15 8s-2.5 5-7 5" />
    </svg>
  )
}

function validatePhone(value) {
  if (!value) return null
  const digits = value.replace(/[\s()-]/g, '')
  return isValidPhone(value) ? null : 'Enter a valid international number (e.g. +15551234567)'
}

function TokenInput({ id, label, value, onChange, placeholder, helperText, helperLink, helperLinkText }) {
  const [visible, setVisible] = useState(false)

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-stone-700">
        {label}
      </label>
      <div className="relative mt-1.5">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 pr-10 text-sm text-stone-900 outline-none transition-colors placeholder:text-stone-400 focus:border-rust-400 focus:ring-1 focus:ring-rust-400"
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded p-1 text-stone-400 transition-colors hover:text-stone-600"
          aria-label={visible ? 'Hide token' : 'Show token'}
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      <p className="mt-1.5 text-xs text-stone-400">
        {helperText}{' '}
        {helperLink && (
          <a
            href={helperLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-rust-600 underline underline-offset-2 hover:text-rust-500"
          >
            {helperLinkText}
          </a>
        )}
      </p>
    </div>
  )
}

export default function MessagingInputs({
  whatsappPhone,
  onWhatsappChange,
  discordToken,
  onDiscordChange,
  telegramToken,
  onTelegramChange,
  slackBotToken,
  onSlackBotChange,
  slackAppToken,
  onSlackAppChange,
}) {
  const [phoneBlurred, setPhoneBlurred] = useState(false)

  const phoneError = phoneBlurred ? validatePhone(whatsappPhone) : null

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {/* Telegram */}
      <TokenInput
        id="telegram-token"
        label="Telegram Bot Token"
        value={telegramToken}
        onChange={onTelegramChange}
        placeholder="123456:ABC-DEF..."
        helperText="Get a token from"
        helperLink="https://core.telegram.org/bots/tutorial"
        helperLinkText="@BotFather"
      />

      {/* Discord */}
      <TokenInput
        id="discord-token"
        label="Discord Bot Token"
        value={discordToken}
        onChange={onDiscordChange}
        placeholder="MTk4NjIy..."
        helperText="Create a bot at the"
        helperLink="https://discord.com/developers/applications"
        helperLinkText="Discord Developer Portal"
      />

      {/* Slack Bot Token */}
      <TokenInput
        id="slack-bot-token"
        label="Slack Bot Token"
        value={slackBotToken}
        onChange={onSlackBotChange}
        placeholder="xoxb-..."
        helperText="Create an app at"
        helperLink="https://api.slack.com/quickstart"
        helperLinkText="api.slack.com"
      />

      {/* Slack App Token */}
      <TokenInput
        id="slack-app-token"
        label="Slack App Token"
        value={slackAppToken}
        onChange={onSlackAppChange}
        placeholder="xapp-..."
        helperText="Socket Mode token from your"
        helperLink="https://api.slack.com/apps"
        helperLinkText="Slack app settings"
      />

      {/* WhatsApp */}
      <div>
        <label htmlFor="whatsapp-phone" className="block text-sm font-medium text-stone-700">
          WhatsApp Phone Number
        </label>
        <input
          id="whatsapp-phone"
          type="tel"
          value={whatsappPhone}
          onChange={(e) => onWhatsappChange(e.target.value)}
          onFocus={() => { if (!whatsappPhone) onWhatsappChange('+1') }}
          onBlur={() => setPhoneBlurred(true)}
          placeholder="+1 (555) 123-4567"
          className={`mt-1.5 w-full rounded-lg border bg-white px-3 py-2 text-sm text-stone-900 outline-none transition-colors placeholder:text-stone-400 focus:border-rust-400 focus:ring-1 focus:ring-rust-400 ${
            phoneError ? 'border-red-400' : 'border-stone-200'
          }`}
        />
        {phoneError ? (
          <p className="mt-1.5 text-xs text-red-500">{phoneError}</p>
        ) : (
          <p className="mt-1.5 text-xs text-stone-400">
            Your WhatsApp number for receiving messages
          </p>
        )}
      </div>
    </div>
  )
}
