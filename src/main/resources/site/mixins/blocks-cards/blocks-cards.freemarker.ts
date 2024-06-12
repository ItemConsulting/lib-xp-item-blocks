export type BlocksCard = {
  title?: string;
  cards: Card[];
  classes?: string;
  link?: {
    url: string;
    text: string;
  };
};

export type Card = {
  url: string;
  classes?: string;
  imageSrc?: string;
  kicker?: string;
  title?: string;
  text?: string;
};
