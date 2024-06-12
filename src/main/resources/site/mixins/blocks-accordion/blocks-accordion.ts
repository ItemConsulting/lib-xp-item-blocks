import { processHtml } from "/lib/xp/portal";
import { render } from "/lib/tineikt/freemarker";
import { forceArray } from "/lib/item-blocks/arrays";
import type { BlocksAccordion as RawBlocksAccordion } from ".";
import type { BlocksAccordion } from "./blocks-accordion.freemarker";

const view = resolve("blocks-accordion.ftl");

export function process(block: RawBlocksAccordion): string {
  const model: BlocksAccordion = {
    items: forceArray(block.items).map((item) => ({
      title: item.title,
      text: processHtml({
        value: item.text ?? "",
      }),
    })),
  };

  return render<BlocksAccordion>(view, model);
}
