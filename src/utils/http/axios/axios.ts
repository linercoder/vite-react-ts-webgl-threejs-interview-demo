import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import type { RequestOptions, Result } from '#/axios';
import type { CreateAxiosOptions } from './axiosTransform';

import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum';

import axios from 'axios';
import qs from 'qs';
import { cloneDeep } from 'lodash-es';

import { AxiosCanceler } from './axiosCancel';
import { isFunction, isDef } from '@/utils/is';

export class CustomerAxios {
  private axiosInstance: AxiosInstance;
  private readonly options: CreateAxiosOptions;

  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setUpInterceptors();
  }

  private getTransform() {
    const { transform } = this.options;
    return transform;
  }

  private setUpInterceptors() {
    const transform = this.getTransform();

    if (!transform) {
      return;
    }

    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform;

    const axiosCanceler = new AxiosCanceler();

    // axios 自带请求拦截
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      // @ts-ignore
      const { ignoreCancelToken } = config.requestOptions;

      const ignoreCancel = isDef(ignoreCancelToken)
        ? ignoreCancelToken
        : this.options.requestOptions?.ignoreCancelToken;

      !ignoreCancel && axiosCanceler.addPending(config);

      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options);
      }

      return config;
    }, undefined);

    // 请求前错误处理
    if (requestInterceptorsCatch && isFunction(requestInterceptorsCatch)) {
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);
    }

    // axios 自带响应拦截
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config);

      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }

      return res;
    }, undefined);

    if (responseInterceptorsCatch && isFunction(responseInterceptorsCatch)) {
      this.axiosInstance.interceptors.response.use(undefined, (error) => {
        //@ts-ignore
        return responseInterceptorsCatch(this.axiosInstance, error);
      });
    }
  }

  // FormData 方式发起请求
  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers;
    const contentType = headers?.['Content-Type'] || headers?.['content-type'];

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toLowerCase() === RequestEnum.GET
    ) {
      return config;
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
    };
  }

  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options);
  }

  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options);
  }

  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options);
  }

  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options);
  }

  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: CreateAxiosOptions = cloneDeep(config);
    const transform = this.getTransform();

    const { requestOptions } = this.options;

    const opt: RequestOptions = Object.assign({}, requestOptions, options);

    const { beforeRequestHook, requestCatchHook, transformResponseHook } = transform || {};

    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }
    conf.requestOptions = opt;

    conf = this.supportFormData(conf);

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformResponseHook && isFunction(transformResponseHook)) {
            try {
              const ret = transformResponseHook(res, opt);
              resolve(ret);
            } catch (err) {
              reject(err || new Error('request error!'));
            }
            return;
          }

          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt));
            return;
          }

          if (axios.isAxiosError(e)) {
            // 预留是否重新报错消息逻辑
          }

          reject(e);
        });
    });
  }
}
