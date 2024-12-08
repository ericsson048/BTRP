export interface Project {
  id: number;
  num: string;
  category: string;
  title: string;
  description: string;
  img: string;
  live: string;
  github: string;
  stack: {
    id: number;
    name: string;
  }[];
}
