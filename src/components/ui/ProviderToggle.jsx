const PROVIDERS = [
  { id: 'openrouter', label: 'OpenRouter', sublabel: null, disabled: false },
  { id: 'anthropic', label: 'Anthropic', sublabel: null, disabled: false },
  { id: 'openai', label: 'OpenAI', sublabel: null, disabled: false },
  { id: 'google', label: 'Google', sublabel: null, disabled: false },
  { id: 'ollama', label: 'Ollama', sublabel: 'Local', disabled: false },
]

export default function ProviderToggle({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      {PROVIDERS.map(({ id, label, sublabel, disabled }) => {
        const isActive = selected === id

        return (
          <div key={id} className="group relative">
            <button
              onClick={() => !disabled && onChange(id)}
              disabled={disabled}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-400 focus-visible:ring-offset-2 ${
                disabled
                  ? 'cursor-not-allowed border-dashed border-stone-300 bg-stone-50 text-stone-400'
                  : isActive
                    ? 'cursor-pointer border-rust-500 bg-rust-600 text-white shadow-sm'
                    : 'cursor-pointer border-stone-200 bg-white text-stone-600 hover:border-rust-400/50 hover:text-stone-900'
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
