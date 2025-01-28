import { render } from "/lib/tineikt/freemarker";
import { imageUrl } from "/lib/xp/portal";
import { partPathToId } from "/lib/item-blocks/utils";
import { forceArray } from "/lib/item-blocks/arrays";
import type { GalleryImage, Images } from "./blocks-images.freemarker";
import type { BlocksImages as RawBlocksImages } from ".";
import type { BlockProcessorParams } from "/site/mixins/blocks/blocks";
import type { Unarray } from "/lib/item-blocks/types";

type BlocksImagesItemRaw = Unarray<RawBlocksImages["items"]>;

const view = resolve("blocks-images.ftl");

export function process(block: RawBlocksImages, { component, locale, blockIndex }: BlockProcessorParams): string {
  return render<Images>(view, {
    id: `${partPathToId(component.path)}-${blockIndex}`,
    locale: locale,
    images: forceArray(block.items).map(getImage),
  });
}

function getImage(item: BlocksImagesItemRaw, index: number, arr: BlocksImagesItemRaw[]): GalleryImage {
  return {
    src: imageUrl({
      id: item.imageId,
      scale: arr.length === 1 ? "block(640, 384)" : "block(400, 240)",
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
}
