import "./blocks-cards.css";
import id from "./blocks-cards.ftl";
import { controlRadioTheme } from "../../storybook-utils";
import type { Meta, StoryObj } from "@itemconsulting/xp-storybook-utils";

type CardsStory = {
  themeClass: string;
  imageClass: string;
};

export default {
  title: "Blocks/Cards",
  argTypes: {
    themeClass: controlRadioTheme,
    imageClass: {
      options: [
        "blocks-cards--image-left",
        "blocks-cards--image-right",
        "blocks-cards--image-top",
        "blocks-cards--image-bottom",
      ],
      control: {
        type: "inline-radio",
        labels: {
          "blocks-cards--image-left": "Left",
          "blocks-cards--image-right": "Right",
          "blocks-cards--image-top": "Top",
          "blocks-cards--image-bottom": "Bottom",
        },
      },
    },
  },
  parameters: {
    server: {
      id,
      params: {
        template: `
          [#assign classes="\${imageClass} \${themeClass}" /]
          [#include "${id}"]
        `,
      },
    },
  },
} satisfies Meta<CardsStory>;

export const inArticle: StoryObj = {
  args: {
    title: "Cards example",
    themeClass: "theme-accent",
    imageClass: "blocks-cards--image-left",
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
        imageSrc: "eggman-thumb.jpg",
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
        imageSrc: "capman-thumb.jpg",
      },
    ],
    link: {
      url: "#",
      text: "See all",
    },
  },
};
