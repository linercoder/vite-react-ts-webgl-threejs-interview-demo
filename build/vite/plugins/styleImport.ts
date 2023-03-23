import vitePluginImp from 'vite-plugin-imp';

/**
 * 用于按需导入组件库样式
 */
export function configStyleImportPlugin(_isBuild: boolean) {
  if (!_isBuild) {
    return [];
  }

  const styleImportPlugin = vitePluginImp({
    libList: [
      {
        libName: 'antd',
        style(name) {
          return `antd/es/${name}/style/index.js`;
        },
      },
    ],
  });

  return styleImportPlugin;
}
