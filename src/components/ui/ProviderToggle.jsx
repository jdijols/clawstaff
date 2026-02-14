const PROVIDERS = [
  { id: 'ollama', label: 'Ollama', sublabel: 'Local', disabled: false },
  { id: 'anthropic', label: 'Anthropic', sublabel: null, disabled: true },
  { id: 'openai', label: 'OpenAI', sublabel: null, disabled: true },
  { id: 'google', label: 'Google', sublabel: null, disabled: true },
  { id: 'openrouter', label: 'OpenRouter', sublabel: null, disabled: true },
]

export default function ProviderToggle({ selected, onChange }) {
  let firstDisabledSeen = false

  return (
    <div className="flex flex-wrap gap-3">
      {PROVIDERS.map(({ id, label, sublabel, disabled }) => {
        const isActive = selected === id
        const isFirstDisabled = disabled && !firstDisabledSeen
        if (disabled && !firstDisabledSeen) firstDisabledSeen = true

        return (
          <div key={id} className="group relative">
            {disabled && (
              <span
                className={`pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-stone-800 px-2 py-1 text-xs text-white shadow-lg transition-opacity ${
                  isFirstDisabled
                    ? 'opacity-100 sm:opacity-0 sm:group-hover:opacity-100'
                    : 'opacity-0 sm:group-hover:opacity-100'
                }`}
              >
                Coming soon
              </span>
            )}
            <button
              onClick={() => !disabled && onChange(id)}
              disabled={disabled}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                disabled
                  ? 'cursor-not-allowed border-dashed border-stone-300 bg-stone-50 text-stone-400'
                  : isActive
                    ? 'cursor-pointer border-rust-500 bg-rust-600 text-white shadow-sm'
                    : 'cursor-pointer border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:text-stone-900'
              }`}
            >
              {label}
              {sublabel && (
                <span
                  className={`ml-1.5 text-xs ${
                    isActive ? 'text-white/70' : 'text-stone-400'
                  }`}
                >
                  ({sublabel})
                </span>
              )}
            </button>
          </div>
        )
      })}
    </div>
  )
}
