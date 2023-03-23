import { CacheTypeEnum } from '@/enums/cacheEnum';

// 全局使用的配置
export interface GlobConfig {
  apiUrl: string;

  appShortName: string;

  urlPrefix: string;

  apiSceneUrl: string;
}

// 全局使用的配置环境变量
export interface GlobEnvConfig {
  VITE_GLOB_API_URL: string;

  VITE_GLOB_API_URL_PREFIX: string;

  VITE_APP_SHORT_NAME: string;
}

// 项目设置参数
export interface ProjectConfig {
  // 权限相关的存储信息
  permissionCacheType: CacheTypeEnum;
}
