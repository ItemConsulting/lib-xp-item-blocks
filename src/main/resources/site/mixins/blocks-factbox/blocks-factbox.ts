import { processHtml } from "/lib/xp/portal";
import { render } from "/lib/tineikt/freemarker";
import type { BlocksFactbox as RawBlocksFactbox } from ".";
import type { BlocksFactbox } from "./blocks-factbox.freemarker";

const view = resolve("blocks-text.ftl");

export function process(block: RawBlocksFactbox): string {
  return render<BlocksFactbox>(view, {
    title: block.title,
    text: processHtml({ value: block.text ?? "" }),
  });
}
