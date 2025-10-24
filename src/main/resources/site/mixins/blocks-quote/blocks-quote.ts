import { processHtml } from "/lib/xp/portal";
import { render } from "/lib/freemarker";
import { getImageParamsById } from "/lib/item-blocks/images";
import type { BlocksQuote as RawBlocksQuote } from ".";
import type { BlocksQuote } from "./blocks-quote.freemarker";
import type { BlockProcessorParams } from "/site/mixins/blocks/blocks";
import type { Response } from "@enonic-types/core";

const view = resolve("blocks-quote.ftlh");

export function process(block: RawBlocksQuote, { locale }: BlockProcessorParams): Response {
  const model: BlocksQuote = {
    locale,
    text: processHtml({ value: block.text ?? "" }),
    publicationTitle: block.publicationTitle,
    author: block.author,
    publicationUrl: block.publicationUrl,
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
