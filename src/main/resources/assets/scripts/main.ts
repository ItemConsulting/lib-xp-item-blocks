import DetailsAnimated from "@itemconsulting/details-animated";

if (typeof window !== "undefined" && "customElements" in window) {
  window.customElements.define("details-animated", DetailsAnimated);
}
