import { render } from "/lib/tineikt/freemarker";
import { imageUrl } from "/lib/xp/portal";
import { partPathToId } from "/lib/item-blocks/utils";
import { forceArray } from "/lib/item-blocks/arrays";
import type { Images } from "./blocks-images.freemarker";
import type { BlocksImages as RawBlocksImages } from ".";
import type { BlockProcessorParams } from "/site/mixins/blocks/blocks";

const view = resolve("blocks-images.ftl");

export function process(block: RawBlocksImages, { component, locale }: BlockProcessorParams): string {
  return render<Images>(view, {
    id: partPathToId(component.path),
    locale: locale,
    images: forceArray(block.items).map((item) => {
      return {
        src: imageUrl({
          id: item.imageId,
          scale: "width(400)",
        }),
        fullSizeSrc: imageUrl({
          id: item.imageId,
          scale: "full",
        }),
        sizes: "",
        srcset: "",
        altText: item.altText,
        caption: item.caption,
      };
    }),
  });
}
