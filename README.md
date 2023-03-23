# 使用当前模版注意事项

1. 里面涉及到的 test 字样都是测试文件，开发业务的时候请修改为业务命名

2. 发现 bug 可以在飞书群里交流，可以自己在当前项目里面解决了之后，集成到当前模版里面来，并且修改版本号。

3. 有特殊功能要新增必须为当前功能写下对应的 README

# 当前项目功能

- 基于 axios 封装的自定义请求 （后期逐渐完善，暂时起一个头而已）

# 项目配置

.env 文件，用于存储变量配置。该文件中可以定义项目中需要的各种基础变量

.env.development 文件，基于.env 基础变量集成的 development 环境的环境变量
pmpm dev 启动

.env.production 文件，基于.env 基础变量集成的 production 环境的环境变量
pnpm pro 启动

.env.test 文件，基于.env 基础变量集成的 test 环境的环境变量
pnpm test 启动

# laus.config.json 配置

当前脚本用于解决内部方便替换新的本地场景数据 🚀

👨‍💻 用法

安装

# 安装包 local-auto-update-scene

pnpm install local-auto-update-scene

准备配置
在项目的根目录位置建立一个 laus.config.json 文件，并且在文件内写入对应的参数

{
"sceneUrl": "",
"sceneStaticPath": ""
}
sceneUrl：我们的请求场景的 url 。
sceneStaticPath：是我们要在项目里面引入的本地场景数据文件地址。

构建
在和构建的命令行前面写入 laus 也是就是我们执行更新场景数据的命令。例如：

"build": "laus && pnpm build"
然后在服务器构建的时候就会自动更新我们本地的场景数据了。

注意 🌟
如果在本地单独执行 laus 的话会可能触发一个 commit。需要记得提交

# styles 集成方案
styles/global.less 去除默认的css样式
styles/index.less 集成基础通用组合样式类
