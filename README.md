# 活动仓库-all in one

用PNPM管理依赖，都放在一个仓库

pnpm文档：https://www.pnpm.cn/

安装全部依赖：
````
pnpm install
````

安装公用依赖：
````
pnpm add <node-module> -w
````

安装依赖到package：
````
pnpm add <node-module> --filter <project-name>
````

运行package： 
````
cd packages/<project-path>
pnpm run <script-name>
````

本地依赖:
执行
````
pnpm i @mono/utils -r
````
或
````
pnpm i @mono/utils -r --filter @mono/<project-name>
````
设置局部依赖。
或者直接在项目packages.json中添加依赖
````json
"dependencies": {
  "@mono/utils": "workspace:^1.0.0"
},
````
再pnpm install

命名：
新建项目到package，package.json改一下name；
新建组件到components，命名时带上vue2，vue3，react等框架标识；

关于sdk：
在package中用rollup新建一个项目，后续h5直接import吧，不用cdn引入了。

目录
[./Contents.md](./Contents.md)

