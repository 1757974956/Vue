//由于webpack是基于nide构建的，所有在配置文件时，任何合法的node代码都是支持的
//1.导入路径模板
const path =require('path');

//导入在内存中生成html页面的插件
const htmlWebpackPlugin = require("html-webpack-plugin")

//2.通过node中模块操作，向外暴露一个配置对象
module.exports = {
    //配置打包的默认开发模式
    mode:'development',
    //配置入口路径：要打包的文件
    entry:path.join(__dirname,'./src/js/index.js'),
    //配置出口路径：指定打包好了的文件
    /* output:path.join(__dirname,'./dist'),//指定输出的路径*/
    output:{
        path:path.join(__dirname,'./dist'),//指定输出的路径
        filename:'main.js',//指定输出文件的名字
    },
    //配置dev-server参数 方法2
    // devServer:{
    //     open:true,//自动打开
    //     port:3000,//设置端口号
    //     hot:true//启用热更新
    // }

    //配置插件 -->所有webpack的插件都配置在这里
    plugins:[
        //创建一个在内存生成html的插件

        //插件的作用
        // 自动在内存中根据指定页面生成了一个内存的页面
        //自动把打包好的main.js追加到内存中
        new htmlWebpackPlugin({
            //指定模板文件的路径
            template:path.join(__dirname,"./src/index.html"),
            //设置生成内存页面的名称
            filename:"index.html",
        })
    ],
    //配置第三方loader模块
    module:{
        //第三方模块的匹配规则
        rules:[
            {test:/\.css$/,use:["style-loader","css-loader"]},//处理css文件的转换
            {test:/\.less$/,use:["style-loader","css-loader","less-loader"]},
            {test:/\.scss$/,use:["style-loader","css-loader","sass-loader"]},
            {test:/\.(jpg|png|gif|jpeg)$/,use:"url-loader?limit=6219&name=[hash:8].[ext]"},
            //base64格式的图片能减少二次请求,只有小图片才能转
            //设置图片大小的限制  传参  ?limit=图片大小字节   当图片字节 > 设置的字节  转哈希值
            // 当图片字节 > 设置的字节  转base64格式
            // 如果想用 自己图片的名字 ,家第二个参数  &name=[name].[ext]
            //为防止图片重名被覆盖再加一个hash值 &name=[hash:8].[ext]
            //hash值有唯一性 ,两个数据的hash值不可能相同 最对32位
            {test:/\.(ttf|eot|svg|woff|woff2)$/,use:"url-loader"},
            // 配置babel来转换高级js语法
            //在配置时必须要把node_modules目录排除在外  babel会把node_modules所有的js文件全部都打包编译,会消耗电脑CPU,打包速度缓慢, 不排除会报错,无法运行
            //在项目的根目录中新建 .babelrc文件, 相当于json文件,配置相关的babel参数
            {test:/\.js$/,use:"babel-loader",exclude:/node_modules/},
            //处理.Vue的文件
            {test:/\.vue$/,use:"vue-loader"}
        ]
    },
    //配置修改路径
    resolve:{
        //修改Vue被导入时的路径
        alias:{
            "vue$":"vue/dist/vue.js"
        }
    }
}
