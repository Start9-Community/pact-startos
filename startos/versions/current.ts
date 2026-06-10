import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.15.0:0',
  releaseNotes: {
    en_US:
      'pactd 0.15.0 — form bonds from the Web UI. Copy your bond address, paste theirs, choose private or public, and accept inbound proposals from the new inbox — the full bond lifecycle with no command line. Private is the default.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
