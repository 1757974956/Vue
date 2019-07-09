<template>
    <div class="app-content">
        <mt-header fixed title="vue"></mt-header>
        <transition>
            <router-view></router-view>
        </transition>



        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item-my" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>

            <router-link class="mui-tab-item-my" to="/shopCar">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item-my"  to="/member">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">9</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>

            <router-link class="mui-tab-item-my"  to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "app"
    }
</script>

<style scoped>
    .app-content{
        padding-top:40px;
        overflow: hidden;
        padding-bottom:50px;
    }
    .v-enter{
        opacity: 0;
        transform: translateX(100%);

    }
    .v-leave-to{
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;
    }
    .v-enter-active,.v-leave-active{
        transition: all 2s  ;
    }
    /*修改样式*/

    .mui-bar-tab .mui-tab-item-my {
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

    .mui-bar-tab .mui-tab-item-my .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .mui-bar-tab .mui-tab-item-my .mui-icon ~ .mui-tab-label {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .mui-bar-tab .mui-tab-item-my.mui-active {
        color: #007aff;
    }


</style>