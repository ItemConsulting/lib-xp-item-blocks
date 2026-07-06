import type { Response } from "@enonic-types/core";
import { render } from "/lib/freemarker";
import { forceArray } from "/lib/item-blocks/arrays";
import { concat as concatResponse, responseBodyToString } from "/lib/item-blocks/responses";
import { notNullOrUndefined } from "/lib/item-blocks/utils";
import type { BlockProcessorParams } from "/site/mixins/blocks/blocks";
import { process as processCard } from "/site/mixins/blocks-card/blocks-card";
import { process as processImagePlacement } from "/site/mixins/blocks-image-placement/blocks-image-placement";
import type { BlocksCards as BlocksCardsRaw } from ".";
import type { BlocksCards } from "./blocks-cards.freemarker";

type BlocksCardsRawWithOptionalFields = BlocksCardsRaw & {
  theme?: string;
};

const view = resolve("blocks-cards.ftlh");

export function process(block: BlocksCardsRawWithOptionalFields, params: BlockProcessorParams): Response {
  const renderedCards = forceArray(block.items)
    .map((item) => processCard(item, params))
    .reduce(concatResponse, {});

  const model: BlocksCards = {
    locale: params.locale,
    title: block.title,
    classes: [
      block.columnsClass ?? "blocks-card--cols-3",
      processImagePlacement(block),
      block.theme ? `theme-${block.theme}` : undefined,
      block.theme ? `theme-${block.theme}` : undefined,
    ]
      .filter(notNullOrUndefined)
      .join(" "),
    cardsMarkup: responseBodyToString(renderedCards.body),
  };

  return {
    body: render<BlocksCards>(view, model),
  };
}
