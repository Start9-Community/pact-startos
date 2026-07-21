# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (architecture, for developers and LLMs) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Package id is `pactd`.** Single daemon wrapping the `pactd` sidecar; one `ui` interface (status UI + agent API) bound over `MultiHost` (host id `ui-multi`). No dependencies. The bearer token pactd persists at `/data/.pact/token` is surfaced through the `show-token` / `rotate-token` actions, which read/write it via a throwaway `SubContainer.withTemp` on the `main` volume.

## Inspecting a running install

To run a command inside the service's container (read its generated config, grep app logs), use `start-cli package attach pactd -n pactd-sub -- <cmd>`. Select the subcontainer by **name** with `-n` (the name passed to `SubContainer.of` in `main.ts` — here `pactd-sub`) or by image with `-i`. Note: `-s/--subcontainer` matches the internal **Guid**, not the name, so passing a name to `-s` fails with "no matching subcontainers".
