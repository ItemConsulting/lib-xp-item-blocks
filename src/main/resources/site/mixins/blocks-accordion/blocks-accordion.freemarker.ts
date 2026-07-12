export type BlocksAccordion = {
  id?: string;
  locale: string;
  title?: string;
  classes?: string;
  color?: string;
  items: Disclosure[];
};

export type Disclosure = {
  title: string;
  text: string;
};
