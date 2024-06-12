import DetailsAnimated from "./details-animated";

if (typeof window !== "undefined" && "customElements" in window) {
  window.customElements.define("details-animated", DetailsAnimated);
}
