import { render } from "/lib/tineikt/freemarker";
import type { BlocksImages as RawBlocksImages } from ".";

const view = resolve("blocks-images.ftl");

export function process(block: RawBlocksImages): string {
  return render(view, {
    block,
  });
}
