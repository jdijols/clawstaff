const PROVIDERS = [
  { id: 'ollama', label: 'Ollama', sublabel: 'Local' },
  { id: 'anthropic', label: 'Anthropic', sublabel: null },
  { id: 'openai', label: 'OpenAI', sublabel: null },
  { id: 'google', label: 'Google', sublabel: null },
  { id: 'openrouter', label: 'OpenRouter', sublabel: null },
]

export default function ProviderToggle({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      {PROVIDERS.map(({ id, label, sublabel }) => {
        const isActive = selected === id
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-medium transition-all ${
              isActive
                ? 'border-rust-500 bg-rust-600 text-white shadow-sm'
                : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:text-stone-900'
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
        )
      })}
    </div>
  )
}
