import { processHtml } from "/lib/xp/portal";
import { render } from "/lib/freemarker";
import { forceArray } from "/lib/item-blocks/arrays";
import { toSnakeCase } from "/lib/item-blocks/utils";
import type { BlocksAccordion as RawBlocksAccordion } from ".";
import type { BlocksTheme } from "../blocks-theme";
import type { BlocksAccordion } from "./blocks-accordion.freemarker";

type RawBlocksAccordionAndTheme = RawBlocksAccordion & BlocksTheme;

const view = resolve("blocks-accordion.ftlh");

export function process(block: RawBlocksAccordionAndTheme): string {
  return render<BlocksAccordion>(view, {
    id: toSnakeCase(block.title),
    title: block.title,
    classes: block.theme ? `theme-${block.theme}` : undefined,
    items: forceArray(block.items).map((item) => ({
      title: item.title,
      text: processHtml({
        value: item.text ?? "",
      }),
    })),
  });
}
