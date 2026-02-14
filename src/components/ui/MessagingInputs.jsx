import { useState } from 'react'

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

function DisabledInput({ label, placeholder, isFirstDisabled }) {
  return (
    <div className="group">
      <div className="pointer-events-none select-none">
        <label className="block text-sm font-medium text-stone-400">
          {label}
        </label>
        <div className="relative mt-1.5">
          <span
            className={`pointer-events-none absolute -top-8 right-0 z-10 whitespace-nowrap rounded bg-stone-800 px-2 py-1 text-xs text-white shadow-lg transition-opacity ${
              isFirstDisabled
                ? 'opacity-100 sm:opacity-0 sm:group-hover:opacity-100'
                : 'opacity-0 sm:group-hover:opacity-100'
            }`}
          >
            Coming soon
          </span>
          <input
            type="text"
            disabled
            placeholder={placeholder}
            className="w-full cursor-not-allowed rounded-lg border border-dashed border-stone-300 bg-stone-50 px-3 py-2 pr-10 text-sm text-stone-400 placeholder:text-stone-400"
          />
        </div>
      </div>
    </div>
  )
}

function DisabledPhoneInput({ label, placeholder, isFirstDisabled }) {
  return (
    <div className="group">
      <div className="pointer-events-none select-none">
        <label className="block text-sm font-medium text-stone-400">
          {label}
        </label>
        <div className="relative mt-1.5">
          <span
            className={`pointer-events-none absolute -top-8 right-0 z-10 whitespace-nowrap rounded bg-stone-800 px-2 py-1 text-xs text-white shadow-lg transition-opacity ${
              isFirstDisabled
                ? 'opacity-100 sm:opacity-0 sm:group-hover:opacity-100'
                : 'opacity-0 sm:group-hover:opacity-100'
            }`}
          >
            Coming soon
          </span>
          <input
            type="text"
            disabled
            placeholder={placeholder}
            className="w-full cursor-not-allowed rounded-lg border border-dashed border-stone-300 bg-stone-50 px-3 py-2 text-sm text-stone-400 placeholder:text-stone-400"
          />
        </div>
      </div>
    </div>
  )
}

export default function MessagingInputs({
  telegramToken,
  onTelegramChange,
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {/* Telegram — enabled */}
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

      {/* Discord — disabled */}
      <DisabledInput
        label="Discord Bot Token"
        placeholder="MTk4NjIy..."
        isFirstDisabled
      />

      {/* Slack Bot Token — disabled */}
      <DisabledInput
        label="Slack Bot Token"
        placeholder="xoxb-..."
        isFirstDisabled={false}
      />

      {/* Slack App Token — disabled */}
      <DisabledInput
        label="Slack App Token"
        placeholder="xapp-..."
        isFirstDisabled={false}
      />

      {/* WhatsApp — disabled */}
      <DisabledPhoneInput
        label="WhatsApp Phone Number"
        placeholder="+1 (555) 123-4567"
        isFirstDisabled={false}
      />
    </div>
  )
}
