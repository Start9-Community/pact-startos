# Updating the upstream version

This package wraps [`pactd`](https://github.com/bobodread876/pact) — the Pact daemon — which upstream builds and publishes as the multi-arch image `ghcr.io/bobodread876/pactd` (x86_64 + aarch64). "Upstream" here means that source repo and its published image; there's no source build in this package.

## Determining the upstream version

The published **image tag** is authoritative — pinning a tag is the only thing this package consumes.

- Browse the tags at the [`pactd` container package](https://github.com/bobodread876/pact/pkgs/container/pactd), or
- read the human-readable notes from the GitHub releases (these can lag the image):

  ```sh
  gh release view -R bobodread876/pact --json tagName,body -q .tagName
  ```

The current pin lives in `startos/manifest/index.ts` at `images['pactd'].source.dockerTag` (the version after the `:` in `ghcr.io/bobodread876/pactd:<version>`).

## Applying the bump

This package's version string tracks the upstream `pactd` version, so two files move together:

1. Bump `dockerTag` in `startos/manifest/index.ts` to `ghcr.io/bobodread876/pactd:<new version>`.
2. Edit `startos/versions/current.ts`:
   - Set `version` to `'<new version>:0'` (the `:0` revision resets for a new upstream version; only bump the revision — `:1`, `:2`, … — when re-releasing the **same** `pactd` version with packaging-only changes).
   - Update `releaseNotes.en_US` to describe what changed in this `pactd` release.

A new file under `startos/versions/` is only needed if the bump carries a data migration; a plain version bump just edits `current.ts` in place.
