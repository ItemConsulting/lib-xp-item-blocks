import { processHtml } from "/lib/xp/portal";
import { render } from "/lib/tineikt/freemarker";
import { toSnakeCase } from "/lib/item-blocks/utils";
import type { BlocksText as RawBlocksText } from ".";
import type { BlocksText } from "/site/mixins/blocks-text/blocks-text.freemarker";

const view = resolve("blocks-text.ftl");

export function process(block: RawBlocksText): string {
  return render<BlocksText>(view, {
    id: toSnakeCase(block.title),
    title: block.title,
    text: processHtml({ value: block.text ?? "" }),
  });
}
