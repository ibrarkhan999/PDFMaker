export type TextPage = {
  id: string;
  content: string;
};

export type TextDocument = {
  title: string;
  pages: TextPage[];
};