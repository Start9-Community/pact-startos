import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.18.0:4',
  releaseNotes: {
    en_US: `- Show access token's unlock tip spells out the address to open.`,
    es_ES: `- El consejo de desbloqueo de Mostrar token de acceso indica la dirección completa que hay que abrir.`,
    de_DE: `- Der Entsperr-Tipp von „Zugriffstoken anzeigen“ nennt die vollständige Adresse, die zu öffnen ist.`,
    pl_PL: `- Wskazówka odblokowania w akcji Pokaż token dostępu podaje pełny adres do otwarcia.`,
    fr_FR: `- L’astuce de déverrouillage d’Afficher le jeton d’accès indique l’adresse complète à ouvrir.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
