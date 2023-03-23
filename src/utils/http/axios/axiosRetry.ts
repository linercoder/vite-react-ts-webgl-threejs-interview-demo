import { AxiosError, AxiosInstance } from 'axios';

export class AxiosRetry {
  /**
   * 重试
   */
  retry(AxiosInstance: AxiosInstance, error: AxiosError) {
    const config = error?.response?.config as unknown as any;
    const { waitTime, count } = config?.requestOptions?.retryRequest;
    config.__retryCount = config.__retryCount || 0;
    if (config.__retryCount >= count) {
      return Promise.reject(error);
    }
    config.__retryCount += 1;
    return this.delay(waitTime).then(() => AxiosInstance(config));
  }

  /**
   * 延迟
   */
  private delay(waitTime: number) {
    return new Promise((resolve) => setTimeout(resolve, waitTime));
  }
}
