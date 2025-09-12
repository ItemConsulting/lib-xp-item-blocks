import { render } from "/lib/freemarker";
import { imageUrl } from "/lib/xp/portal";
import { partPathToId } from "/lib/item-blocks/utils";
import { forceArray } from "/lib/item-blocks/arrays";
import type { GalleryImage, Images } from "./blocks-images.freemarker";
import type { BlocksImages as RawBlocksImages } from ".";
import type { BlockProcessorParams } from "/site/mixins/blocks/blocks";
import type { Unarray } from "/lib/item-blocks/types";

type BlocksImagesItemRaw = Unarray<RawBlocksImages["items"]>;

const view = resolve("blocks-images.ftlh");

export function process(block: RawBlocksImages, { component, locale, blockIndex }: BlockProcessorParams): string {
  return render<Images>(view, {
    id: `${partPathToId(component.path)}-${blockIndex}`,
    locale,
    images: forceArray(block.items).map(getImage),
  });
}

function getImage(item: BlocksImagesItemRaw, _: number, arr: BlocksImagesItemRaw[]): GalleryImage {
  const isSingleImage = arr.length === 1;
  const width = isSingleImage ? 640 : 400;
  const height = isSingleImage ? 384 : 240;

  return {
    src: imageUrl({
      id: item.imageId,
      scale: `block(${width}, ${height})`,
    }),
    fullSizeSrc: imageUrl({
      id: item.imageId,
      scale: "full",
    }),
    altText: item.altText,
    caption: item.caption,
    width,
    height,
  };
}
