# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **`PACT_PUBLIC_MODE: 'true'` is a security control, not a display preference.** StartOS publishes the `ui` interface with no login, so without it pactd renders its bearer token into the served page — handing the agent and its wallet authority to anyone who loads the address. Never turn it off.
- **`PACT_AUTO_TOKEN: 'true'` because there is no app seed here** for pactd to derive a token from; it generates and persists its own at `/data/.pact/token`.
- **`show-token` mounts the volume read-only**; only `rotate-token` mounts it writable. Keep that split.
- **Rotation restarts only a running daemon.** pactd resolves the token once at startup, so a stopped service picks the new one up on its next start — don't add an unconditional restart.
- **The identity key on the `main` volume is the agent.** There is no export or rotation path for it; treat the volume as key material in anything you write.
- **Default branch is `main`, not `master`.** Its CI workflows reference `main`; leave them.
