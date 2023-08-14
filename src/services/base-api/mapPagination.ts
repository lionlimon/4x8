import type {PaginationDto, PaginationModel} from "./types";

export const mapPaginationDtoToModel = (pagination: PaginationDto): PaginationModel => ({
  nextPage: pagination?.next_page ?? null
})

export const mapPaginationModelToDto = (pagination: PaginationModel): PaginationDto => ({
  next_page: pagination.nextPage
})
