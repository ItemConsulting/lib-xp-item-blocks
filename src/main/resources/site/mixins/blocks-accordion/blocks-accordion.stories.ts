import "../../../assets/styles/blocks/blocks-accordion.css";
import type { Meta, StoryObj } from "@itemconsulting/xp-storybook-utils";
import { controlRadioTheme } from "../../storybook-utils";
import type { BlocksAccordion } from "./blocks-accordion.freemarker";
import id from "./blocks-accordion.ftlh";

export default {
  title: "Blocks/Accordion",
  argTypes: {
    color: controlRadioTheme,
  },
  parameters: {
    server: {
      id,
    },
  },
} satisfies Meta<BlocksAccordion>;

export const accordion: StoryObj<BlocksAccordion> = {
  args: {
    color: "neutral",
    locale: "no_NB",
    title: "Trekkspill",
    items: [
      {
        title: "Overskrift 1",
        text: `
          <p>Dette er noe riktekst</p>
          <ul>
            <li>test</li>
            <li>test2</li>
          </ul>`,
      },
      {
        title: "Overskrift 2",
        text: `
          <p>Dette er noe riktekst</p>
          <ul>
           <li>test</li>
           <li>test2</li>
          </ul>`,
      },
    ],
  },
};
