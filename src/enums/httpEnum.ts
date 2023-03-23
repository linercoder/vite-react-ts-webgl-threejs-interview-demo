export enum ResultEnum {
  SUCCESS = 200,
  SCENE_SUCCESS = 200000,
  ERROR = -1,
  TIMEOUT = 401,
  TYPE = 'success',
}

export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

export enum ErrorMessageEnum {
  ERROR_MSG_70001 = '请检查手机号是否已被使用！',
  ERROR_MSG_10006 = '用户名或者密码错误',
}

export const AuthErrorCode = [20001, 20002, 20003, 20004, 40001];
