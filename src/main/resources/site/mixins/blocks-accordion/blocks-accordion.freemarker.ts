export type BlocksAccordion = {
  id?: string;
  locale: string;
  title?: string;
  classes?: string;
  items: Disclosure[];
};

export type Disclosure = {
  title: string;
  text: string;
};
