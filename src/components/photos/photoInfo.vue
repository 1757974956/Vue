<template>
    <div class="photoInfo_container">
       <h4 style="text-align: center;color:#26a2ff;">{{imgList.title}}</h4>
        <div style="overflow: hidden">
            <p class="mui-pull-left">发表时间 : {{imgList.add_time | dateFormate}}</p>
            <p class="mui-pull-right">点击次数 : {{imgList.click}}</p>
        </div>
        <hr>
        <!--缩略图-->
        <div class="thumbs">
            <vue-preview :slides="list" @close="getThunbs"></vue-preview>
        </div>
        <!--内容-->
        <div v-html="imgList.content" style="font-size: 12px;line-height: 30px">
        </div>
        <!--评论子组件-->
        <comment :id="id"></comment>
    </div>
</template>

<script>
    import comment from "../subcomponents/comment.vue"
    export default {
        name: "photoInfo",
        components:{
            comment,
        },
        data(){
          return{
              id:this.$route.params.id,
              list:[],//存放缩略图
              imgList:[],
          }
        },
        methods:{
            //获取缩略图
            getThunbs(){
                this.$http.get("http://www.liulongbin.top:3005/api/getthumimages/"+this.id) .then(result=>{
                    console.log(result);
                    if(result.body.status===0){
                        result.body.message.forEach(item=>{
                            item.msrc=item.src;
                           item.w=600;
                           item.h=400;
                            })
                        this.list = result.body.message;
                    }
                })

            },
            //图片详情
            getImgInfo(){
                this.$http.get("http://www.liulongbin.top:3005/api/getimageInfo/"+this.id).then(result=>{
                    console.log(result);
                    if (result.body.status===0){
                        this.imgList = result.body.message[0];
                    }
                })
            }
        },
        created(){
            this.getThunbs();
            this.getImgInfo();
        }
    }
</script>

<style scoped lang="less">

</style>