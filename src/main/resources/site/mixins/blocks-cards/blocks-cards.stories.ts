import "./blocks-cards.css";
import id from "./blocks-cards.ftl";
import { controlRadioTheme } from "../../storybook-utils";
import type { BlocksCard } from "./blocks-cards.freemarker";
import type { Meta, StoryObj } from "@itemconsulting/xp-storybook-utils";

export default {
  title: "Blocks/Cards",
  argTypes: {
    classes: controlRadioTheme,
  },
  parameters: {
    server: { id },
  },
} satisfies Meta<BlocksCard>;

export const cards: StoryObj<BlocksCard> = {
  args: {
    title: "Cards example",
    classes: "theme-accent",
    cards: [
      {
        kicker: "Blogpost",
        title: "Overskrift 1",
        text: `
          <p>Dette er noe riktekst</p>
          <ul>
            <li>test</li>
            <li>test2</li>
          </ul>`,
        url: "#",
        imageSrc: "tomaj.jpeg",
      },
      {
        kicker: "Calendar",
        title: "Overskrift 2",
        text: `
          <p>Dette er noe riktekst</p>
          <ul>
           <li>test</li>
           <li>test2</li>
          </ul>`,
        url: "#",
      },
    ],
    link: {
      url: "#",
      text: "See all",
    },
  },
};
