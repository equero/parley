# `<site-footer>`

A site footer with an optional name link, a copyright line and an optional tagline. It ships no text of its own: everything it shows comes from its attributes and slots. Native custom element — no framework, no build step.

## Example

```html
<site-footer
  name="Enrique Quero"
  href="https://equero.dev"
  year="2024-26"
  copyright="Copyright © {year} {name}. All rights reserved."
  reveal="hover"
  style="--link: #4f46e5;"
>
  <span slot="tagline">Made with <span style="color: crimson">❤️</span> from Spain.</span>
</site-footer>
```

The smallest footer is `<site-footer></site-footer>`, which renders only `© {current year}`.

## Attributes

| Attribute | Values | Default | Effect |
| --- | --- | --- | --- |
| `name` | string | — | Name shown above the copyright line and inside it. The name line is hidden when missing. |
| `href` | URL | — | Makes the name a link. Without it the name is plain text. |
| `year` | string | current year | Copyright year or range, e.g. `2024-26`. |
| `copyright` | string | `© {year} {name}` | Copyright template. `{year}` and `{name}` are replaced; extra spaces left by an empty name are removed. |
| `reveal` | `hover` | — | When `hover`, the tagline only shows while the footer is hovered, on devices that can hover. |

All attributes except `reveal` re-render the footer when they change. `reveal` is pure CSS, so it also reacts to changes.

## Slots

| Slot | Description |
| --- | --- |
| _(default)_ | Extra content after the tagline. |
| `tagline` | A short line under the copyright. The line is hidden while the slot is empty. |

Slotted content lives in your page, so style it with your own CSS.

## CSS Parts

| Part | Element |
| --- | --- |
| `footer` | The `<footer>` element. |
| `box` | The box that holds every line and highlights on hover. |
| `name` | The line with the name. |
| `copyright` | The copyright line. |
| `tagline` | The line that wraps the `tagline` slot. |

Example: `site-footer::part(copyright) { opacity: 0.7; }`

## CSS Custom Properties

| Property | Default | Description |
| --- | --- | --- |
| `--font` | `inherit` | Font family. |
| `--link` | `inherit` | Name link color. |
| `--link-hover` | `var(--link)` | Name link color on hover. |
| `--hover-background` | `rgba(243, 244, 246, 0.05)` | Box background on hover. |

## Notes

- Padding, alignment and font size are set on the host with low priority, so any rule on `site-footer` in your page (a class, Tailwind utilities) overrides them.
- Importing parley on the server (SSR, build steps) is safe: the element registers once the code runs in a browser.
