export interface Article {
  slug: string;
  title: string;
  description: string;
  url: string;
  date: string;
  external?: boolean;
}

export const articles: Article[] = [
  // Add articles here
];
