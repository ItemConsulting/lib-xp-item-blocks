import id from "./blocks-images.ftl";
import "../../../assets/styles/blocks/blocks-images.css";
import PopoverGallery from "@itemconsulting/popover-gallery";
import { renderOnServer, type StoryObj, type Meta } from "@itemconsulting/xp-storybook-utils";
import type { Images } from "./blocks-images.freemarker";

if (!window.customElements.get("popover-gallery")) {
  window.customElements.define("popover-gallery", PopoverGallery);
}

const meta: Meta<Images> = {
  title: "Blocks/Images",

  parameters: renderOnServer({
    id,
    layout: "centered",
  }),
};

export default meta;

export const images: StoryObj<Images> = {
  args: {
    id: "block-id",
    locale: "no",
    images: [
      {
        src: "eggman-thumb.jpg",
        altText: "I am the eggman!",
        fullSizeSrc: "eggman.jpg",
        sizes: "",
        srcset: "",
        caption: "Eggman",
      },
      {
        src: "legoman-thumb.jpg",
        altText: "We are the eggmen!",
        fullSizeSrc: "legoman.jpg",
        sizes: "",
        srcset: "",
        caption: "Legoman",
      },
      {
        src: "capman-thumb.jpg",
        altText: "I am the walrus!",
        fullSizeSrc: "capman.jpg",
        sizes: "",
        srcset: "",
      },
      {
        src: "wall-thumb.jpg",
        altText: "I am the wall!",
        fullSizeSrc: "wall.jpg",
        sizes: "",
        srcset: "",
      },
    ],
  },
};
