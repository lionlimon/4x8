import type { AxiosResponse } from 'axios';
import { axiosInstance } from '@/services/api';
import type { RequestParameters, Response } from './types';
import { mapPaginationDtoToModel } from '@/services/base-api/mapPagination';
import { mapDataToDto } from '@/services/base-api/mapDataToDto';

/**
 * Базовая сущность от которой наследуются другие сущности
 */
export class ApiEntity {
  private readonly entityUrl: string;

  private unwrapResponse<T>(httpResponse: AxiosResponse<Response<T>>) {
    const pagination = httpResponse.data.meta;

    return {
      data: httpResponse.data.data,
      pagination: mapPaginationDtoToModel(pagination),
      meta: {
        nextTry: httpResponse.data.meta?.next_try
      }
    };
  }

  async http<R>({ data, ...params }: RequestParameters) {
    const mappedData = mapDataToDto(data);
    const isGet = !params.method || params.method === 'GET';

    const response = await axiosInstance.request<Response<R>>({
      ...params,
      ...(isGet ? { params: mappedData } : { data: mappedData }),
      url: this.entityUrl + (params.url || '')
    });

    return this.unwrapResponse(response);
  }

  constructor(entityUrl?: string) {
    this.entityUrl = entityUrl ?? '';
  }
}
