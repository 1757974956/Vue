<template>
    <div class="sub_container">
        <h4>发表评论</h4>
        <hr>
        <textarea placeholder="请输入评论内容(最多吐槽120字)" maxlength="120" v-model="msg"></textarea>

        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="list" v-for="(item,i) in list" :key="item.id">
            <div class="user">
                第{{i+1}}楼   用户 : {{item.user_name}}
                发表时间  : {{item.add_time | dateFormate("YYY-MM-DD")}}
            </div>
            <div class="body" >
                {{item.content}}
            </div>
        </div>
        <!--加载更多-->
        <mt-button type="danger" size="large" plain @click="getMore">
            加载更多
        </mt-button>

    </div>
</template>

<script>
    import {Toast} from  "mint-ui"
    export default {
        name: "comment",
        data(){
            return{
                list:[],
                msg:"",
                pageIndex:1,
            }

        },
        props:["id"],
        methods:{
            getComment(){
                console.log(this.id);
                this.$http.get("http://www.liulongbin.top:3005/api/getcomments/"+this.id+"?pageindex="+this.pageIndex).then(result=>{
                    console.log(result);
                    if (result.body.status===0){
                        this.list=result.body.message;
                        this.list=this.list.concat(result.body.message)
                    }
                })
            },
        //    点击发表评论
            postComment(){
                if(this.msg.trim().length==0){
                    Toast("内容不能为空");
                    return false
                }
                //参数  地址  交给服务器的数据格式{content ：this.msg}   定义提交表格的格式
                this.$http.post("http://www.liulongbin.top:3005/api/postcomment/"+this.id,{content:this.msg},{emulateJSON:true},).then(result=>{
                    if (result.body.status===0){

                        //拼接处评论对象
                        let user ={
                            user_name :"匿名用户",
                            add_time:Date.now(),
                            content:this.msg ,
                        }
                        this.list.unshift(user);
                        this.msg="";
                    }
                })
            },
            //点击加载更多
            getMore(){
                this.pageIndex++;
                this.getComment();
            }
        },
        created(){
            this.getComment();
        }
    }
</script>

<style scoped lang="less">
    .sub_container{
        textarea{
            height: 80px;
            margin: 0;
            font-size:14px;
        }
        .list{
            margin: 5px 0px;
            .user{
                line-height: 30px;
                background-color: #ccc;
                font-size: 14px;
            }
            .body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
</style>