import id from "./blocks-quote.ftlh";
import "../../../assets/styles/blocks/blocks-quote.css";
import "./blocks-quote.stories.css";
import type { Meta, StoryObj } from "@itemconsulting/xp-storybook-utils";
import type { BlocksQuote } from "./blocks-quote.freemarker";

export default {
  title: "Blocks/Quote",
  parameters: {
    server: { id },
    layout: "centered",
  },
} satisfies Meta<BlocksQuote>;

export const quote: StoryObj<BlocksQuote> = {
  args: {
    locale: "no_NB",
    text: "Storybook works really well with XP...",
    author: "Tom Arild Jakobsen",
    image: {
      src: "tomaj.jpeg",
      width: 200,
      height: 200,
    },
  },
};
