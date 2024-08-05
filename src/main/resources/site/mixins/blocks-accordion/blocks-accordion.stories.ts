import id from "./blocks-accordion.ftl";
import "../../../assets/styles/blocks/blocks-accordion.css";
import { controlRadioTheme } from "../../storybook-utils";
import DetailsAnimated from "@itemconsulting/details-animated";
import type { BlocksAccordion } from "./blocks-accordion.freemarker";
import type { Meta, StoryObj } from "@itemconsulting/xp-storybook-utils";

if (!window.customElements.get("details-animated")) {
  window.customElements.define("details-animated", DetailsAnimated);
}

export default {
  title: "Blocks/Accordion",
  argTypes: {
    classes: controlRadioTheme,
  },
  parameters: {
    server: {
      id,
    },
  },
} satisfies Meta<BlocksAccordion>;

export const accordion: StoryObj<BlocksAccordion> = {
  args: {
    classes: "theme-neutral",
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
