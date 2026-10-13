import { BaseElement, define } from "#core/element";

const DEFAULT_COPYRIGHT = "© {year} {name}";

const template = `
  <style>
    :host {
      display: block;
      padding: 5rem 0 1rem;
      text-align: center;
      font-family: var(--font, inherit);
      font-size: 0.75rem;
      font-weight: 600;
    }
    [hidden] { display: none !important; }
    footer {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .box {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      transition: background 0.3s, border-radius 0.3s;
    }
    .box:hover {
      border-radius: 0.5rem;
      background: var(--hover-background, rgba(243, 244, 246, 0.05));
    }
    p { margin: 0; }
    a {
      color: var(--link, inherit);
      text-decoration: none;
      text-underline-offset: 2px;
    }
    a:hover { color: var(--link-hover, var(--link, inherit)); }

    .tagline { transition: opacity 0.3s; }
    @media (hover: hover) {
      :host([reveal="hover"]) .tagline { opacity: 0; }
      :host([reveal="hover"]) .box:hover .tagline { opacity: 1; }
    }
  </style>

  <footer part="footer">
    <div class="box" part="box">
      <p part="name" hidden></p>
      <p part="copyright"></p>
      <p class="tagline" part="tagline" hidden><slot name="tagline"></slot></p>
      <slot></slot>
    </div>
  </footer>
`;

/**
 * A site footer with an optional name link, a copyright line and an optional
 * tagline. It ships no text of its own: everything it shows comes from its
 * attributes and slots.
 *
 * @element site-footer
 *
 * @attr {string} name - Name shown above the copyright line and inside it. Hidden when missing.
 * @attr {string} href - Makes the name a link to this URL. Without it the name is plain text.
 * @attr {string} year - Copyright year or range. Defaults to the current year.
 * @attr {string} copyright - Copyright template with `{year}` and `{name}` placeholders. Defaults to `© {year} {name}`.
 * @attr {"hover"} reveal - When `hover`, the tagline only shows while the footer is hovered (on devices that can hover).
 *
 * @slot - Extra content after the tagline.
 * @slot tagline - A short line under the copyright. Hidden when empty.
 *
 * @csspart footer - The `<footer>` element.
 * @csspart box - The box that holds every line and highlights on hover.
 * @csspart name - The line with the name.
 * @csspart copyright - The copyright line.
 * @csspart tagline - The line that wraps the `tagline` slot.
 *
 * @cssprop [--font=inherit] - Font family.
 * @cssprop [--link=inherit] - Name link color.
 * @cssprop [--link-hover=var(--link)] - Name link color on hover.
 * @cssprop [--hover-background=rgba(243, 244, 246, 0.05)] - Box background on hover.
 */
export class SiteFooter extends BaseElement {
  static observedAttributes = ["name", "href", "year", "copyright"];

  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = template;

    const tagline = root.querySelector<HTMLSlotElement>('slot[name="tagline"]')!;
    tagline.addEventListener("slotchange", () => {
      tagline.parentElement!.hidden = tagline.assignedNodes({ flatten: true }).length === 0;
    });
  }

  connectedCallback(): void {
    this.render();
  }

  attributeChangedCallback(): void {
    this.render();
  }

  private render(): void {
    const root = this.shadowRoot!;
    const name = this.getAttribute("name")?.trim() ?? "";
    const href = this.getAttribute("href");
    const year = this.getAttribute("year") ?? `${new Date().getFullYear()}`;
    const copyright = this.getAttribute("copyright") ?? DEFAULT_COPYRIGHT;

    const nameLine = root.querySelector<HTMLElement>('[part="name"]')!;
    nameLine.hidden = !name;
    if (href) {
      const link = document.createElement("a");
      link.href = href;
      link.textContent = name;
      nameLine.replaceChildren(link);
    } else {
      nameLine.textContent = name;
    }

    root.querySelector('[part="copyright"]')!.textContent = copyright
      .replaceAll("{year}", year)
      .replaceAll("{name}", name)
      .replace(/\s+/g, " ")
      .trim();
  }
}

define("site-footer", SiteFooter);

declare global {
  interface HTMLElementTagNameMap {
    "site-footer": SiteFooter;
  }
}
