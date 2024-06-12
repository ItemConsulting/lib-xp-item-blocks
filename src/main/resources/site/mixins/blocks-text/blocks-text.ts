import { processHtml } from "/lib/xp/portal";
import { render } from "/lib/tineikt/freemarker";
import type { BlocksText as RawBlocksText } from ".";

const view = resolve("blocks-text.ftl");

export function process(block: RawBlocksText): string {
  return render(view, {
    title: block.title,
    text: processHtml({ value: block.text ?? "" }),
  });
}
