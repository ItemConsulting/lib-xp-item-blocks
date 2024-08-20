import id from "./blocks.ftl";
import textId from "../blocks-text/blocks-text.ftl";
import factboxId from "../blocks-factbox/blocks-factbox.ftl";
import cardsId from "../blocks-cards/blocks-cards.ftl";
import accordionId from "../blocks-accordion/blocks-accordion.ftl";
import imagesId from "../blocks-images/blocks-images.ftl";
import "../../../assets/styles/blocks/blocks-content-grid.css";
import "../../../assets/styles/blocks/blocks-accordion.css";
import "../../../assets/styles/blocks/blocks-factbox.css";
import "../../../assets/styles/blocks/blocks-cards.css";
import type { StoryObj, Meta } from "@itemconsulting/xp-storybook-utils";

import { factbox } from "../blocks-factbox/blocks-factbox.stories";
import { accordion } from "../blocks-accordion/blocks-accordion.stories";
import { text } from "../blocks-text/blocks-text.stories";
import { Cards, default as cardsMeta } from "../blocks-cards/blocks-cards.stories";
import { images } from "../blocks-images/blocks-images.stories";
import { controlRadioTheme } from "../../storybook-utils";

export default {
  title: "Blocks/Blocks",
  argTypes: {
    factboxThemeClass: controlRadioTheme,
    accordionClasses: controlRadioTheme,
    cardsClasses: controlRadioTheme,
    blockGap: {
      name: "Block gap",
      control: "inline-radio",
      options: ["Small", "Medium", "Large", "XL", "XXL", "None"],
      mapping: {
        Small: "blocks--gap-sm",
        Medium: "blocks--gap-md",
        Large: "blocks--gap-lg",
        XL: "blocks--gap-xl",
        XXL: "blocks--gap-xxl",
        None: "blocks--gap-none",
      },
    },
    cardsColumnsClass: cardsMeta.argTypes.columnsClass,
  },
  parameters: {
    layout: "fullscreen",
    server: {
      id,
      params: {
        template: `
          [#assign text1]
            [#-- Text --]
            [#assign title=text1Title /]
            [#assign text=text1Text /]
            [#include "${textId}"]
          [/#assign]

          [#assign factbox]
            [#-- Factbox --]
            [#assign title=factboxTitle /]
            [#assign text=factboxText /]
            [#assign classes=factboxThemeClass /]
            [#include "${factboxId}"]
          [/#assign]

          [#assign cards]
            [#-- Cards --]
            [#assign title=cardsTitle]
            [#assign classes="\${imageClass} \${themeClass} \${cardsColumnsClass}" /]
            [#assign items=cardsCards]
            [#assign link=cardsLink]
            [#include "${cardsId}"]
          [/#assign]

          [#assign text2]
            [#-- Text --]
            [#assign title=text2Title /]
            [#assign text=text2Text /]
            [#include "${textId}"]
          [/#assign]

          [#assign accordion]
            [#-- Accordion --]
            [#assign items=accordionItems /]
            [#assign classes=accordionClasses /]
            [#include "${accordionId}"]
          [/#assign]

          [#assign images]
            [#-- Images --]
            [#assign images=images /]
            [#assign id="image-block-id" /]
            [#include "${imagesId}"]
          [/#assign]

          [#assign blocks=[text1, factbox, cards, text2, accordion, images] /]
          [#assign classes=blockGap /]
          [#include "${id}"]
        `,
      },
    },
  },
} satisfies Meta;

export const blocks: StoryObj = {
  args: {
    locale: "no",
    blockGap: "Large",
    text1Title: "Welcome to my blog!",
    text1Text: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
      <ul>
        <li>Sharks</li>
        <li>Lasers</li>
        <li>Unicorns</li>
      </ul>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    `,
    text2Title: text.args?.title,
    text2Text: text.args?.text,
    cardsTitle: Cards.args?.title,
    cardsColumnsClass: Cards.args?.columnsClass,
    imageClass: Cards.args?.imageClass,
    themeClass: Cards.args?.themeClass,
    cardsLink: Cards.args?.link,
    cardsCards: Cards.args?.items,
    factboxTitle: factbox.args?.title,
    factboxText: factbox.args?.text,
    factboxThemeClass: factbox.args?.classes,
    accordionItems: accordion.args?.items,
    accordionClasses: accordion.args?.classes,
    images: images.args?.images,
  },
};
