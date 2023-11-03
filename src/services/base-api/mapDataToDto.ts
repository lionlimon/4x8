import { RequestParameters } from './types';

export const mapDataToDto = (data: RequestParameters['data']) => ({
  ...data,
  page_size: data?.pageSize,
});
