#用心去感受

##制作首页app组件
1.完成了header组件,使用mint-UI中的hader组件
2.制作底部tabbar区域,使用mui中的tabbar区域,运用到扩展图标的css样式,需要手动导入到index.js入口文件
3.在中间放置了router-view来展示路由匹配到的组件

##设置路由高亮
##改造tabbar中a标签为 router-link

##制作home页面
1.渲染轮播图 --获取数据,使用vue-resource.js  调用this.#http.get(接口地址).then(成功或失败的函数)
使用mui中的九宫格变为六宫格