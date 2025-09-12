import type { ImageParams } from "/lib/item-blocks/images";

export type BlocksQuote = {
  locale: string;
  text?: string;
  author?: string;
  publicationTitle?: string;
  publicationUrl?: string;
  image?: ImageParams;
};
