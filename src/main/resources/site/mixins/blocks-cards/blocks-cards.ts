import { render } from "/lib/tineikt/freemarker";
import { forceArray } from "/lib/item-blocks/arrays";
import { process as processCard } from "/site/mixins/blocks-card/blocks-card";
import type { BlocksCards as RawBlocksCards } from ".";

const view = resolve("blocks-cards.ftl");

export function process(block: RawBlocksCards): string {
  return render(view, {
    title: block.title,
    items: forceArray(block.items).map((item) =>
      processCard(item, `blocks-card--image-position-${block.imagePosition}`),
    ),
  });
}
