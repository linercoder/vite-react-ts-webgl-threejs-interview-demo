import type { PluginOption } from 'vite';

interface InjectAssetsPathOptions {
  assetsPath: string;
}

const configInjectAssetsPathPlugin = (options: InjectAssetsPathOptions): PluginOption => {
  return {
    // 插件名称
    name: 'vite-assets-path',

    // pre 会较于 post 先执行
    enforce: 'pre',

    // 指明它们仅在 'build' 或 'serve' 模式时调用
    apply: 'build',

    transformIndexHtml(html) {
      const res = html.replace(/\/assets\//g, `${options.assetsPath}/assets/`);
      return res;
    },
  };
};

export default configInjectAssetsPathPlugin;
