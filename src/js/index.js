//导入vue
import Vue from "vue"

// //全局配置请求根路径
// Vue.http.options.root = "http://www.liulongbin.top:3005"
// //全局配置表单数据格式为普通表单格式
// Vue.http.options.emulateJSON = true;

import "../css/app.less"
//导入公共组件
import app from "../app.vue"
//导入路由模块
import router from "../router.js"
//导入mui模块
import "../lib/mui/css/mui.min.css"
import "../lib/mui/css/icons-extra.css"//mui扩展的图标
//导入时间插件
import moment from "moment"
Vue.filter("dateFormate",function (dateStr,patern) {
    //参数 需要格式化的时间数据   时间的格式
    return moment(dateStr).format(patern="YYYY-MM-DD HH:mm:ss")
})
// import "../lib/mui/js/mui.min.js"
//导入mint-UI
import mintUI from "mint-ui"
import "mint-ui/lib/style.min.css"
Vue.use(mintUI)
//导入vue-resource模块
import VueResource from "vue-resource"
//图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
Vue.use(VuePreview, {
    mainClass: 'pswp--minimal--dark',
    barsSize: {top: 0, bottom: 0},
    captionEl: false,
    fullscreenEl: false,
    shareEl: false,
    bgOpacity: 0.85,
    tapToClose: true,
    tapToToggleControls: false
})



Vue.use(VueResource)
let vm = new Vue({
    el:"#app",
    render:c=>c(app),
    router,
})
