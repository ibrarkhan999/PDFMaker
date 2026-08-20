export type PdfPage = {
  id: string;
  content: string;
};

export type PdfDocument = {
  title: string;
  pages: PdfPage[];
  pageSize: 'A4' | 'Letter';
  orientation: 'portrait' | 'landscape';
};