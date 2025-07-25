import { type AxiosRequestConfig } from "axios";
import qs from "qs";

import axiosInstance from "./axios.config";
import type { ApiResponse } from "./axios.types.ts";

/**
 * Обертка для создания запроса через Axios
 *
 * @param params - конфигурация запроса
 *
 * @returns результат выполнения запроса
 */
export const makeRequest = async <T = unknown, D = unknown>(
  params: AxiosRequestConfig<D>,
): Promise<ApiResponse<T>> => {
  const localParams = params;

  if (!localParams.paramsSerializer) {
    localParams.paramsSerializer = (queryParams) =>
      qs.stringify(queryParams, { encode: false, indices: false });
  }
  try {
    const { status, data } = await axiosInstance.request<T>(localParams);
    return { status, data };
  } catch (err: unknown) {
    return Promise.reject(err);
  }
};
