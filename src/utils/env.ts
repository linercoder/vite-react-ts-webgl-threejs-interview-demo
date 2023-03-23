// @ts-nocheck
import type { GlobEnvConfig } from '#/config';

export const getConfigFileName = (env: Record<string, any>) => {
  return `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || '__APP'}__CONF__`
    .toUpperCase()
    .replace(/\s/g, '');
};

export function getAppEnvConfig() {
  const ENV_NAME = getConfigFileName(import.meta.env);

  if (import.meta.env.PROD) {
    window[ENV_NAME] = import.meta.env;
  }

  const ENV = (import.meta.env.DEV
    ? // 获取全局配置（该配置将在打包时被独立提取出来
      (import.meta.env as unknown as GlobEnvConfig)
    : window[ENV_NAME as any]) as unknown as GlobEnvConfig;

  const {
    VITE_GLOB_API_URL,
    VITE_GLOB_API_URL_PREFIX,
    VITE_APP_SHORT_NAME,
    VITE_GLOB_API_SCENE_URL,
  } = ENV;

  return {
    VITE_GLOB_API_URL,
    VITE_GLOB_API_URL_PREFIX,
    VITE_APP_SHORT_NAME,
    VITE_GLOB_API_SCENE_URL,
  };
}

// 生成缓存 key
export function getStoragePrefixKey() {
  const { VITE_APP_SHORT_NAME } = getAppEnvConfig();
  return `${VITE_APP_SHORT_NAME}___${getEnv()}`.toUpperCase();
}

export function isDevMode(): boolean {
  return import.meta.env.DEV;
}

export function getEnv(): string {
  return import.meta.env.MODE;
}
