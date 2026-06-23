import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'pactd',
  title: 'Pact',
  license: 'Apache-2.0',
  packageRepo: 'https://github.com/Start9-Community/pact-startos',
  upstreamRepo: 'https://github.com/bobodread876/pact',
  marketingUrl: 'https://bobodread876.github.io/pact-site/',
  donationUrl: null,
  description: { short, long },
  volumes: ['main'],
  images: {
    pactd: {
      source: { dockerTag: 'ghcr.io/bobodread876/pactd:0.18.0' },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {},
})
