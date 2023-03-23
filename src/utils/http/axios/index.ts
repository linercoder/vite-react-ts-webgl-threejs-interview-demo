import type { CreateAxiosOptions } from './axiosTransform';

import { deepMerge } from '@/utils';
import { clone } from 'lodash-es';
import { CustomerAxios } from './axios';
import { transform } from './axiosTransform';
import { ContentTypeEnum } from '@/enums/httpEnum';
import { useGlobSetting } from '@/hooks/settings';

const globSettings = useGlobSetting();
const urlPrefix = globSettings.urlPrefix;
const apiUrl = globSettings.apiUrl;

console.log('查看当前的apiUrl', apiUrl);

function createAxios(option?: Partial<CreateAxiosOptions>) {
  return new CustomerAxios(
    deepMerge(
      {
        authenticationScheme: '',

        timeout: 10 * 1000,

        headers: { 'Content-Type': ContentTypeEnum.JSON },

        transform: clone(transform),
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: false,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl,
          // 接口拼接地址
          urlPrefix,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,

          // 请求重试
          retryRequest: {
            isOpenRetry: false,
            count: 5,
            waitTime: 100,
          },
        },
      },
      option || {},
    ),
  );
}

export const defHttp = createAxios();
export const uploadHttp = createAxios({
  baseURL: 'https://realicloud-project.oss-cn-shenzhen.aliyuncs.com',
  timeout: 60 * 1000,
});
