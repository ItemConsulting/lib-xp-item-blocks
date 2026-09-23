import type { ImageParams } from "/lib/item-blocks/images";

export type BlocksQuote = {
  locale: string;
  text?: string;
  author?: string;
  image?: ImageParams;
};
