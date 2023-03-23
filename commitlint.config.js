module.exports = {
  // ↓忽略包含init的提交消息
  ignores: [(commit) => commit.includes('init')],
  // ↓按照传统消息格式来验证
  extends: ['@commitlint/config-conventional'],
  // 自定义解析器
  parserPreset: {
    // 解析器配置
    parserOpts: {
      // commit 提交头的规则限制
      headerPattern: /^(\w*|[\u4e00-\u9fa5]*)(?:[\(\（](.*)[\)\）])?[\:\：] (.*)/,
      // 匹配分组
      headerCorrespondence: ['type', 'scope', 'subject'],
      // 引用
      referenceActions: [
        'close',
        'closes',
        'closed',
        'fix',
        'fixes',
        'fixed',
        'resolve',
        'resolves',
        'resolved',
      ],
      // 对应issue要携带#符号
      issuePrefixes: ['#'],
      // 不兼容变更
      noteKeywords: ['BREAKING CHANGE'],
      fieldPattern: /^-(.*?)-$/,
      revertPattern: /^Revert\s"([\s\S]*)"\s*This reverts commit (\w*)\./,
      revertCorrespondence: ['header', 'hash'],
      warn() {},
      mergePattern: null,
      mergeCorrespondence: null,
    },
  },
  // ↓自定义提交消息规则
  rules: {
    // ↓body以空白行开头
    'body-leading-blank': [2, 'always'],
    // ↓footer以空白行开头
    'footer-leading-blank': [1, 'always'],
    // ↓header的最大长度
    'header-max-length': [2, 'always', 108],
    // ↓subject为空
    'subject-empty': [2, 'never'],
    // ↓type为空
    'type-empty': [2, 'never'],
    // ↓type的类型
    'type-enum': [
      2,
      'always',
      [
        'feat', // 在原有逻辑之上添加的新的功能模块或者新的代码
        'fix', // 修复已存在逻辑的缺陷
        'style', // 样式相关的更改
        'doc', // 增删改文档类型的文件
        'test', // 试验相关的代码或者测试代码
        'refactor', // 在原有的逻辑上改变逻辑或者修改原逻辑代码
        'ci', // 持续集成配置相关的增删改
        'dead', // 删除无用的代码或者废弃的逻辑
        'comment', // 在代码添加注解、注释、等标注性信息
        'hotfix', // 用于生产版本的紧急修复提交
        'init', //  用于初始化项目的提交
        'depend', // 用于项目依赖任何变动的提交
        'config', // 用于任何一切和项目配置有关的变动（ci 配置除外）
        'version', // 用于提交一个版本的更新标记
        'type', // 用于增删改查任何关于任何类型的提交
      ],
    ],
  },
};
