const HARDWARE_OPTIONS = [
  { id: 'intel', label: 'Intel Macs', disabled: false },
  { id: 'mseries', label: 'M-Series Macs', disabled: false },
  { id: 'windows', label: 'Windows', disabled: true },
  { id: 'linux', label: 'Linux', disabled: true },
]

const MODEL_INFO = {
  intel: {
    model: 'qwen2.5:0.5b',
    pullCmd: 'ollama pull qwen2.5:0.5b',
    url: 'https://ollama.com/library/qwen2.5:0.5b',
  },
  mseries: {
    model: 'llama3.2:3b',
    pullCmd: 'ollama pull llama3.2:3b',
    url: 'https://ollama.com/library/llama3.2:3b',
  },
}

export default function HardwareToggle({ selected, onChange }) {
  const info = selected ? MODEL_INFO[selected] : null
  let firstDisabledSeen = false

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {HARDWARE_OPTIONS.map(({ id, label, disabled }) => {
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
              </button>
            </div>
          )
        })}
      </div>

      {info && (
        <p className="mt-3 text-sm text-stone-500">
          Requires{' '}
          <a
            href={info.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-rust-600 underline underline-offset-2 transition-colors hover:text-rust-500"
          >
            {info.model}
          </a>
          {' '}&mdash;{' '}
          <span className="font-mono text-xs text-stone-400">
            {info.pullCmd}
          </span>
        </p>
      )}
    </div>
  )
}
