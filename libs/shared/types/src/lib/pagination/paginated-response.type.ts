import { PaginationMeta } from './pagination-meta.type';

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
