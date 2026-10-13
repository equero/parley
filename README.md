# parley

A small crew of native Web Components I kept rewriting across my own projects, so I packaged them up. No framework, no runtime, no build step on your side — just custom elements that work wherever HTML does.

## Install

```bash
npm install @equerodev/parley
```

## Usage

```js
import "@equerodev/parley";
```

Then drop the tags in your markup. Right now there's one: `<site-footer>`.

## Writing components

- Ship no text of your own: names, links and sentences come from attributes and slots, so every site can use its own content and language.
- Extend `BaseElement` and register with `define()` from `#core/element`, so importing parley on the server never throws.
- Expose styling hooks: CSS custom properties for colors and fonts, and `part` names for anything else.
- Import with `#` aliases (`#core/element`), never relative paths.
- Document every component in `docs/`, starting from [`docs/_template.md`](./docs/_template.md), and list it in `llms.txt`.

## Releases

Work happens on `develop`; `main` holds releases. Releases are done with [synkro](https://github.com/equero/synkro), then published to npm:

```bash
synkro status                  # what the next release would contain
synkro sync --patch --dry-run  # show what would happen, change nothing
synkro sync --patch            # merge develop into main, bump patch, tag, push
npm publish                    # build and publish the new version
```

Each release is a single merge commit on `main` that also carries the new version, tagged `vX.Y.Z` with a changelog. `develop` is fast-forwarded to it afterwards.

## License

GPL-3.0-only. See [LICENSE](./LICENSE).
