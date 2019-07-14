import { EGenre } from './genre';

export interface IMovie {
  id: number;
  key: string;
  name: string;
  description: string;
  genres: EGenre[];
  rate: string;
  length: string;
  img: string;
  year: string;
}
