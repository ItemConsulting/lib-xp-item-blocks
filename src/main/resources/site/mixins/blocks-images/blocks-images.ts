import type { Response } from "@enonic-types/core";
import { render } from "/lib/freemarker";
import { forceArray } from "/lib/item-blocks/arrays";
import type { Unarray } from "/lib/item-blocks/types";
import { partPathToId } from "/lib/item-blocks/utils";
import { imageUrl } from "/lib/xp/portal";
import type { BlockProcessorParams } from "/site/mixins/blocks/blocks";
import type { BlocksImages as RawBlocksImages } from ".";
import type { GalleryImage, Images } from "./blocks-images.freemarker";

type BlocksImagesItemRaw = Unarray<RawBlocksImages["items"]>;

const view = resolve("blocks-images.ftlh");

export function process(block: RawBlocksImages, { component, locale, blockIndex }: BlockProcessorParams): Response {
  const model: Images = {
    id: `${partPathToId(component.path)}-${blockIndex}`,
    locale,
    images: forceArray(block.items).map(getImage),
  };

  return {
    body: render<Images>(view, model),
  };
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
