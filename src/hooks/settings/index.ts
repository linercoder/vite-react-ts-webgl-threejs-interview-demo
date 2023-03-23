import type { GlobConfig } from '#/config';

import { getAppEnvConfig } from '@/utils/env';

export const useGlobSetting = (): Readonly<GlobConfig> => {
  const {
    VITE_GLOB_API_URL,
    VITE_GLOB_API_URL_PREFIX,
    VITE_APP_SHORT_NAME,
    VITE_GLOB_API_SCENE_URL,
  } = getAppEnvConfig();

  const glob: Readonly<GlobConfig> = {
    urlPrefix: VITE_GLOB_API_URL_PREFIX,
    apiUrl: VITE_GLOB_API_URL,
    appShortName: VITE_APP_SHORT_NAME,
    apiSceneUrl: VITE_GLOB_API_SCENE_URL,
  };

  return glob as Readonly<GlobConfig>;
};
