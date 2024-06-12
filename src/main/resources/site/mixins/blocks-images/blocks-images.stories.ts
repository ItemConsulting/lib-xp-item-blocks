import id from "./blocks-images.ftl";
import "./blocks-images.css";
import { renderOnServer, type StoryObj, type Meta } from "@itemconsulting/xp-storybook-utils";
import type { Images } from "./blocks-images.freemarker";

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
    locale: "no",
    images: [
      {
        src: "cabin.png",
        altText: "",
        fullSizeSrc: "",
        sizes: "",
        srcset: "",
      },
    ],
  },
};
