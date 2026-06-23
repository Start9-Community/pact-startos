import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.18.0:0',
  releaseNotes: {
    en_US:
      'pactd 0.18.0 — security hardening. The paid-verification market is now sound: each invoice is bound to one bond and single-use, so a payment cannot be replayed or reused. Constant-time token comparison on the API.',
    es_ES:
      'pactd 0.18.0 — refuerzo de seguridad. El mercado de verificación de pago ahora es sólido: cada factura está vinculada a un solo vínculo y es de un solo uso, por lo que un pago no puede reproducirse ni reutilizarse. Comparación de tokens en tiempo constante en la API.',
    de_DE:
      'pactd 0.18.0 — Sicherheitshärtung. Der kostenpflichtige Verifizierungsmarkt ist jetzt solide: Jede Rechnung ist an eine einzige Bindung gebunden und nur einmal verwendbar, sodass eine Zahlung nicht wiederholt oder wiederverwendet werden kann. Token-Vergleich in konstanter Zeit über die API.',
    pl_PL:
      'pactd 0.18.0 — wzmocnienie bezpieczeństwa. Rynek płatnej weryfikacji jest teraz solidny: każda faktura jest powiązana z jedną więzią i jednorazowa, więc płatności nie można powtórzyć ani użyć ponownie. Porównywanie tokenów w stałym czasie w API.',
    fr_FR:
      'pactd 0.18.0 — renforcement de la sécurité. Le marché de vérification payante est désormais sain : chaque facture est liée à un seul lien et à usage unique, de sorte qu’un paiement ne peut être rejoué ni réutilisé. Comparaison des jetons en temps constant sur l’API.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
