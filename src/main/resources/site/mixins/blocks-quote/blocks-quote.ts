import { processHtml } from "/lib/xp/portal";
import { render } from "/lib/tineikt/freemarker";
import { getImageParamsById } from "/lib/item-blocks/images";
import type { BlocksQuote as RawBlocksQuote } from ".";
import type { BlocksQuote } from "./blocks-quote.freemarker";

const view = resolve("blocks-quote.ftlh");

export function process(block: RawBlocksQuote): string {
  return render<BlocksQuote>(view, {
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
  });
}
