import type { ErrorMessageMode } from '#/axios';

import { isString, isObject } from '@/utils/is';
import { useMessage } from '@/hooks/web/useMessage';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const { createErrorModal, createMessage } = useMessage();
const errorMessage = createMessage.error;

// 加入时间戳
export function joinTimeStamp<T extends boolean>(
  join: boolean,
  restful: T,
): T extends true ? string : object;

export function joinTimeStamp(join: boolean, restful = false): string | object {
  const now = new Date().getTime();

  if (!join) {
    return restful ? '' : {};
  }

  if (restful) {
    return `?_t=${now}`;
  }

  return { _t: now };
}

// 格式化请求时间
export function formatRequestDate(params: Recordable = {}) {
  if (Object.prototype.toString.call(params) !== '[object Object]') {
    return;
  }

  for (const key in params) {
    const format = params[key]?.format ?? null;

    if (format && typeof format === 'function') {
      params[key] = params[key].format(DATE_TIME_FORMAT);
    }

    if (isString(key)) {
      const value = params[key];

      if (value) {
        try {
          params[key] = isString(value) ? value.trim() : value;
        } catch (error: any) {
          throw new Error(error);
        }
      }
    }

    if (isObject(params[key])) {
      formatRequestDate(params[key]);
    }
  }
}

// 筛选使用什么异步组件
export function errorTip(mode: ErrorMessageMode, msg: string, code?: number) {
  switch (mode) {
    case 'modal':
      createErrorModal({ title: '请求失败', content: msg });
      break;
    case 'message':
      errorMessage({ content: msg, key: `error_${code || ''}` });
  }
}
