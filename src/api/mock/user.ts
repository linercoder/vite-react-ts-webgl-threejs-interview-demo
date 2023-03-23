import type { Result } from '#/axios';

import { defHttp } from '@/utils/http/axios';

enum ApiUrlEnum {
  url = '/user/info',
}

export interface UserInfoResponse {
  name: string;
  age: number;
}

export interface UserInfoParam {
  id: string;
  name: string;
  age: number;
}

export const getUserInfoApi = (params: Pick<UserInfoParam, 'id'>) => {
  return defHttp.get<Result<UserInfoResponse>>({
    url: ApiUrlEnum.url,
    params,
  });
};

export const delUserInfoApi = (data: Pick<UserInfoParam, 'id'>) => {
  return defHttp.delete<Result>({
    url: ApiUrlEnum.url,
    data,
  });
};

export const putUserInfoApi = (data: PartialByKeys<UserInfoParam, 'name' | 'age'>) => {
  return defHttp.put<Result>({
    url: ApiUrlEnum.url,
    data,
  });
};

export const postUserInfoApi = (data: PartialByKeys<UserInfoParam, 'name' | 'age'>) => {
  return defHttp.post<Result>({
    url: ApiUrlEnum.url,
    data,
  });
};
