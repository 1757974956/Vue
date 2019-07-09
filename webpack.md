



## 在网页中会引用哪些常见的静态资源？
+ JS
 - .js
+ CSS
 - .css  .less   .sass  .scss
+ Images
 - .jpg   .png   .gif   .svg
+ 字体文件（Fonts）
 - .svg   .ttf   .eot   .woff   .woff2

## 网页中引入的静态资源多了以后有什么问题？？？
1. 网页加载速度慢， 因为 我们要发起很多的二次请求；
2. 要处理错综复杂的依赖关系


## 如何解决上述两个问题
1. 合并、压缩、精灵图、图片的Base64编码
2. 使用webpack可以解决各个包之间的复杂依赖关系；

## 什么是webpack?
webpack 是前端的一个项目构建工具，它是基于 Node.js 开发出来的一个前端工具；

## 如何完美实现上述的2种解决方案

##### 使用Webpack， 是基于整个项目进行构建的；

+ 借助于webpack这个前端自动化构建工具，可以完美实现资源的合并、打包、压缩、混淆等诸多功能。
+ 根据官网的图片介绍webpack打包的过程
+ [webpack官网](https://www.webpackjs.com/)

## webpack安装的两种方式
1. 运行`npm i webpack -g`全局安装webpack，这样就能在全局使用webpack的命令
2. 在项目根目录中运行`npm i webpack`安装到项目依赖中

## 初步使用webpack打包构建列表隔行变色案例
1. 创建项目描述文件. 运行`npm init -y `初始化项目，使用npm管理项目中的依赖包 
2. 创建项目基本的目录结构`src  和  dist `,在src里新建index.html
3. 使用`npm i jquery -S`安装jquery类库
4. 创建`index.js`并书写各行变色的代码逻辑：
```
	// 导入jquery类库
    import $ from 'jquery'

    // 设置偶数行背景色，索引从0开始，0是偶数
    $('#list li:even').css('backgroundColor','lightblue');
    // 设置奇数行背景色
    $('#list li:odd').css('backgroundColor','pink');
```
5. 直接在页面上引用`index.js`会报错，因为浏览器不认识`import`这种高级的JS语法，需要使用webpack进行处理，webpack默认会把这种高级的语法转换为低级的浏览器能识别的语法；
6. 运行`webpack 入口文件路径 输出文件路径`对`index.js`进行处理：
```
webpack .\src\js\index.js -o .\dist\main.js 
```

7.而webpack4允许我们指定编译使用开发模式还是生产模式，这由mode这个配置来控制，value为枚举值：development/production，分别对应开发模式和生产模式（这个配置可以作为命令行的配置参数也可以作为配置文件中的一个配置项，默认值是production，即生产模式）。

```
设置打包模式为开发模式:  webpack .\src\js\index.js -o .\dist\main.js --mode development
```



## 使用webpack的配置文件简化打包时候的命令

1. 在项目根目录中创建`webpack.config.js`
2. 由于运行webpack命令的时候，webpack需要指定入口文件和输出文件的路径，所以，我们需要在`webpack.config.js`中配置这两个路径：
```
    // 导入处理路径的模块
    var path = require('path');

    // 导出一个配置对象，将来webpack在启动的时候，会默认来查找webpack.config.js，并读取这个文件中导出的配置对象，来进行打包处理
    module.exports = {
    	//配置打包模式为开发模式
   		 mode: 'development',
        entry: path.resolve(__dirname, 'src/js/index.js'), // 项目入口文件
        output: { // 配置输出选项
            path: path.resolve(__dirname, 'dist'), // 配置输出的路径
            filename: 'main.js' // 配置输出的文件名
        }
    }
```

## 实现webpack的实时打包构建

 

1. 由于每次重新修改代码之后，都需要手动运行webpack打包的命令，比较麻烦，所以使用`webpack-dev-server`来实现代码实时打包编译，当修改代码之后，会自动进行打包构建。
2. 由于依赖webpack, 要先在本地安装  `npm i webpack -D`
3. 运行`npm i webpack-dev-server --save-dev`安装到开发依赖
4. 安装完成之后，在命令行直接运行`webpack-dev-server`来进行打包，发现报错，此时需要借助于`package.json`文件中的指令，来进行运行`webpack-dev-server`命令，在`scripts`节点下新增`"dev": "webpack-dev-server"`指令，然后直接运行这个指令. `npm run dev`发现可以进行实时打包，但是dist目录下并没有生成main.js`文件，这是因为`webpack-dev-server`将打包好的文件放在了内存中
 + 把`main.js`放在内存中的好处是：由于需要实时打包编译，所以放在内存中速度会非常快
 + 这个时候访问webpack-dev-server启动的`http://localhost:8080/`网站，发现是一个文件夹的面板，需要点击到src目录下，才能打开我们的index首页，此时引用不到main.js文件，需要修改index.html中script的src属性为:`<script src="./main.js"></script>`
 + 为了能在访问`http://localhost:8080/`的时候直接访问到index首页，可以使用`--contentBase src`指令来修改dev指令，指定启动的根目录：
 ```
 "dev": "webpack-dev-server --contentBase src"
 ```
```
配置端口号  配置自动打开浏览器  配置热更新(减少不必要的更新,只更新修改过得)
"dev": "webpack-dev-server --open --port 3000 --contentBase src --hot"
```

 同时修改index页面中script的src属性为`<script src="main.js"></script>`

## 使用`html-webpack-plugin`插件配置启动页面
由于使用`--contentBase`指令的过程比较繁琐，需要指定启动的目录，同时还需要修改index.html中script标签的src属性，所以推荐大家使用`html-webpack-plugin`插件配置启动页面.
1. 运行`npm i html-webpack-plugin --save-dev`安装到开发依赖
2. 修改`webpack.config.js`配置文件如下：
```
    // 导入处理路径的模块
    var path = require('path');
    // 导入自动生成HTMl文件的插件
    var htmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
        entry: path.resolve(__dirname, 'src/js/index.js'), // 项目入口文件
        output: { // 配置输出选项
            path: path.resolve(__dirname, 'dist'), // 配置输出的路径
            filename: 'main.js' // 配置输出的文件名
        },
        plugins:[ // 添加plugins节点配置插件
            new htmlWebpackPlugin({
                template:path.resolve(__dirname, 'src/index.html'),//模板路径
                filename:'index.html'//自动生成的HTML文件的名称
            })
        ]
    }
```


## 实现自动打开浏览器、热更新和配置浏览器的默认端口号
**注意：热更新在JS中表现的不明显，可以从一会儿要讲到的CSS身上进行介绍说明！**
### 方式1：
+ 修改`package.json`的script节点如下，其中`--open`表示自动打开浏览器，`--port 4321`表示打开的端口号为4321，`--hot`表示启用浏览器热更新：
```
"dev": "webpack-dev-server --hot --port 4321 --open"
```

### 方式2：
1. 修改`webpack.config.js`文件，新增`devServer`节点如下：
```
devServer:{
        hot:true,
        open:true,
        port:4321
    }
```
2. 在头部引入`webpack`模块：
```
var webpack = require('webpack');
```
3. 在`plugins`节点下新增：
```
new webpack.HotModuleReplacementPlugin()
```

## 使用webpack打包css文件
1. 运行`npm i style-loader css-loader --save-dev`
2. 修改`webpack.config.js`这个配置文件：
```
module: { // 用来配置第三方loader模块的
        rules: [ // 文件的匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }//处理css文件的规则
        ]
    }
```
3. 注意：`use`表示使用哪些模块来处理`test`所匹配到的文件；`use`中相关loader模块的调用顺序是从后向前调用的；

## 使用webpack打包less文件
1. 运行`npm i less-loader less -D`
2. 修改`webpack.config.js`这个配置文件：
```
{ test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
```

## 使用webpack打包sass文件
1. 运行`npm i sass-loader node-sass --save-dev`
2. 在`webpack.config.js`中添加处理sass文件的loader模块：
```
{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
```

## 使用webpack处理css中的路径
1. 运行`npm i url-loader file-loader --save-dev`
2. 在`webpack.config.js`中添加处理url路径的loader模块：
```
{ test: /\.(png|jpg|gif)$/, use: 'url-loader' }
```
3. 可以通过`limit`指定进行base64编码的图片大小；只有小于指定字节（byte）的图片才会进行base64编码：
```
{ test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=43960(这里填写图片大小是多少字节的)' },
```

## 使用babel处理高级JS语法
1. 运行`npm i babel-core babel-loader babel-plugin-transform-runtime --save-dev`安装babel转换器的相关loader包
2. 运行`npm i babel-preset-env babel-preset-stage-0 --save-dev`安装babel转换的语法
3. 在`webpack.config.js`中添加相关loader模块，其中需要注意的是，一定要把`node_modules`文件夹添加到排除项：
```
{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
```
4. 在项目根目录中添加`.babelrc`文件，并修改这个配置文件如下：
```
{
    "presets":["env", "stage-0"],
    "plugins":["transform-runtime"]
}
```
5. **注意：之前语法插件`babel-preset-es2015`可以更新为`babel-preset-env`，它包含了所有的ES相关的语法；**
6. 报错,需要安装`npm i babel-loader@7 -D`



## 在webpack中配置.vue组件页面的解析

1. 运行`npm i vue -S`将vue安装为运行依赖；
2. 运行`npm i vue-loader vue-template-compiler -D`将解析转换vue的包安装为开发依赖；
3. 由于新版本不支持. 可以下载指定版本  `npm i vue-loader@14.2.2 -D`
4. 运行`npm i style-loader css-loader -D`将解析转换CSS的包安装为开发依赖，因为.vue文件中会写CSS样式；
5. 在`webpack.config.js`中，添加如下`module`规则：

```
module: {

    rules: [

      { test: /\.css$/, use: ['style-loader', 'css-loader'] },

      { test: /\.vue$/, use: 'vue-loader' }

    ]

  }

```

1. 创建`App.js`组件页面：

```
    <template>

      <!-- 注意：在 .vue 的组件中，template 中必须有且只有唯一的根元素进行包裹，一般都用 div 当作唯一的根元素 -->

      <div>

        <h1>这是APP组件 - {{msg}}</h1>

        <h3>我是h3</h3>

      </div>

    </template>



    <script>

    // 注意：在 .vue 的组件中，通过 script 标签来定义组件的行为，需要使用 ES6 中提供的 export default 方式，导出一个vue实例对象

    export default {

      data() {

        return {

          msg: 'OK'

        }

      }

    }

    </script>



    <style scoped>

    h1 {

      color: red;

    }

    </style>

```

1. 创建`main.js`入口文件：

```
    // 导入 Vue 组件

    import Vue from 'vue'



    // 导入 App组件

    import App from './components/App.vue'



    // 创建一个 Vue 实例，使用 render 函数，渲染指定的组件

    var vm = new Vue({

      el: '#app',

      render: c => c(App)

    });

```

## 在使用webpack构建的Vue项目中使用模板对象？

1. 在`webpack.config.js`中添加`resolve`属性：

```
resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  }
```





## 在vue组件页面中，集成vue-router路由模块

[vue-router官网](https://router.vuejs.org/)

1.安装路由

```
npm i vue-router -S
```



1. 导入路由模块：

```
import VueRouter from 'vue-router'

```

1. 安装路由模块：

```
Vue.use(VueRouter);

```

1. 导入需要展示的组件:

```
import login from './components/account/login.vue'

import register from './components/account/register.vue'

```

1. 创建路由对象:

```
var router = new VueRouter({

  routes: [

    { path: '/', redirect: '/login' },

    { path: '/login', component: login },

    { path: '/register', component: register }

  ]

});

```

1. 将路由对象，挂载到 Vue 实例上:

```
var vm = new Vue({

  el: '#app',

  // render: c => { return c(App) }

  render(c) {

    return c(App);

  },

  router // 将路由对象，挂载到 Vue 实例上

});

```

1. 改造App.vue组件，在 template 中，添加`router-link`和`router-view`：

```
    <router-link to="/login">登录</router-link>

    <router-link to="/register">注册</router-link>



    <router-view></router-view>

```



## 组件中的css作用域问题



## 抽离路由为单独的模块



## 使用 饿了么的 MintUI 组件

[Github 仓储地址](https://github.com/ElemeFE/mint-ui)

[Mint-UI官方文档](http://mint-ui.github.io/#!/zh-cn)

1.安装

```
npm i mint-ui -S
```

1. 导入所有MintUI组件：

```
import MintUI from 'mint-ui'

```

1. 导入样式表：

```
import 'mint-ui/lib/style.css'

```

1. 在 vue 中使用 MintUI：

```
Vue.use(MintUI)


```

1. 使用的例子：

```
<mt-button type="primary" size="large">primary</mt-button>

```



## 使用 MUI 组件

[官网首页](http://dev.dcloud.net.cn/mui/)

[文档地址](http://dev.dcloud.net.cn/mui/ui/)

1. 导入 MUI 的样式表：

```
import '../lib/mui/css/mui.min.css'

```

1. 在`webpack.config.js`中添加新的loader规则：

```
{ test: /\.(png|jpg|gif|ttf)$/, use: 'url-loader' }

```

1. 根据官方提供的文档和example，尝试使用相关的组件

2. 使用font-awesome字体图标库

   ```
   安装   npm install font-awesome
   ```

   ```
   导入   import 'font-awesome/css/font-awesome.css'
   ```

### 按需引入

借助 [babel-plugin-component](https://github.com/QingWei-Li/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

```
npm install babel-plugin-component -D
```

然后，将 .babelrc 修改为：

```
{
  "presets": [
    ["es2015", { "modules": false }]
  ],
  "plugins": [["component", [
    {
      "libraryName": "mint-ui",
      "style": true
    }
  ]]]
}
```

## Mint-UI中按需导入的配置方式



## 使用 MUI 代码片段

> 注意： MUI 不同于 Mint-UI，MUI只是开发出来的一套好用的代码片段，里面提供了配套的样式、配套的HTML代码段，类似于 Bootstrap； 而 Mint-UI，是真正的组件库，是使用 Vue 技术封装出来的 成套的组件，可以无缝的和 VUE项目进行集成开发；
> 因此，从体验上来说， Mint-UI体验更好，因为这是别人帮我们开发好的现成的Vue组件；
> 从体验上来说， MUI和Bootstrap类似；
> 理论上，任何项目都可以使用 MUI 或 Bootstrap，但是，MInt-UI只适用于Vue项目；

注意： MUI 并不能使用  npm 去下载，需要自己手动从 github 上，下载现成的包，自己解压出来，然后手动拷贝到项目中使用；

[官网首页](http://dev.dcloud.net.cn/mui/)

[文档地址](http://dev.dcloud.net.cn/mui/ui/)

1. 导入 MUI 的样式表：

```
import '../lib/mui/css/mui.min.css'

```

1. 在`webpack.config.js`中添加新的loader规则：

```
{ test: /\.(png|jpg|gif|ttf)$/, use: 'url-loader' }

```

1. 根据官方提供的文档和example，尝试使用相关的组件



## 将项目源码托管到gitHub中

1. 点击头像 -> 修改资料 -> SSH公钥 [如何生成SSH公钥](http://git.mydoc.io/?t=154712)
2. 创建自己的空仓储，使用 `git config --global user.name "用户名"` 和 `git config --global user.email ***@**.com` 来全局配置提交时用户的名称和邮箱
3. 使用 `git init` 在本地初始化项目
4. 使用 `touch README.md` 和 `touch .gitignore` 来创建项目的说明文件和忽略文件；
5. 开源项目都有一个开源协议. 复制LICENSE到自己的根目录去
6. 使用 `git add .` 将所有文件托管到 git 中
7. 使用 `git commit -m "init project"` 将项目进行本地提交
8. 使用 `git remote add origin 仓储地址`将本地项目和远程仓储连接，并使用origin最为远程仓储的别名
9. 使用 `git push -u origin master` 将本地代码push到仓储中



## App.vue 组件的基本设置

1. 头部的固定导航栏使用 `Mint-UI` 的 `Header` 组件；
2. 底部的页签使用 `mui` 的 `tabbar`;
3. 购物车的图标，使用 `icons-extra` 中的 `mui-icon-extra mui-icon-extra-cart`，同时，应该把其依赖的字体图标文件 `mui-icons-extra.ttf`，复制到 `fonts` 目录下！
4. 将底部的页签，改造成 `router-link` 来实现单页面的切换；
5. Tab Bar 路由激活时候设置高亮的两种方式：

- 全局设置样式如下：

```
 	.router-link-active{

      	color:#007aff !important;

    }

```

- 或者在 `new VueRouter` 的时候，通过 `linkActiveClass` 来指定高亮的类：

```
 	// 创建路由对象

    var router = new VueRouter({

      routes: [

        { path: '/', redirect: '/home' }

      ],

      linkActiveClass: 'mui-active'

    });

```



## 实现 tabbar 页签不同组件页面的切换

1. 将 tabbar 改造成 `router-link` 形式，并指定每个连接的 `to` 属性；
2. 在入口文件中导入需要展示的组件，并创建路由对象：

```
    // 导入需要展示的组件

    import Home from './components/home/home.vue'

    import Member from './components/member/member.vue'

    import Shopcar from './components/shopcar/shopcar.vue'

    import Search from './components/search/search.vue'



    // 创建路由对象

    var router = new VueRouter({

      routes: [

        { path: '/', redirect: '/home' },

        { path: '/home', component: Home },

        { path: '/member', component: Member },

        { path: '/shopcar', component: Shopcar },

        { path: '/search', component: Search }

      ],

      linkActiveClass: 'mui-active'

    });

```



## 使用 mt-swipe 轮播图组件

1. 假数据：

```
lunbo: [

        'http://www.itcast.cn/images/slidead/BEIJING/2017440109442800.jpg',

        'http://www.itcast.cn/images/slidead/BEIJING/2017511009514700.jpg',

        'http://www.itcast.cn/images/slidead/BEIJING/2017421414422600.jpg'

      ]

```

1. 引入轮播图组件：

```
<!-- Mint-UI 轮播图组件 -->

    <div class="home-swipe">

      <mt-swipe :auto="4000">

        <mt-swipe-item v-for="(item, i) in lunbo" :key="i">

          <img :src="item" alt="">

        </mt-swipe-item>

      </mt-swipe>

    </div>

  </div>

```



## 在`.vue`组件中使用`vue-resource`获取数据

1. 运行`npm i vue-resource -S`安装模块
2. 导入 vue-resource 组件

```
import VueResource from 'vue-resource'

```

1. 在vue中使用 vue-resource 组件

```
Vue.use(VueResource);
```

### 全局配置请求的根路径

```
Vue.http.options.root = 'http://www.liulongbin.top:3005';
```





## 使用mui的`tab-top-webview-main`完成分类滑动栏

### 兼容问题

1. 和 App.vue 中的 `router-link` 身上的类名 `mui-tab-item` 存在兼容性问题，导致tab栏失效，可以把`mui-tab-item`改名为`mui-tab-item1`，并复制相关的类样式，来解决这个问题；

```
    .mui-bar-tab .mui-tab-item1.mui-active {
      color: #007aff;
    }

    .mui-bar-tab .mui-tab-item1 {
      display: table-cell;
      overflow: hidden;
      width: 1%;
      height: 50px;
      text-align: center;
      vertical-align: middle;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #929292;
    }

    .mui-bar-tab .mui-tab-item1 .mui-icon {
      top: 3px;
      width: 24px;
      height: 24px;
      padding-top: 0;
      padding-bottom: 0;
    }

    .mui-bar-tab .mui-tab-item1 .mui-icon~.mui-tab-label {
      font-size: 11px;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
    }
```

1. `tab-top-webview-main`组件第一次显示到页面中的时候，无法被滑动的解决方案：

- 先导入 mui 的JS文件:

```
 import mui from '../../../lib/mui/js/mui.min.js'
```

- 在 组件的 `mounted` 事件钩子中，注册 mui 的滚动事件：

```
 	mounted() {
    	// 需要在组件的 mounted 事件钩子中，注册 mui 的 scroll 滚动事件
        mui('.mui-scroll-wrapper').scroll({
          deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
  	}
```

1. 滑动的时候报警告：`Unable to preventDefault inside passive event listener due to target being treated as passive. See https://www.chromestatus.com/features/5093566007214080`

```
解决方法，可以加上* { touch-action: none; } 这句样式去掉。
```

原因：（是chrome为了提高页面的滑动流畅度而新折腾出来的一个东西） http://www.cnblogs.com/pearl07/p/6589114.html
https://developer.mozilla.org/zh-CN/docs/Web/CSS/touch-action





## 移除严格模式

[babel-plugin-transform-remove-strict-mode](https://github.com/genify/babel-plugin-transform-remove-strict-mode)

## [vue-preview](https://github.com/LS1231/vue-preview)

一个Vue集成PhotoSwipe图片预览插件

