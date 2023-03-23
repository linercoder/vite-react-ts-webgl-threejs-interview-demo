import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { RequestOptions, Result } from '#/axios';

import { TOKEN_KEY } from '@/enums/cacheEnum';
import { ResultEnum, RequestEnum } from '@/enums/httpEnum';

import axios from 'axios';
import { errorTip } from './helper';
import { isString, isNull, isUnDef, isEmpty } from '@/utils/is';
import { setObjToUrlParams } from '@/utils';
import { checkBusinessCode } from './checkBusinessCode';
import { formatRequestDate, joinTimeStamp } from './helper';
import { AxiosRetry } from './axiosRetry';
import { useMessage } from '@/hooks/web/useMessage';

const { createErrorModal, createMessage, createSuccessModal } = useMessage();

export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string;
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
}

export abstract class AxiosTransform {
  /** 请求之前处理配置 */
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

  /** 处理响应数据 */
  transformResponseHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any;

  /** 请求失败处理 */
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;

  /** 请求之前的拦截 */
  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions,
  ) => AxiosRequestConfig;

  /** 请求之后的拦截 */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  /** 请求之前的拦截错误处理 */
  requestInterceptorsCatch?: (error: Error) => void;

  /** 请求之后的拦截器错误处理 */
  responseInterceptorsCatch?: (axiosInstance: AxiosResponse, error: Error) => void;
}

export const transform: AxiosTransform = {
  transformResponseHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformResponse, isReturnNativeResponse, isSceneApi } = options;

    if (isReturnNativeResponse) {
      return res;
    }

    if (!isTransformResponse) {
      return res.data;
    }

    const { data } = res;
    if (!data) {
      throw new Error('请求出错，请稍后尝试');
    }

    // 这里与后端商讨都字段要一致，类型在 axios.d.ts 的 Result 上

    const { code, msg: message } = data;
    // @ts-ignore
    const result = isSceneApi ? { info: data.info, list: data.list } : data.data;
    const isSuccess = isSceneApi ? code === ResultEnum.SCENE_SUCCESS : code === ResultEnum.SUCCESS;
    const isHasSuccess = result && Reflect.has(data, 'code') && isSuccess;

    if (isHasSuccess) {
      let successMsg = message;
      if (isNull(successMsg) || isUnDef(successMsg) || isEmpty(successMsg)) {
        successMsg = '操作成功';
      }

      if (options.successMessageMode === 'modal') {
        createSuccessModal({ title: '成功提示', content: successMsg });
      } else if (options.successMessageMode === 'message') {
        createMessage.success(successMsg);
      }

      return result;
    }

    // 校验状态码
    let timeoutMsg = '';
    switch (code) {
      case ResultEnum.TIMEOUT:
        timeoutMsg = '登录超时请重新登录';
        break;
      default:
        message && (timeoutMsg = message);
        break;
    }

    if (options.errorMessageMode === 'modal') {
      createErrorModal({ title: '错误提示', content: timeoutMsg });
    } else if (options.errorMessageMode === 'message') {
      createMessage.error(timeoutMsg);
    }

    const eventualMessage = timeoutMsg || '请求出错请稍后重试';
    throw new Error(eventualMessage);
  },

  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }

    const params = config.params || {};
    const data = config.data || false;

    formatDate && data && !isString(data) && formatRequestDate(data);

    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数, 避免缓存中拿数据
        config.params = Object.assign(params || {}, joinTimeStamp(joinTime, false));
      } else {
        // 兼容 restful 风格
        config.url = config.url + params + `${joinTimeStamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        const isHasData =
          Reflect.has(config, 'data') &&
          config.data &&
          (Object.keys(config.data).length > 0 || config.data instanceof FormData);

        formatDate && formatRequestDate(params);

        if (isHasData) {
          config.data = data;
          config.params = params;
        } else {
          // 非 get 请求如果没有提供 data，则将 params 视为 data
          config.data = params;
          config.params = undefined;
        }

        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data),
          );
        }
      } else {
        // 兼容 restful 风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  // _ 预留的 Options
  requestInterceptors: (config, _) => {
    // 请求之前处理 config (比如处理认证)
    const token = localStorage.getItem(TOKEN_KEY);

    console.log('token', token);

    // @ts-ignore
    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      // jwt token
      (config as Recordable).headers.token = token;
    }
    // 预留处理 token
    return config;
  },

  responseInterceptors: (res: AxiosResponse<any>) => {
    return res;
  },

  responseInterceptorsCatch: (axiosInstance: AxiosResponse, error: any) => {
    const { response, code: errorCode, message, config } = error || {};
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
    const msg: string = response?.data?.msg ?? '';
    const code: number = response?.data?.code ?? 0;
    const err: string = error?.toString?.() ?? '';
    let errMessage = '';

    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    try {
      if (errorCode === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = '接口请求超时，请刷新页面重试';
      }

      if (err?.includes('Network Error')) {
        errMessage = '网络异常，请检查您的网络连接是否正常!';
      }

      if (errMessage) {
        errorTip(errorMessageMode, errMessage);
        return Promise.reject(error);
      }
    } catch (error) {
      throw new Error(error as unknown as string);
    }

    // 拦截业务错误码逻辑
    checkBusinessCode(code, msg, errorMessageMode);

    // 添加自动重试机制 保险起见只针对 GET 请求
    const retryRequest = new AxiosRetry();
    const { isOpenRetry } = config.requestOptions.retryRequest;

    config.method?.toUpperCase() === RequestEnum.GET &&
      isOpenRetry &&
      // @ts-ignore
      retryRequest.retry(axiosInstance, error);

    return Promise.reject(error);
  },
};
