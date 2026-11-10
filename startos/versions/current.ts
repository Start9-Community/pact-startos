import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.20.3:0',
  releaseNotes: {
    en_US: `Updated Pact to 0.20.3.

- The default relays no longer include relay.damus.io, which refuses connections. Pact now uses relay.islandbitcoin.com and nos.lol by default.`,
    es_ES: `Actualiza Pact a 0.20.3.

- Los relés predeterminados ya no incluyen relay.damus.io, que rechaza las conexiones. Pact usa ahora relay.islandbitcoin.com y nos.lol de forma predeterminada.`,
    de_DE: `Aktualisiert Pact auf 0.20.3.

- Die Standard-Relays enthalten relay.damus.io nicht mehr, da es Verbindungen ablehnt. Pact verwendet jetzt standardmäßig relay.islandbitcoin.com und nos.lol.`,
    pl_PL: `Aktualizuje Pact do wersji 0.20.3.

- Domyślne przekaźniki nie obejmują już relay.damus.io, który odrzuca połączenia. Pact domyślnie używa teraz relay.islandbitcoin.com i nos.lol.`,
    fr_FR: `Met à jour Pact vers 0.20.3.

- Les relais par défaut n'incluent plus relay.damus.io, qui refuse les connexions. Pact utilise désormais relay.islandbitcoin.com et nos.lol par défaut.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
