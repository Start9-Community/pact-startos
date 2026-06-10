import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.14.0:0',
  releaseNotes: {
    en_US:
      'pactd 0.14.0 — private bonds: form a bond with private: true to keep it off the public graph entirely (NIP-59 gift wrap, embedded BIP-340 proof). Only the two parties can read or verify it; either can selectively disclose it. Accept flows echo the proposal channel; listing/verify/SSE cover both transports.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
