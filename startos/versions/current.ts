import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.20.2:0',
  releaseNotes: {
    en_US: `Updated Pact to 0.20.2.

- Accepting a bond adopts the proposal's kind, and a withdrawn, rejected or revoked proposal can no longer be accepted.
- The node tells you when it is not yet findable on the open board, and how to opt in.
- Disconnecting a wallet now persists across restarts.
- Security: cross-site requests to the daemon are refused, and verifying a bond needs the access token unless paid verification is on.
- Includes the October 2026 Node.js security fixes.`,
    es_ES: `Actualiza Pact a 0.20.2.

- Aceptar un vínculo adopta el tipo de la propuesta, y ya no se puede aceptar una propuesta retirada, rechazada o revocada.
- El nodo indica cuándo aún no se le puede encontrar en el tablón abierto y cómo activarlo.
- Desconectar una cartera ahora se mantiene tras los reinicios.
- Seguridad: se rechazan las solicitudes entre sitios al demonio, y verificar un vínculo requiere el token de acceso salvo que la verificación de pago esté activada.
- Incluye las correcciones de seguridad de Node.js de octubre de 2026.`,
    de_DE: `Aktualisiert Pact auf 0.20.2.

- Das Annehmen einer Bindung übernimmt die Art des Vorschlags, und ein zurückgezogener, abgelehnter oder widerrufener Vorschlag kann nicht mehr angenommen werden.
- Der Knoten zeigt an, wenn er auf dem offenen Board noch nicht auffindbar ist, und wie Sie das aktivieren.
- Das Trennen einer Wallet bleibt nach Neustarts bestehen.
- Sicherheit: Seitenübergreifende Anfragen an den Daemon werden abgelehnt, und das Prüfen einer Bindung erfordert das Zugriffstoken, sofern die bezahlte Prüfung nicht aktiviert ist.
- Enthält die Node.js-Sicherheitskorrekturen vom Oktober 2026.`,
    pl_PL: `Aktualizuje Pact do wersji 0.20.2.

- Akceptacja więzi przejmuje rodzaj propozycji, a wycofanej, odrzuconej lub unieważnionej propozycji nie można już zaakceptować.
- Węzeł informuje, kiedy nie jest jeszcze widoczny na otwartej tablicy i jak to włączyć.
- Odłączenie portfela jest teraz zachowywane po ponownym uruchomieniu.
- Bezpieczeństwo: żądania międzywitrynowe do demona są odrzucane, a weryfikacja więzi wymaga tokenu dostępu, chyba że włączona jest płatna weryfikacja.
- Zawiera poprawki bezpieczeństwa Node.js z października 2026.`,
    fr_FR: `Met à jour Pact vers 0.20.2.

- Accepter un lien reprend le type de la proposition, et une proposition retirée, rejetée ou révoquée ne peut plus être acceptée.
- Le nœud indique quand il n'est pas encore visible sur le tableau ouvert, et comment l'activer.
- La déconnexion d'un portefeuille est désormais conservée après un redémarrage.
- Sécurité : les requêtes intersites vers le démon sont refusées, et la vérification d'un lien exige le jeton d'accès sauf si la vérification payante est activée.
- Inclut les correctifs de sécurité Node.js d'octobre 2026.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
