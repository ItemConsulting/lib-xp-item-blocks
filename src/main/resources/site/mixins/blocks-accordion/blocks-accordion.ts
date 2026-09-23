import type { Response } from "@enonic-types/core";
import { render } from "/lib/freemarker";
import { forceArray } from "/lib/item-blocks/arrays";
import { toSnakeCase } from "/lib/item-blocks/utils";
import { processHtml } from "/lib/xp/portal";
import type { BlockProcessorParams } from "/site/mixins/blocks/blocks";
import type { BlocksTheme } from "../blocks-theme";
import type { BlocksAccordion as RawBlocksAccordion } from ".";
import type { BlocksAccordion } from "./blocks-accordion.freemarker";

type RawBlocksAccordionAndTheme = RawBlocksAccordion & BlocksTheme;

const view = resolve("blocks-accordion.ftlh");

export function process(block: RawBlocksAccordionAndTheme, { locale }: BlockProcessorParams): Response {
  const model: BlocksAccordion = {
    id: toSnakeCase(block.title),
    title: block.title,
    locale,
    color: block.theme,
    items: forceArray(block.items).map((item) => ({
      title: item.title,
      text: processHtml({
        value: item.text ?? "",
      }),
    })),
  };

  return {
    body: render<BlocksAccordion>(view, model),
  };
}
