import type { ContentImage, ContentVector } from "./types";
import { imageUrl } from "/lib/xp/portal";

export function getImageConfig({ imageContent, width, height }: GetImageConfigParams): ImageConfig {
  return {
    src: imageUrl({
      path: imageContent._path,
      scale: `block(${width},${height})`,
      format: imageContent.type === "media:image" ? "jpg" : undefined,
      quality: 75,
    }),
    width,
    height,
    altText: imageContent.type === "media:image" ? imageContent.data.altText : undefined,
    caption: imageContent.data.caption,
    copyright: imageContent.data.copyright,
  };
}

export type GetImageConfigParams = {
  imageContent: ContentImage | ContentVector;
  width: number;
  height: number;
};

export type ImageConfig = {
  src: string;
  width: number;
  height: number;
  altText?: string;
  caption?: string;
  copyright?: string;
};
