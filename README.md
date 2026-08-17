<p align="center">
  <img src="icon.png" alt="Pact Logo" width="21%">
</p>

# Pact on StartOS

> Everything not listed in this document should behave the same as upstream
> Pact. If a feature, setting, or behavior is not mentioned here, the upstream
> documentation is accurate and fully applicable — see the Documentation
> section of `instructions.md` for links.

[Pact](https://github.com/bobodread876/pact) runs `pactd`, a daemon that holds an AI agent's identity key locally and forms mutually-consented, portable bonds between agents over Nostr — settling the verification market over Lightning through a wallet you connect and control. This package runs that daemon and, because StartOS publishes its interface without a login, keeps the daemon's access token out of the served page.

- **Upstream repo:** <https://github.com/bobodread876/pact>
- **Wrapper repo:** <https://github.com/Start9-Community/pact-startos>

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

One upstream image, consumed unmodified.

| Property      | Value                        |
| ------------- | ---------------------------- |
| Image         | `ghcr.io/bobodread876/pactd` |
| Architectures | x86_64, aarch64              |
| Command       | The daemon, run directly     |

| Subcontainer | Purpose                                  |
| ------------ | ---------------------------------------- |
| `pactd-sub`  | The only daemon — the one to `attach` to |

## Volume and Data Layout

One volume, holding the identity and everything derived from it.

| Volume | Mount Point | Purpose                               |
| ------ | ----------- | ------------------------------------- |
| `main` | `/data`     | The agent's key, its bonds, the token |

| Path                | Written by | Holds                                              |
| ------------------- | ---------- | -------------------------------------------------- |
| `.pact/token`       | pactd      | The bearer token for the UI and the API            |
| `.pact/` (the rest) | pactd      | The identity key, bonds, wallet connection, relays |

**The identity key never leaves this volume.** It is generated on the server and is what every bond is signed with — losing it loses the agent's identity, and copying it copies the agent.

## File Models

**None.** The package manages no configuration file: `pactd` owns its own state under the volume, and everything StartOS contributes is passed as environment at start.

Four environment values are set by the package, and two of them are the interesting ones:

- **Automatic token generation is enabled.** Upstream can derive its token from an application seed; there is no such seed here, so the daemon generates and persists its own on first start.
- **Public mode is enabled**, which is what stops the token from being embedded in the served page — see below.

## Dependencies

None.

**A Lightning wallet is connected, not depended on.** Pact talks to a wallet you already run through Nostr Wallet Connect, using a connection string you paste in — it never holds funds or wallet keys, and the wallet can be anywhere.

Bonds are published to Nostr relays, so the service needs internet unless every relay you choose is local.

## Network Access and Interfaces

One interface, serving two audiences.

| Interface | Id   | Type | Port | Description                     |
| --------- | ---- | ---- | ---- | ------------------------------- |
| Web UI    | `ui` | ui   | 8787 | The status UI and the agent API |

Bound on the `ui-multi` MultiHost over HTTP and not masked.

**This is the one StartOS-specific thing to understand about Pact.** The interface has no login of its own, and StartOS publishes it without adding one — so the daemon is run in **public mode**, which means it never renders its access token into the page. Instead:

- **The token is the credential**, for both the UI and any agent using the API.
- **You retrieve it from an action** inside the authenticated StartOS dashboard, and paste it into the interface's locked screen — or open the address with the token in the fragment to unlock in one step.
- **Anyone who has the token has the agent**, including the ability to form bonds and spend through the connected wallet.

Without public mode, publishing this interface would hand the token to anyone who loaded the page.

## Installation and First-Run Flow

Install does nothing beyond creating the volume. There is no task, no seeding, and no configuration.

**The first start generates the token**, which is why the reveal action has nothing to show until the service has run once — it says so rather than showing an empty value.

Opening the interface then presents a **locked** screen. Unlock it with the token, create the agent's identity, and optionally connect a wallet and choose relays. All of that is done in Pact's own interface.

## Actions

Two actions, both about the one credential.

### Show Access Token

Reveals the token the daemon generated.

- **What it changes:** nothing. It mounts the volume **read-only** in a temporary container and reads the file.
- **Runnable at any status**, including stopped.
- **If the service has never started**, it says so instead of showing a blank — the token does not exist until the daemon creates it.
- The result is masked and copyable, and the message explains both ways to use it: pasting it into the locked screen, or setting it for an agent.

### Rotate Access Token

Generates a new token and invalidates the old one.

- **What it changes:** the token file, rewritten with a freshly generated value in the daemon's own format and permissions.
- **Cost:** a running service restarts, because the daemon reads the token once at start. A stopped service needs no restart — the new token applies when it next starts.
- **Not reversible.** Every agent configured with the old token stops working until updated, and any open interface must be unlocked again.
- **Fails without showing a token** if the write does not succeed, rather than reporting a value that was never persisted.

## Tasks

None. This package raises no tasks, so the service is never held on a prompt and its ordinary controls are always available.

## Health Checks

One check, on the only daemon.

| Check     | Displayed as    | Method                 |
| --------- | --------------- | ---------------------- |
| `primary` | "Web Interface" | Port 8787 is listening |

It reports that the daemon is serving. **It says nothing about the rest**: whether an identity exists, whether relays are reachable, or whether the connected wallet is answering all show a green check and are visible in the interface.

## Backups and Restore

The `main` volume is copied wholesale — `sdk.Backups.ofVolumes('main')`. That is the identity key, the bonds, the wallet connection, the relay list, and the token.

**The backup is the agent.** Restoring it anywhere reproduces the same identity, with the same signing key and the same bearer token — so it is exactly as sensitive as the key itself, and two restored copies running at once are two things claiming to be the same agent.

The wallet connection is restored too, and it grants payment authority to whatever holds it — so a restore onto a machine you do not control hands over that authority as well.

## Limitations and Differences

1. **The token is the only credential**, for the interface and the API alike, and it is retrieved through an action rather than shown on the page.
2. **Public mode is forced on.** It cannot be turned off from here, and turning it off would leak the token to anyone loading the interface.
3. **The backup reproduces the agent's identity and its wallet authority.**
4. **No configuration surface in StartOS** — no file models, no settings actions. Identity, relays, and wallet are all set inside Pact.
5. **The identity key cannot be exported or rotated from here.** Only the access token can.
6. **The health check watches the port only**, not relays or the wallet connection.
7. **The wallet is non-custodial but delegated:** Pact holds no keys, and the connection string it holds can still spend.

---

## Quick Reference for AI Consumers

```yaml
package_id: pactd # note: the repo is pact-startos
image: ghcr.io/bobodread876/pactd
architectures:
  - x86_64
  - aarch64
subcontainers:
  - pactd-sub
volumes:
  main: /data # PACT_HOME is /data/.pact — identity key, bonds, wallet connection, token
file_models: [] # pactd owns its own state; StartOS contributes only env
startos_managed_env_vars:
  - PACT_HOST
  - PACT_PORT
  - PACT_HOME
  - PACT_AUTO_TOKEN # true — no app seed here, so pactd generates and persists its own
  - PACT_PUBLIC_MODE # true — keeps the token out of the served page
dependencies: [] # a Lightning wallet is connected via NWC, not depended on
interfaces:
  ui: { type: ui, port: 8787 } # status UI + agent API; the bearer token is the only gate
actions:
  - show-token # read-only mount, temp subcontainer
  - rotate-token # rewrites the token, restarts only if running
tasks: []
health_checks:
  - primary # displayed "Web Interface"; port only
```
