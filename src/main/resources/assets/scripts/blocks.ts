import "@digdir/designsystemet-web/clickdelegatefor";
import PopoverGallery from "@itemconsulting/popover-gallery";

if (typeof window !== "undefined" && "customElements" in window) {
  window.customElements.define("popover-gallery", PopoverGallery);
}
