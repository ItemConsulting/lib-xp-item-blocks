import id from "./blocks-view.ftl";
import textId from "../../mixins/blocks-text/blocks-text.ftl";
import factboxId from "../../mixins/blocks-factbox/blocks-factbox.ftl";
import cardsId from "../../mixins/blocks-cards/blocks-cards.ftl";
import accordionId from "../../mixins/blocks-accordion/blocks-accordion.ftl";
import "./blocks-view.css";
import "../../mixins/blocks-accordion/blocks-accordion.css";
import "../../mixins/blocks-factbox/blocks-factbox.css";
import "../../mixins/blocks-cards/blocks-cards.css";
import type { StoryObj, Meta } from "@itemconsulting/xp-storybook-utils";

import { factbox } from "../../mixins/blocks-factbox/blocks-factbox.stories";
import { accordion } from "../../mixins/blocks-accordion/blocks-accordion.stories";
import { text } from "../../mixins/blocks-text/blocks-text.stories";
import { cards } from "../../mixins/blocks-cards/blocks-cards.stories";
import { controlRadioTheme } from "../../storybook-utils";

export default {
  title: "Parts/Blocks View",
  argTypes: {
    factboxThemeClass: controlRadioTheme,
    accordionClasses: controlRadioTheme,
    cardsClasses: controlRadioTheme,
    blockGap: {
      name: "Block gap",
      control: "inline-radio",
      options: ["Small", "Medium", "Large", "None"],
      mapping: {
        Small: "blocks-view--gap--sm",
        Medium: "blocks-view--gap-md",
        Large: "blocks-view--gap-lg",
        None: "blocks-view--gap-none",
      },
    },
  },
  parameters: {
    server: {
      id,
      params: {
        template: `
          [#assign blocks]
            [#-- Text --]
            [#assign title=text1Title /]
            [#assign text=text1Text /]
            [#include "${textId}"]

            [#-- Factbox --]
            [#assign title=factboxTitle /]
            [#assign text=factboxText /]
            [#assign classes=factboxThemeClass /]
            [#include "${factboxId}"]

            [#--
            [#assign title=cardsTitle]
            [#assign classes=cardsClasses]
            [#assign cards=cardsCards]
            [#assign link=cardsLink]
            [#include "${cardsId}"]
            --]

            [#-- Text --]
            [#assign title=text2Title /]
            [#assign text=text2Text /]
            [#include "${textId}"]

            [#-- Accordion --]
            [#assign items=accordionItems /]
            [#assign classes=accordionClasses /]
            [#include "${accordionId}"]
          [/#assign]

          [#assign classes=blockGap /]
          [#include "${id}"]
        `,
      },
    },
  },
} satisfies Meta;

export const blocksView: StoryObj = {
  args: {
    blockGap: "Medium",
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
    cardsTitle: cards.args?.title,
    cardsClasses: cards.args?.classes,
    cardsLink: cards.args?.link,
    cardsCards: cards.args?.cards,
    factboxTitle: factbox.args?.title,
    factboxText: factbox.args?.text,
    factboxThemeClass: factbox.args?.classes,
    accordionItems: accordion.args?.items,
    accordionClasses: accordion.args?.classes,
  },
};
