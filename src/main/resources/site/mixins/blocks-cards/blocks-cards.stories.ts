import "./blocks-cards.css";
import "../blocks-card/blocks-card.css";
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
        "blocks-card--image-left",
        "blocks-card--image-right",
        "blocks-card--image-top",
        "blocks-card--image-bottom",
      ],
      control: {
        type: "inline-radio",
        labels: {
          "blocks-card--image-left": "Left",
          "blocks-card--image-right": "Right",
          "blocks-card--image-top": "Top",
          "blocks-card--image-bottom": "Bottom",
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
    imageClass: "blocks-card--image-left",
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
