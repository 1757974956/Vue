//导入vue模块
import Vue from "vue"
//导入路由模块
import VueRouter from "vue-router"
//安装路由
Vue.use(VueRouter)
//导入对应的路由组件
import Home from "./components/tableBar/home.vue"
import Member from "./components/tableBar/member.vue"
import ShopCar from "./components/tableBar/shopCar.vue"
import Search from "./components/tableBar/search.vue"
import NewList from "./components/news/newsList.vue"
import NewsInfo from "./components/news/newsInfo.vue"
import PhotosList from "./components/photos/potosList.vue"
import PhotoInfo from "./components/photos/photoInfo.vue"

//创建路由对象
let router = new VueRouter({
    linkActiveClass:"mui-active",
    routes:[
        {path:"/home",component:Home},
        {path:"/",redirect:"/home"},
        {path:"/member",component:Member},
        {path:"/shopCar",component:ShopCar},
        {path:"/search",component:Search},
        {path:"/home/newsList",component:NewList},
        {path:"/home/newsInfo/:id",component:NewsInfo},
        {path:"/home/photosList",component:PhotosList},
        {path:"/home/photoInfo/:id",component:PhotoInfo},
]
})

//暴露路由对象
export default router;

