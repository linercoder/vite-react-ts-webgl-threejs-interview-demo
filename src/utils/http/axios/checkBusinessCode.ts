import type { ErrorMessageMode } from '#/axios';

import { errorTip } from './helper';
import { ErrorMessageEnum } from '@/enums/httpEnum';

export function checkBusinessCode(
  code: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = 'message',
): boolean {
  let errMessage = '';

  // 处理出来 code 的方法然后返回判断
  // const isErrorAuth = isTriggerErrorAuthEvent(code);

  // isErrorAuth ?? (errMessage = `权限失效，原因：${msg}`);

  switch (code) {
    case 70001:
      errMessage = ErrorMessageEnum.ERROR_MSG_70001;
      break;
    case 10006:
      errMessage = ErrorMessageEnum.ERROR_MSG_10006;
  }

  if (errMessage) {
    errorTip(errorMessageMode, msg, code);
    return true;
  }

  return false;
}
