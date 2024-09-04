import { render } from "/lib/tineikt/freemarker";
import { forceArray } from "/lib/item-blocks/arrays";
import { notNullOrUndefined } from "/lib/item-blocks/utils";
import { process as processCard } from "/site/mixins/blocks-card/blocks-card";
import type { BlocksCards as RawBlocksCards } from ".";
import type { BlocksCards } from "./blocks-cards.freemarker";

const view = resolve("blocks-cards.ftl");

export function process(block: RawBlocksCards & { theme?: string }): string {
  return render<BlocksCards>(view, {
    title: block.title,
    classes: [
      block.columnsClass ?? "blocks-card--cols-3",
      block.imageClass ?? "blocks-card--image-left",
      block.theme ? `theme-${block.theme}` : undefined,
    ]
      .filter(notNullOrUndefined)
      .join(" "),
    items: forceArray(block.items).map(processCard),
  });
}
