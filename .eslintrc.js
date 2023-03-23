/**
 * @description 该插件主要为了方便配置Eslint，有属性提示
 * @description 弃用的属性警告
 */

//@ts-check
const { defineConfig } = require('eslint-define-config');
module.exports = defineConfig({
  // 禁止继续查找父级目录
  root: true,
  // 支持环境
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  // 共享设置
  settings: {
    react: {
      flowVersion: '0.53',
      version: 'detect',
    },
  },
  // Eslint默认处理es5,使用该配置修改相关配置
  parserOptions: {
    // 指定解析器
    parser: '@typescript-eslint/parser',
    // 指定ES版本
    ecmaVersion: 2020,
    // 设置源类型，为module （代码是模块化）
    sourceType: 'module',
    jsxPragma: 'React',
    // 使用额为的语言特性
    ecmaFeatures: {
      jsx: true,
    },
  },
  // 继承别的规则
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  // 规则
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    // 关闭要求在函数和类方法上有明确的返回类型
    '@typescript-eslint/explicit-function-return-type': 'off',
    // 关闭不允许使用any类型
    '@typescript-eslint/no-explicit-any': 'off',
    // 关闭不允许使用require语句，除非在导入语句中。
    '@typescript-eslint/no-var-requires': 'off',
    // 关闭不允许空函数
    '@typescript-eslint/no-empty-function': 'off',
    // 关闭强制自定义大小写
    'vue/custom-event-name-casing': 'off',
    // 关闭禁止在变量定义之前使用它们
    'no-use-before-define': 'off',
    // 关闭TS下变量被定义之前，不允许使用这些变量
    '@typescript-eslint/no-use-before-define': 'off',
    // 关闭禁止使用@ts-<指令>注释，或要求在指令后进行描述
    '@typescript-eslint/ban-ts-comment': 'off',
    // 关闭禁止使用特定类型
    '@typescript-eslint/ban-types': 'off',
    // 关闭不允许使用！后缀操作符的非空断言。
    '@typescript-eslint/no-non-null-assertion': 'off',
    // 关闭要求在导出的函数和类的公共类方法上明确返回和参数类型
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // TS下打开不允许未使用的变量(并且阻止代码运行)
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        // 指定字符不需要检测
        argsIgnorePattern: '^_',
        // 指定正则匹配字不检测
        varsIgnorePattern: '^_',
      },
    ],
    // 开不允许未使用的变量(并且阻止代码运行)
    'no-unused-vars': [
      'error',
      {
        // 指定字符不需要检测
        argsIgnorePattern: '^_',
        // 指定正则匹配字不检测
        varsIgnorePattern: '^_',
      },
    ],
    // 关闭强制在 function的左括号之前使用一致的空格
    'space-before-function-paren': 'off',

    // 关闭防止缺少displayName命名
    'react/display-name': 'off',
    // 防止 JSX 上下文提供程序值采用会导致不必要的重新渲染的值。
    'react/jsx-no-constructed-context-values': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 0,
  },
});
