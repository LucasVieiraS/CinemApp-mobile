import { MovieAPI } from './MovieAPI.model';

export interface MovieList {
  page: number;
  results: MovieAPI[];
  total_results: number;
  total_pages: number;
}