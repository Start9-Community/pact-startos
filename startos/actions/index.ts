import { sdk } from '../sdk'
import { i18n } from '../i18n'

// Surface the node's Pact bearer token to the operator inside the authed StartOS
// dashboard — so it never has to appear on the (login-less, possibly public)
// service web page. pactd persists the token at /data/.pact/token; we read it by
// mounting the data volume read-only into a throwaway subcontainer and cat-ing it.
const showToken = sdk.Action.withoutInput(
  'show-token',
  async ({ effects }) => ({
    name: i18n('Show access token'),
    description: i18n(
      "Reveal this node's Pact API token. Paste it into the Pact web UI to unlock it, or set it as PACT_TOKEN for your agent.",
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),
  async ({ effects }) => {
    const token = await sdk.SubContainer.withTemp(
      effects,
      { imageId: 'pactd' },
      sdk.Mounts.of().mountVolume({
        volumeId: 'main',
        subpath: null,
        mountpoint: '/data',
        readonly: true,
      }),
      'show-token',
      async (sub) => {
        const res = await sub.exec(['cat', '/data/.pact/token'])
        return (
          typeof res.stdout === 'string'
            ? res.stdout
            : res.stdout.toString('utf8')
        ).trim()
      },
    ).catch(() => '')

    return {
      version: '1' as const,
      title: i18n('Pact access token'),
      message: token
        ? i18n(
            'Paste this into the Pact web UI to unlock it, or set it as PACT_TOKEN for your agent. Tip: opening the UI at <your-node-url>/#token=<this-value> unlocks it automatically. Keep it secret.',
          )
        : i18n(
            'No token yet — start the service once so it generates its token (at /data/.pact/token), then run this action again.',
          ),
      result: {
        type: 'single' as const,
        value: token || i18n('(not generated yet — start the service first)'),
        copyable: true,
        qr: false,
        masked: true,
      },
    }
  },
)

// Rotate the bearer token: generate a fresh one in pactd's own format
// (randomBytes(24) base64url, mode 0600) and write it into the data volume.
// Writing the file is state-independent, so this is allowed in any status; the
// restart below is only how a *running* daemon reloads it (pactd reads the token
// once at startup, `const TOKEN = resolveToken()`). A stopped daemon needs no
// restart — it reads the new token on its next start. `execFail` aborts the
// action (no new token shown) if the write fails.
const rotateToken = sdk.Action.withoutInput(
  'rotate-token',
  async ({ effects }) => ({
    name: i18n('Rotate access token'),
    description: i18n(
      'Generate a new Pact API token and load it — the service restarts if running, otherwise the new token applies on next start.',
    ),
    warning: i18n(
      'This immediately invalidates the current token. Every agent configured with PACT_TOKEN must be updated, any open web UI must be unlocked again, and a running service will restart.',
    ),
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),
  async ({ effects }) => {
    const token = await sdk.SubContainer.withTemp(
      effects,
      { imageId: 'pactd' },
      sdk.Mounts.of().mountVolume({
        volumeId: 'main',
        subpath: null,
        mountpoint: '/data',
        readonly: false,
      }),
      'rotate-token',
      async (sub) => {
        const res = await sub.execFail([
          'node',
          '-e',
          'const c=require("crypto"),f=require("fs");const t=c.randomBytes(24).toString("base64url");f.mkdirSync("/data/.pact",{recursive:true});f.writeFileSync("/data/.pact/token",t,{mode:0o600});process.stdout.write(t)',
        ])
        return (
          typeof res.stdout === 'string'
            ? res.stdout
            : res.stdout.toString('utf8')
        ).trim()
      },
    )
    // Only a running daemon holds the old token in memory; restart it to reload.
    // If stopped, the new token is already persisted and loads on next start.
    const status = await effects.getStatus({})
    if (status?.started) await effects.restart()

    return {
      version: '1' as const,
      title: i18n('New Pact access token'),
      message: i18n(
        'This is your new token — the old one no longer works. Paste it into the web UI to unlock it, or set it as PACT_TOKEN for your agent. Keep it secret.',
      ),
      result: {
        type: 'single' as const,
        value: token,
        copyable: true,
        qr: false,
        masked: true,
      },
    }
  },
)

export const actions = sdk.Actions.of()
  .addAction(showToken)
  .addAction(rotateToken)
