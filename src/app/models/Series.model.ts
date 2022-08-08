import { SeriesAPI } from './SeriesAPI.model';

export interface SeriesList {
  page: number;
  results: SeriesAPI[];
  total_results: number;
  total_pages: number;
}