import "../../../assets/styles/blocks/blocks-cards.css";
import "../../../assets/styles/blocks/blocks-card.css";
import { type Meta, renderOnServer, type StoryObj } from "@itemconsulting/xp-storybook-utils";
import { controlRadioTheme } from "../../storybook-utils";
import cardId from "../blocks-card/blocks-card.ftlh";
import id from "./blocks-cards.ftlh";

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
      [#assign classes="\${imageClass} \${columnsClass}" /]
      [#assign theme="\${themeClass}" /]
      [#assign color="\${themeClass}" /]
      [#assign id="card1" /]
      [#assign card1][#include "${cardId}"][/#assign]
      [#assign id="card2" /]
      [#assign card2][#include "${cardId}"][/#assign]
      [#assign id="card3" /]
      [#assign card3][#include "${cardId}"][/#assign]
      [#assign id="card4" /]
      [#assign card4][#include "${cardId}"][/#assign]
      [#assign id="card5" /]
      [#assign card5][#include "${cardId}"][/#assign]
      [#assign cardsMarkup=[card1, card2, card3, card4, card5]?chunk(count)[0]?join("") /]

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
    themeClass: "accent",
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
    url: "https://item.no",
    image: {
      src: "eggman-thumb.jpg",
    },
    link: {
      url: "#",
      text: "See all",
    },
  },
};
