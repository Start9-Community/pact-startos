# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

**Start every task at the recipe index** — `../start-technologies/projects/start-sdk/docs/src/recipes.md`
(or <https://docs.start9.com/packaging/recipes.html>). It maps an intent ("prompt the user to create
admin credentials", "expose a web UI") to the constructs, the reference pages, and a named production
package to copy. Find the recipe before you read this package's neighbours: a package you reach by
grepping may be non-conformant, and the recipe outranks it.

Freshly scaffolded? Work the
[New Package Checklist](../start-technologies/projects/start-sdk/docs/src/new-package-checklist.md)
(or <https://docs.start9.com/packaging/new-package-checklist.html>) from top to bottom. It is a
guide page, not a file in this repo — read it, don't copy it in.

Keep `README.md` (technical reference for an AI support or administering agent) and
`instructions.md` (end-user docs) in sync with your changes.

**Bugs and feature requests are GitHub issues on this repo** — file them as you find them.
Don't record work in the repo instead: no `TODO.md`, no `NOTES.md`, no `PLAN.md`. What you
verified, tried, and decided belongs in the commit message and the PR body.

## This repo

- **`PACT_PUBLIC_MODE: 'true'` is a security control, not a display preference.** StartOS publishes the `ui` interface with no login, so without it pactd renders its bearer token into the served page — handing the agent and its wallet authority to anyone who loads the address. Never turn it off.
- **`PACT_AUTO_TOKEN: 'true'` because there is no app seed here** for pactd to derive a token from; it generates and persists its own at `/data/.pact/token`.
- **`show-token` mounts the volume read-only**; only `rotate-token` mounts it writable. Keep that split.
- **Rotation restarts only a running daemon.** pactd resolves the token once at startup, so a stopped service picks the new one up on its next start — don't add an unconditional restart.
- **The identity key on the `main` volume is the agent.** There is no export or rotation path for it; treat the volume as key material in anything you write.
- **Default branch is `main`, not `master`.** Its CI workflows reference `main`; leave them.
