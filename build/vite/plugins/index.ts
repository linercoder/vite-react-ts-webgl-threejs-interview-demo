import type { PluginOption } from 'vite';

import React from '@vitejs/plugin-react';
import { configStyleImportPlugin } from './styleImport';
import configInjectAssetsPathPlugin from './html';

export function createVitePlugin(viteEnv: ViteEnv, isBuild: boolean) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    React({
      fastRefresh: false,
    }),
  ];

  vitePlugins.push(configStyleImportPlugin(isBuild));
  vitePlugins.push(
    configInjectAssetsPathPlugin({
      assetsPath: '/app/marketing-tools-admin',
    }),
  );

  return vitePlugins;
}
