export interface Post {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  date: string;
  image: {
    url: string;
  } | null;
}
