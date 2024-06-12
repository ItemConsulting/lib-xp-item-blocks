export default class DetailsAnimated extends HTMLElement {
  declare detailsEl: HTMLDetailsElement | null;
  declare summaryEl: HTMLElement | null;
  declare accordionBody: HTMLElement | null;
  declare accordionTransformEl: HTMLElement | null;
  declare bodyEls: NodeList;

  connectedCallback() {
    this.detailsEl = this.querySelector(":scope > details");
    this.summaryEl = this.detailsEl?.querySelector(":scope > summary") ?? null;
    this.bodyEls = this.detailsEl?.querySelectorAll(":scope > :not(summary)") ?? new NodeList();

    this.accordionTransformEl = document.createElement("div");
    this.accordionTransformEl.classList.add("accordion-transform");
    this.bodyEls.forEach((bodyEl) => this.accordionTransformEl?.appendChild(bodyEl));

    const animationBoxEl = document.createElement("div");
    animationBoxEl.classList.add("accordion-animation");
    animationBoxEl.appendChild(this.accordionTransformEl);

    this.accordionBody = document.createElement("div");
    this.accordionBody.classList.add("accordion-body");
    this.accordionBody.appendChild(animationBoxEl);

    this.detailsEl?.appendChild(this.accordionBody);

    if (this.detailsEl && this.summaryEl) {
      this.summaryEl.addEventListener("click", this.handleSummaryClick.bind(this));
    }
  }

  handleSummaryClick(event: Event) {
    if (this.detailsEl && this.summaryEl && this.bodyEls.length > 0) {
      event.preventDefault();

      if (this.isOpen()) {
        this.detailsEl?.addEventListener(
          "transitionend",
          () => {
            this.detailsEl?.removeAttribute("open");
          },
          {
            once: true,
          },
        );

        this.detailsEl.removeAttribute("data-animate-open");
      } else {
        this.detailsEl?.addEventListener(
          "toggle",
          () => {
            this.detailsEl?.setAttribute("data-animate-open", "");
          },
          {
            once: true,
          },
        );

        this.detailsEl.setAttribute("open", "");
      }
    }
  }

  isOpen(): boolean {
    return this.detailsEl?.hasAttribute("open") ?? true;
  }
}
