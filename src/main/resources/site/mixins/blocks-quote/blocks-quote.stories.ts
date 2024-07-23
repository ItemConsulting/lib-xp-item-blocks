import id from "./blocks-quote.ftl";
import "./blocks-quote.css";
import "./blocks-quote.stories.css";
import { type StoryObj, type Meta } from "@itemconsulting/xp-storybook-utils";
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
    text: "Storybook works really well with XP...",
    author: "Tom Arild Jakobsen",
    publicationTitle: "Aftenposten 12.04.24",
    publicationUrl: "https://www.aftenposten.no/",
    image: {
      src: "tomaj.jpeg",
      width: 200,
      height: 200,
    },
  },
};
