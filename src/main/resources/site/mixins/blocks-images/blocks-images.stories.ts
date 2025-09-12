import id from "./blocks-images.ftlh";
import "../../../assets/styles/blocks/blocks-images.css";
import PopoverGallery from "@itemconsulting/popover-gallery";
import type { Meta, StoryObj } from "@itemconsulting/xp-storybook-utils";
import type { Images } from "./blocks-images.freemarker";

if (!window.customElements.get("popover-gallery")) {
  window.customElements.define("popover-gallery", PopoverGallery);
}

const meta: Meta<Images> = {
  title: "Blocks/Images",

  parameters: {
    layout: "centered",
    server: { id },
  },
};

export default meta;

export const images: StoryObj<Images> = {
  args: {
    id: "block-id",
    images: [
      {
        src: "eggman-thumb.jpg",
        altText: "I am the eggman!",
        fullSizeSrc: "eggman.jpg",
        caption: "Eggman",
        width: 400,
        height: 240
      },
      {
        src: "legoman-thumb.jpg",
        altText: "We are the eggmen!",
        fullSizeSrc: "legoman.jpg",
        caption: "Legoman",
        width: 400,
        height: 240
      },
      {
        src: "capman-thumb.jpg",
        altText: "I am the walrus!",
        fullSizeSrc: "capman.jpg",
        width: 400,
        height: 240
      },
      {
        src: "wall-thumb.jpg",
        altText: "I am the wall!",
        fullSizeSrc: "wall.jpg",
        width: 400,
        height: 240
      },
    ],
  },
};
