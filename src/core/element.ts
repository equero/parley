/**
 * Base class for every parley component.
 *
 * Outside the browser (SSR, build steps, tests without a DOM) there is no
 * `HTMLElement`, so a plain class stands in. Importing parley on the server
 * no longer throws; the components simply register once the code runs in a
 * browser.
 */
export const BaseElement = (globalThis.HTMLElement ?? class {}) as typeof HTMLElement;

/**
 * Registers a custom element once. Safe to call on the server and when two
 * copies of parley end up on the same page.
 */
export function define(tag: string, element: CustomElementConstructor): void {
  if (typeof customElements === "undefined" || customElements.get(tag)) return;
  customElements.define(tag, element);
}
