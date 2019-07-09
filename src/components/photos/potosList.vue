<template>
    <div>
        <!--顶部滑动区域-->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl"
                 class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted mui-scroll-wrapper">
                <div class="mui-scroll">
                    <a :class='["mui-control-item",item.id==0?"mui-active":""]'
                       v-for="item in cates" :key="item.id"
                       @click="getPhotoListByCateId(item.id)">
                        {{ item.title}}
                    </a>
                </div>
            </div>

        </div>

        <!--6. 去index.js导入图片懒加载模块-->
        <!--图片列表区域-->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoInfo/'+item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    //导入子组件
    // import

    // 1. 导入 mui 的js文件
    import mui from "../../lib/mui/js/mui.min.js";
    //报错. 主要通过插件工具去除严格模式
    export default {
        name: "photoList",
        mounted() {
            // 2. 初始化滑动控件
            mui(".mui-scroll-wrapper").scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        data() {
            return {
                cates: [], // 所有分类的列表数组
                list: [] // 图片列表的数组
            };
        },
        methods: {
            //4.获取所有的图片分类
            getAllCategory() {
                // 获取所有的图片分类
                this.$http.get("http://www.liulongbin.top:3005/api/getimgcategory").then(result => {
                    console.log(result);
                    if (result.body.status === 0) {
                        // 手动拼接出一个最完整的 分类列表
                        result.body.message.unshift({title: "全部", id: 0});
                        this.cates = result.body.message;
                    }
                });
            },
            //7.根据id获取图文列表
            getPhotoListByCateId(cateId) {
                // 根据 分类Id，获取图片列表
                this.$http.get("http://www.liulongbin.top:3005/api/getimages/" + cateId).then(result => {
                    console.log(result);
                    if (result.body.status === 0) {
                        this.list = result.body.message;
                    }
                });
            }
        },
        created() {
            this.getAllCategory();
            //刷新时触发图片列表
            this.getPhotoListByCateId(0);

        }
    }
</script>

<style scoped lang="scss">
    * {
        touch-action: pan-y;
    }

    .photo-list {
        list-style: none;
        margin: 0;
        padding: 10px;
        padding-bottom: 0;

        li {
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10px;
            box-shadow: 0 0 9px #999;
            position: relative;

            img {
                width: 100%;
                //vertical-align: middle;
                display: block;
            }
            /*懒加载图片样式*/
            img[lazy="loading"] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
            .info {
                color: white;
                text-align: left;
                position: absolute;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.4);
                max-height: 84px;
                .info-title {
                    font-size: 14px;
                }
                .info-body {
                    font-size: 13px;
                }
            }

        }
        .mui-slider {
            position: fixed;
            z-index: 1111;
            overflow: hidden;
            width: 100%;
        }
    }


</style>