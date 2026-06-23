export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Pact daemon…': 0,
  'Web Interface': 1,
  'The Pact daemon is ready': 2,
  'The Pact daemon is not ready': 3,

  // interfaces.ts
  'Web UI': 4,
  'Pact status UI & agent API': 5,

  // actions/index.ts
  'Show access token': 6,
  "Reveal this node's Pact API token. Paste it into the Pact web UI to unlock it, or set it as PACT_TOKEN for your agent.": 7,
  'Pact access token': 8,
  'Paste this into the Pact web UI to unlock it, or set it as PACT_TOKEN for your agent. Tip: opening the UI at <your-node-url>/#token=<this-value> unlocks it automatically. Keep it secret.': 9,
  'No token yet — start the service once so it generates its token (at /data/.pact/token), then run this action again.': 10,
  '(not generated yet — start the service first)': 11,
  'Rotate access token': 12,
  'Generate a new Pact API token and load it — the service restarts if running, otherwise the new token applies on next start.': 13,
  'This immediately invalidates the current token. Every agent configured with PACT_TOKEN must be updated, any open web UI must be unlocked again, and a running service will restart.': 14,
  'New Pact access token': 15,
  'This is your new token — the old one no longer works. Paste it into the web UI to unlock it, or set it as PACT_TOKEN for your agent. Keep it secret.': 16,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
