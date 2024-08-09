import { processHtml } from "/lib/xp/portal";
import { render } from "/lib/tineikt/freemarker";
import { forceArray } from "/lib/item-blocks/arrays";
import type { BlocksAccordion as RawBlocksAccordion } from ".";
import type { BlocksTheme } from "../blocks-theme";
import type { BlocksAccordion } from "./blocks-accordion.freemarker";

type RawBlocksAccordionAndTheme = RawBlocksAccordion & BlocksTheme;

const view = resolve("blocks-accordion.ftl");

export function process(block: RawBlocksAccordionAndTheme): string {
  const model: BlocksAccordion = {
    classes: block.theme ? `theme-${block.theme}` : undefined,
    items: forceArray(block.items).map((item) => ({
      title: item.title,
      text: processHtml({
        value: item.text ?? "",
      }),
    })),
  };

  return render<BlocksAccordion>(view, model);
}
