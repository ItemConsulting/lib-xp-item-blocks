import DetailsAnimated from "@itemconsulting/details-animated";
import PopoverGallery from "@itemconsulting/popover-gallery";

if (typeof window !== "undefined" && "customElements" in window) {
  window.customElements.define("details-animated", DetailsAnimated);
}

if (typeof window !== "undefined" && "customElements" in window) {
  window.customElements.define("popover-gallery", PopoverGallery);
}
