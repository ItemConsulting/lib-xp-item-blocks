import "./blocks-cards.css";
import "../blocks-card/blocks-card.css";
import id from "./blocks-cards.ftl";
import { controlRadioTheme } from "../../storybook-utils";
import { renderOnServer, type Meta, type StoryObj } from "@itemconsulting/xp-storybook-utils";

type CardsStory = {
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

      [#assign cards=cards?chunk(count)[0] /]

      <div class="blocks-card-story--extra-large">
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
    title: "Cards example",
    themeClass: "theme-accent",
    imageClass: "blocks-card--image-left",
    count: 5,
    columnsClass: "blocks-card--cols-3",
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
