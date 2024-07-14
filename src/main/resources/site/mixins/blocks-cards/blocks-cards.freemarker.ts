import type { BlocksCard } from "../blocks-card/blocks-card.freemarker";

export type BlocksCards = {
  title?: string;
  cards: BlocksCard[];
  classes?: string;
  link?: {
    url: string;
    text: string;
  };
};
