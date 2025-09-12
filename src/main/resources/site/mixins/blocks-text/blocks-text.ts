import { processHtml } from "/lib/xp/portal";
import { render } from "/lib/freemarker";
import { toSnakeCase } from "/lib/item-blocks/utils";
import type { BlocksText as RawBlocksText } from ".";
import type { BlocksText } from "/site/mixins/blocks-text/blocks-text.freemarker";
import type { BlockProcessorParams } from "/site/mixins/blocks/blocks";

const view = resolve("blocks-text.ftlh");

export function process(block: RawBlocksText, { locale }: BlockProcessorParams): string {
  return render<BlocksText>(view, {
    locale,
    id: toSnakeCase(block.title),
    title: block.title,
    text: processHtml({ value: block.text ?? "" }),
  });
}
