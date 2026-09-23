import "../../../assets/styles/blocks/blocks-card.css";
import "./blocks-card.stories.css";
import type { Meta, StoryObj } from "@itemconsulting/xp-storybook-utils";
import { controlRadioTheme } from "../../storybook-utils";
import id from "./blocks-card.ftlh";
import "@digdir/designsystemet-web/clickdelegatefor";

type CardsStory = {
  locale: string;
  color: string;
  imageClass: string;
  sizeClass: string;
  variant: string;
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
    color: controlRadioTheme,
    variant: {
      name: "Variant",
      options: ["default", "tinted"],
      control: {
        type: "inline-radio",
        labels: {
          default: "Default",
          tinted: "Tinted",
        },
      },
    },
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
  args: {
    locale: "no_NB",
  },
  parameters: {
    server: {
      id,
      params: {
        template: `
          <div class="\${sizeClass!''}">
            [#assign classes="\${imageClass!''}"]
            [#include "${id}"]
          </div>
        `,
      },
    },
  },
} satisfies Meta<CardsStory>;

export const small: StoryObj = {
  args: {
    id: "my-card",
    sizeClass: "blocks-card-story--small",
    color: "accent",
    variant: "tinted",
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
    id: "my-card",
    sizeClass: "blocks-card-story--medium",
    color: "accent",
    variant: "tinted",
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
    id: "my-card",
    sizeClass: "blocks-card-story--large",
    color: "accent",
    variant: "tinted",
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
    id: "my-card",
    sizeClass: "blocks-card-story--extra-large",
    color: "accent",
    variant: "tinted",
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
    id: "my-card",
    sizeClass: "blocks-card-story--large",
    color: "accent",
    variant: "tinted",
    imageClass: "blocks-card--image-left",
    image: {
      src: "eggman-thumb.jpg",
    },
  },
};

export const textOnly: StoryObj = {
  args: {
    id: "my-card",
    sizeClass: "blocks-card-story--extra-large",
    color: "accent",
    variant: "tinted",
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
    id: "my-card",
    sizeClass: "blocks-card-story--medium",
    color: "accent",
    variant: "tinted",
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
    id: "my-card",
    sizeClass: "blocks-card-story--large",
    color: "accent",
    variant: "tinted",
    imageClass: "blocks-card--image-left",
    image: {
      src: "profile.svg",
    },
  },
};
