import { AxiosResponse } from 'axios';
import { RefrigeratorFood } from 'types';
import instance from '../utils/axiosInstance';

export const updateRefrigeratorFoodsApi = (
  id: string
): Promise<AxiosResponse<RefrigeratorFood>> => {
  return instance.patch(`/api/refrigerator/foods/${id}/consume`);
};

export const deleteRefrigeratorFoodsApi = (
  id: string
): Promise<AxiosResponse<any>> => {
  return instance.delete(`/api/refrigerator/foods/${id}`);
};

export const insertRefrigeratorFoodsApi = (
  refrigeratorFood: RefrigeratorFood
): Promise<AxiosResponse<RefrigeratorFood>> => {
  return instance.post(
    `/api/homes/${refrigeratorFood.homeId}/refrigerator/foods`,
    refrigeratorFood
  );
};

export const fetchRefrigeratorFoodsApi = (
  homeId: string
): Promise<AxiosResponse<RefrigeratorFood>> => {
  return instance.get(`/api/homes/${homeId}/refrigerator/foods`);
};

export const fetchRefrigeratorSummaryApi = (
  homeId: string
): Promise<AxiosResponse<Record<string, string>[]>> => {
  return instance.get(`/api/homes/${homeId}/refrigerator/summary`);
};
