<template>
    <div class="newsInfo_container">
        <h4 class="title" v-html="newsInfo.title"></h4>
        <p class="subTitle">
            <span>发表时间: <span>{{newsInfo.add_time | dateFormate("YYY-MM-DD")}}</span></span>
            <span>点击次数 <span v-html="newsInfo.click"></span></span>
        </p>
        <hr>
        <div v-html="newsInfo.content">

        </div>
        <!-- 调用子组件 -->
        <comment :id="id"></comment>
    </div>
</template>

<script>
    //导入子组件
    import comment from "../subcomponents/comment.vue"
    export default {
        name: "newsInfo",
        //定义子组件
        components:{
            comment,

        },
        data(){
            return {
                id:this.$route.params.id,
                newsInfo:{}
            }
        },
        methods:{
            getNewsInfo(){
                this.$http.get("http://www.liulongbin.top:3005/api/getnew/"+this.id).then(result=>{
                    if(result.body.status===0){
                        this.newsInfo = result.body.message[0];
                    }
                })
            },

        },
        created(){
            this.getNewsInfo();
        }
    }
</script>

<style scoped lang="less">
    .newsInfo_container{
        padding: 0px 5px;
        .title{
            font-size: 16px;
            text-align: center;
            color:red;
            margin: 15px 0px;
        }
        .subTitle{
            display: flex;
            justify-content: space-between;
            color:blue;

        }
    }
</style>