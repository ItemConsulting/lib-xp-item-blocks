import "../../../assets/styles/blocks/blocks-cards.css";
import "../../../assets/styles/blocks/blocks-card.css";
import id from "./blocks-cards.ftlh";
import cardId from "../blocks-card/blocks-card.ftlh";
import { controlRadioTheme } from "../../storybook-utils";
import { renderOnServer, type Meta, type StoryObj } from "@itemconsulting/xp-storybook-utils";

type CardsStory = {
  locale: string;
  themeClass: string;
  imageClass: string;
  columnsClass: string;
  count: number;
};

export default {
  title: "Blocks/Cards",
  argTypes: {
    count: {
      control: {
        type: "number",
        min: 1,
        max: 5,
      },
    },
    columnsClass: {
      options: ["blocks-card--cols-1", "blocks-card--cols-2", "blocks-card--cols-3"],
      control: {
        type: "inline-radio",
        labels: {
          "blocks-card--cols-1": "1",
          "blocks-card--cols-2": "2",
          "blocks-card--cols-3": "3",
        },
      },
    },
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
  parameters: renderOnServer({
    id,
    template: `
      [#assign classes="\${imageClass} \${themeClass} \${columnsClass}" /]
      [#assign card]
        [#include "${cardId}"]
      [/#assign]
      [#assign cardsMarkup=[card, card, card, card, card]?chunk(count)[0]?join("") /]

      <div class="blocks-card-story--extra-large">
        [#assign title="Cards example"]
        [#include "${id}"]
      </div>
    `,
    javaTypes: {
      count: "number",
    },
  }),
} satisfies Meta<CardsStory>;

export const Cards: StoryObj = {
  args: {
    locale: "no_NB",
    themeClass: "theme-accent",
    imageClass: "blocks-card--image-left",
    count: 5,
    columnsClass: "blocks-card--cols-3",
    kicker: "Blogpost",
    title: "Overskrift 1",
    text: `
          <p>Dette er noe riktekst</p>
          <ul>
            <li>test</li>
            <li>test2</li>
          </ul>`,
    url: "#",
    image: {
      src: "eggman-thumb.jpg",
    },
    link: {
      url: "#",
      text: "See all",
    },
  },
};
