import type { Response } from "@enonic-types/core";
import { render } from "/lib/freemarker";
import { getImageParamsById } from "/lib/item-blocks/images";
import { processHtml } from "/lib/xp/portal";
import type { BlockProcessorParams } from "/site/mixins/blocks/blocks";
import type { BlocksQuote as RawBlocksQuote } from ".";
import type { BlocksQuote } from "./blocks-quote.freemarker";

const view = resolve("blocks-quote.ftlh");

export function process(block: RawBlocksQuote, { locale }: BlockProcessorParams): Response {
  const model: BlocksQuote = {
    locale,
    text: processHtml({ value: block.text ?? "" }),
    author: block.author,
    image: getImageParamsById({
      key: block.imageId,
      width: 200,
      height: 200,
      format: "png",
      filter: "rounded(100)",
    }),
  };

  return {
    body: render<BlocksQuote>(view, model),
  };
}
