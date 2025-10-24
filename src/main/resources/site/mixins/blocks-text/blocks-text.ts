import { processHtml } from "/lib/xp/portal";
import { render } from "/lib/freemarker";
import { toSnakeCase } from "/lib/item-blocks/utils";
import type { BlocksText as RawBlocksText } from ".";
import type { BlocksText } from "/site/mixins/blocks-text/blocks-text.freemarker";
import type { BlockProcessorParams } from "/site/mixins/blocks/blocks";
import type { Response } from "@enonic-types/core";

const view = resolve("blocks-text.ftlh");

export function process(block: RawBlocksText, { locale }: BlockProcessorParams): Response {
  const model: BlocksText = {
    locale,
    id: toSnakeCase(block.title),
    title: block.title,
    text: processHtml({
      value: block.text ?? "",
    }),
  };

  return {
    body: render<BlocksText>(view, model),
  };
}
