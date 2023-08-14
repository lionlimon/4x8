import type {Method} from "axios";

export type PaginationDto = { next_page: boolean }

export type PaginationModel = { nextPage: boolean }

export type Response<T> = {
  data: T;
  success: boolean,
  meta: PaginationDto & { next_try?: number}
}

export type PaginationParams = { page?: number, pageSize?: number };
export type OrderParams = { order?: Record<string, 'ASC' | 'DESC'> };

export type RequestParameters = {
  method?: Method,
  url?: string,
  data?: Record<string, unknown>
    & PaginationParams
    & { search?: string }
    & { filter?: Record<string, unknown>}
    & OrderParams,
  headers?: Record<string, string>,
}
