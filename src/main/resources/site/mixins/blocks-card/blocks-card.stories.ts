import "../../../assets/styles/blocks/blocks-card.css";
import "./blocks-card.stories.css";
import id from "./blocks-card.ftl";
import { controlRadioTheme } from "../../storybook-utils";
import type { Meta, StoryObj } from "@itemconsulting/xp-storybook-utils";

type CardsStory = {
  themeClass: string;
  imageClass: string;
  sizeClass: string;
};

export default {
  title: "Blocks/Card",
  argTypes: {
    sizeClass: {
      name: "Size",
      options: [
        "blocks-card-story--small",
        "blocks-card-story--medium",
        "blocks-card-story--large",
        "blocks-card-story--extra-large",
      ],
      control: {
        type: "inline-radio",
        labels: {
          "blocks-card-story--small": "Small",
          "blocks-card-story--medium": "Medium",
          "blocks-card-story--large": "Large",
          "blocks-card-story--extra-large": "Extra Large",
        },
      },
    },
    themeClass: controlRadioTheme,
    imageClass: {
      name: "Image Position",
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
          <div class="\${sizeClass!''}">
            [#assign classes="\${imageClass!''} \${themeClass!''}"]
            [#include "${id}"]
          </div>
        `,
      },
    },
  },
} satisfies Meta<CardsStory>;

export const small: StoryObj = {
  args: {
    sizeClass: "blocks-card-story--small",
    themeClass: "theme-accent",
    imageClass: "blocks-card--image-left",
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
  },
};

export const medium: StoryObj = {
  args: {
    sizeClass: "blocks-card-story--medium",
    themeClass: "theme-accent",
    imageClass: "blocks-card--image-left",
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
  },
};

export const large: StoryObj = {
  args: {
    sizeClass: "blocks-card-story--large",
    themeClass: "theme-accent",
    imageClass: "blocks-card--image-left",
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
  },
};

export const extraLarge: StoryObj = {
  args: {
    sizeClass: "blocks-card-story--extra-large",
    themeClass: "theme-accent",
    imageClass: "blocks-card--image-left",
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
  },
};

export const imageOnly: StoryObj = {
  args: {
    sizeClass: "blocks-card-story--large",
    themeClass: "theme-accent",
    imageClass: "blocks-card--image-left",
    image: {
      src: "eggman-thumb.jpg",
    },
  },
};

export const textOnly: StoryObj = {
  args: {
    sizeClass: "blocks-card-story--extra-large",
    themeClass: "theme-accent",
    imageClass: "blocks-card--image-left",
    kicker: "Blogpost",
    title: "Overskrift 1",
    text: `
          <p>Dette er noe riktekst</p>
          <ul>
            <li>test</li>
            <li>test2</li>
          </ul>`,
    url: "#",
  },
};

export const withSVGImage: StoryObj = {
  args: {
    sizeClass: "blocks-card-story--medium",
    themeClass: "theme-accent",
    imageClass: "blocks-card--image-left",
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
      src: "profile.svg",
    },
  },
};

export const withSVGImageOnly: StoryObj = {
  args: {
    sizeClass: "blocks-card-story--large",
    themeClass: "theme-accent",
    imageClass: "blocks-card--image-left",
    image: {
      src: "profile.svg",
    },
  },
};
