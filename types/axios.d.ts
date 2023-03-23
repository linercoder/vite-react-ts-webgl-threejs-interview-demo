import { SceneResourceType } from '@/core/module/Exhibition/type';

export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;
export type SuccessMessageMode = ErrorMessageMode;

export interface RequestOptions {
  /** post 请求的时候如果要添加参数到 url */
  joinParamsToUrl?: boolean;

  /** 格式化提交参数时间 */
  formatDate?: boolean;

  /** 返回原生 res.data */
  isTransformResponse?: boolean;

  /** 是否返回接口请求的原生响应 (意思就是把整个 res 类型返回回去，而不是只拿 res.data 的数据) */
  isReturnNativeResponse?: boolean;

  /** 默认将 prefix 添加到 url */
  joinPrefix?: boolean;

  /** 接口地址 */
  apiUrl?: string;

  /** 请求拼接的路径 */
  urlPrefix?: string;

  /** 消息的提示类型 */
  errorMessageMode?: ErrorMessageMode;

  /** 成功的消息提示类型 */
  successMessageMode?: SuccessMessageMode;

  /** 是否加入时间戳 */
  joinTime?: boolean;

  /** 是否为场景请求 */
  isSceneApi?: boolean;

  /** 忽略重复请求 */
  ignoreCancelToken?: boolean;

  /** 是否在 header 里面携带 token */
  withToken?: boolean;

  /** 请求重试机制 */
  retryRequest?: RetryRequest;
}

export interface RetryRequest {
  /** 是否开启重试 */
  isOpenRetry: boolean;

  /** 重试次数 */
  count: number;

  /** 请求用时 */
  waitTime: number;
}

export interface Result<T = any> {
  code: number;
  data?: T;
  message: string;
}

export interface SceneResult {
  info: {
    entities: SceneEntitiesType[];
    events: SceneEventsType[];
    resources: SceneResourceType[];
  };
  list: any;
}

export interface StorefrontInfo {
  id: string;
  oem_code: string;
  hub_user_id: string;

  address: string;
  contact_mobile: string;
  contact_person: string;
  name: string;
  on_sale: number[];

  updated_at: number;
}

export interface StorefrontWaiterInfo {
  id: string;
  name: string;
  mobile: string;
  avatar?: string;
  wechat_qrcode?: string;
  voice?: string;
}
