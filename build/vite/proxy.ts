import type { ProxyOptions } from 'vite';

type ProxyItem = [string, string];
type ProxyList = ProxyItem[];
type ProxyTargetList = Record<string, ProxyOptions>;

const _HttpsReg = /^https:\/\//;

/**
 * 生成代理
 * @param { Array } list
 */
export function createProxy(list: ProxyList = []) {
  const res: ProxyTargetList = {};

  for (const [prefix, target] of list) {
    const isHttps = _HttpsReg.test(target);

    // 支持的配置：https://github.com/http-party/node-http-proxy#options
    res[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      ...(isHttps ? { secure: false } : {}),
    };
  }

  return res;
}
