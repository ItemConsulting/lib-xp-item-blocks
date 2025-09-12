import { render } from "/lib/freemarker";
import { forceArray } from "/lib/item-blocks/arrays";
import { notNullOrUndefined } from "/lib/item-blocks/utils";
import { process as processCard } from "/site/mixins/blocks-card/blocks-card";
import { process as processImagePlacement } from "/site/mixins/blocks-image-placement/blocks-image-placement";
import type { BlocksCards as BlocksCardsRaw } from ".";
import type { BlocksCards } from "./blocks-cards.freemarker";

type BlocksCardsRawWithOptionalFields = BlocksCardsRaw & {
  theme?: string;
};

const view = resolve("blocks-cards.ftlh");

export function process(block: BlocksCardsRawWithOptionalFields): string {
  return render<BlocksCards>(view, {
    title: block.title,
    classes: [
      block.columnsClass ?? "blocks-card--cols-3",
      processImagePlacement(block),
      block.theme ? `theme-${block.theme}` : undefined,
    ]
      .filter(notNullOrUndefined)
      .join(" "),
    items: forceArray(block.items).map(processCard),
  });
}
