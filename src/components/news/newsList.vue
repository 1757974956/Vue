<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in list" >
                <router-link :to="'/home/newsInfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <p style="font-weight: bolder;color: #000;">{{item.title}}</p>
                        <p class="mui-ellipsis mui-pull-left"><a href="" style="font-size: 12px;">发表时间{{item.add_time | dateFormate("YYY-MM-DD")}}</a></p>
                        <p class="mui-ellipsis mui-pull-right"><a href="" style="font-size: 12px;">点击次数{{item.click }}</a></p>

                    </div>
                </router-link>
            </li>
        </ul>

    </div>
</template>
<script>

    export default {
        name: "newsList",
        data(){
         return {
             list:[]
         }
        },
        // filters:{
        //     'data':function (data) {
        //         let date=new Date(data);
        //         let h=date.getHours().toString().padStart(2,'0');
        //         let m=(date.getMonth()+1).toString().padStart(2,'0');
        //         let s=date.getSeconds().toString().padStart(2,'0');
        //         let y=date.getFullYear();
        //         let d=date.getDate().toString().padStart(2,'0');
        //         let mi=date.getMinutes().toString().padStart(2,'0');
        //         // return y+"-"+m+"-"+d +""+ h+":"+mi+":"+s;
        //         return `${y}-${m}-${d}   ${h}:${mi}:${s}`;
        //     }
        // },

        methods:{
            news(){
                this.$http.get("http://www.liulongbin.top:3005/api/getnewslist").then(result=>{
                    console.log(result);
                    if (result.body.status===0){
                        this.list=result.body.message;
                    }
                })
            },
        },
        created(){
            this.news();
        }
    }
</script>

<style scoped>

</style>