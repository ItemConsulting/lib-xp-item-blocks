export type BlocksAccordion = {
  id?: string;
  title?: string;
  classes?: string;
  items: Disclosure[];
};

export type Disclosure = {
  title: string;
  text: string;
};
