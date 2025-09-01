import id from "./blocks-text.ftlh";
import type { Meta, StoryObj } from "@itemconsulting/xp-storybook-utils";

const meta: Meta = {
  title: "Blocks/Text",

  parameters: {
    server: { id },
  },
};

export default meta;

export const text: StoryObj = {
  args: {
    title: "This is the title",
    text: `
      <p>Ipsum Lorem</p>
      <ol>
        <li>First</li>
        <li>Second</li>
        <li>Third</li>
      </ol>
     `,
  },
};
