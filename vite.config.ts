import type { UserConfig, ConfigEnv } from 'vite';

import { loadEnv } from 'vite';
import { resolve } from 'path';
import { readAllEnv } from './build/utils';
import { createProxy } from './build/vite/proxy';
import { createVitePlugin } from './build/vite/plugins';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';
  const rootPath = process.cwd();
  const env = loadEnv(mode, rootPath);
  const viteEnv = readAllEnv(env);

  const { VITE_PORT, VITE_PROXY_LIST, VITE_PUBLIC_PATH } = viteEnv;

  return {
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: [
        {
          find: '@',
          replacement: pathResolve('src') + '/',
        },
        {
          find: '#',
          replacement: pathResolve('types') + '/',
        },
      ],
    },

    css: {
      preprocessorOptions: {
        less: {
          // 支持内联 Javascript
          javascriptEnabled: true,
          additionalData: `@import "${resolve(__dirname, 'src/assets/styles/variable.less')}";`,
          modifyVars: {
            'primary-color': '#0077FF',
            'link-color': '#0077FF',
          },
        },
      },
    },

    plugins: createVitePlugin(viteEnv, isBuild),

    server: {
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY_LIST),

      hmr: {
        protocol: 'ws',
        host: '127.0.0.1',
      },
    },

    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: 'dist',
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000,
    },
  };
};
