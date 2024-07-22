import { render } from "/lib/tineikt/freemarker";
import { forceArray } from "/lib/item-blocks/arrays";
import { process as processCard } from "/site/mixins/blocks-card/blocks-card";
import type { BlocksCards as RawBlocksCards } from ".";
import type { BlocksCards } from "./blocks-cards.freemarker";

const view = resolve("blocks-cards.ftl");

export function process(block: RawBlocksCards): string {
  return render<BlocksCards>(view, {
    title: block.title,
    classes: [
      block.columnsClass ?? "blocks-card--cols-3",
      block.imageClass ?? "blocks-card--image-left",
      block.theme ? `theme-${block.theme}` : "theme-none",
    ].join(" "),
    items: forceArray(block.items).map(processCard),
  });
}
