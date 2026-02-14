# ClawStaff

**The AI-Native Agency Starter Kit** — pre-built [OpenClaw](https://docs.openclaw.ai) configs for every role in your agency, ready to download and deploy in seconds.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## What is ClawStaff?

Setting up an AI-powered agency from scratch means writing config files for every role, every provider, and every messaging channel — over and over. **ClawStaff eliminates that.**

Pick your LLM provider, optionally plug in your messaging tokens, and download production-ready OpenClaw configs for six core agency roles. One click, one ZIP, zero boilerplate.

## Features

- **6 Agency Roles** — UX Designer, Software Developer, UX Researcher, QA Tester, Project Manager, and Account Manager, each with a purpose-built config and optimized model selection.
- **5 LLM Providers** — Ollama (local), Anthropic, OpenAI, Google, and OpenRouter. Each role is mapped to the best-fit model for that provider.
- **4 Messaging Channels** — Telegram, Discord, Slack, and WhatsApp. Enter your tokens once and they're injected into every config you download.
- **Live Config Preview** — Click any role card to inspect the full merged JSON with syntax highlighting before downloading.
- **Download Set** — Grab all 6 role configs for your chosen provider as a single `.zip` file.
- **Copy or Download Individually** — Every card has one-click copy-to-clipboard and single-file download.
- **Zero Dependencies at Runtime** — Configs are pure JSON; no backend, no database, no API calls. The entire app is a static site.

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | [React 19](https://react.dev) |
| Build | [Vite 7](https://vite.dev) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| ZIP Generation | [JSZip](https://stuk.github.io/jszip/) |
| Package Manager | [pnpm](https://pnpm.io) |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18+
- [pnpm](https://pnpm.io/installation) 9+

### Install & Run

```bash
# Clone the repo
git clone https://github.com/your-username/ClawStaff.git
cd ClawStaff

# Install dependencies
pnpm install

# Start the dev server (port 8081)
pnpm dev
```

Open [http://localhost:8081](http://localhost:8081) in your browser.

### Build for Production

```bash
pnpm build
pnpm preview
```

The output lands in `dist/` — deploy it to any static host (Vercel, Netlify, Cloudflare Pages, etc.).

## Project Structure

```
ClawStaff/
├── public/
│   ├── favicon.png
│   └── configs/                  # 30 pre-built JSON configs
│       ├── ollama/               #   6 roles × 5 providers
│       ├── anthropic/
│       ├── openai/
│       ├── google/
│       └── openrouter/
├── src/
│   ├── App.jsx                   # Root layout, state, and routing
│   ├── index.css                 # Tailwind theme & custom animations
│   ├── hooks/
│   │   └── useDownloadSet.js     # ZIP download logic
│   ├── utils/
│   │   └── messaging.js          # Channel token injection & validation
│   └── components/ui/
│       ├── ActionButtons.jsx     # Shared Copy & Download buttons
│       ├── InfoModal.jsx         # Usage instructions modal
│       ├── MessagingInputs.jsx   # Token/phone input fields
│       ├── PreviewModal.jsx      # Full config preview with highlighting
│       ├── ProviderToggle.jsx    # LLM provider selector
│       └── RoleCard.jsx          # Individual role card
├── index.html
├── vite.config.js
└── package.json
```

## How It Works

1. **Choose a provider** — The toggle switches between Ollama, Anthropic, OpenAI, Google, and OpenRouter.
2. **Add messaging tokens** *(optional)* — Enter your Telegram bot token, Discord bot token, Slack tokens, or WhatsApp number. These get merged into the config JSON at download time.
3. **Preview, copy, or download** — Click a role card to preview the full config with syntax highlighting. Use the Copy or Download buttons on the card or inside the preview modal.
4. **Download the full set** — Hit "Download Set" in the header or config panel to get all 6 roles as a ZIP.
5. **Drop into OpenClaw** — Move the config file(s) to `~/.openclaw/` and you're live.

## Roles & Models

| Role | Ollama | Anthropic | OpenAI | Google | OpenRouter |
|---|---|---|---|---|---|
| UX Designer | `llama3.3:70b` | `claude-opus-4-6` | `gpt-4.1` | `gemini-3-pro-preview` | `anthropic/claude-opus-4-6` |
| Software Developer | `qwen3:32b` | `claude-opus-4-6` | `gpt-4.1` | `gemini-3-pro-preview` | `anthropic/claude-opus-4-6` |
| UX Researcher | `phi-4:14b` | `claude-sonnet-4-6` | `gpt-4.1-mini` | `gemini-2.5-flash` | `anthropic/claude-sonnet-4-6` |
| QA Tester | `qwen3:32b` | `claude-sonnet-4-6` | `gpt-4.1` | `gemini-3-pro-preview` | `anthropic/claude-sonnet-4-6` |
| Project Manager | `phi-4:14b` | `claude-sonnet-4-6` | `gpt-4.1-mini` | `gemini-2.5-flash` | `anthropic/claude-sonnet-4-6` |
| Account Manager | `llama3.3:70b` | `claude-sonnet-4-6` | `gpt-4.1-mini` | `gemini-2.5-flash` | `anthropic/claude-sonnet-4-6` |

> Models are chosen per-role based on the task complexity and the provider's strengths. Heavy reasoning roles (Designer, Developer, QA) use flagship models; communication-heavy roles (PM, Account Manager) use fast, cost-effective models.

## API Keys

Cloud providers require an API key. Each non-Ollama config includes an `env` block with a placeholder:

```json
{
  "env": {
    "ANTHROPIC_API_KEY": "your-anthropic-api-key"
  }
}
```

Replace the placeholder in the config, or add the key to `~/.openclaw/.env` — OpenClaw reads both.

| Provider | Environment Variable |
|---|---|
| Anthropic | `ANTHROPIC_API_KEY` |
| OpenAI | `OPENAI_API_KEY` |
| Google | `GOOGLE_API_KEY` |
| OpenRouter | `OPENROUTER_API_KEY` |

Ollama runs locally and needs no API key.

## Messaging Channels

| Channel | What You Need | Where to Get It |
|---|---|---|
| Telegram | Bot Token | [@BotFather](https://core.telegram.org/bots/tutorial) |
| Discord | Bot Token | [Developer Portal](https://discord.com/developers/applications) |
| Slack | Bot Token + App Token | [api.slack.com](https://api.slack.com/quickstart) |
| WhatsApp | Phone number with country code | Your device |

All channels are optional. If you leave a field empty, the channel block stays in the config with empty values — OpenClaw will simply skip it.

## License

MIT — use it, fork it, ship it.

## Credits

Built by [Jason Dijols](https://www.linkedin.com/in/jasondijols/) for the OpenClaw Hackathon 2026.
