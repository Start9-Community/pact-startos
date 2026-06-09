import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.12.0:0',
  releaseNotes: {
    en_US:
      'pactd 0.12.0 — public mode: the access token is no longer embedded in the served page. Read it from /data/.pact/token and enter it to manage the UI.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
