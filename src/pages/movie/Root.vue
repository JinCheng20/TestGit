<template>
<div class="page" id="movie">
    <!-- 公共头部 -->
    <app-header title="猫眼电影"></app-header>
    <!-- 子头部 -->
    <header class="sub-header">
        <!-- 地址定位 -->
        <span class="city-icon" @click="goCityList()">
            {{city}}
        </span>
        <!-- 正在热映 和 即将上映切换 -->
        <nav class="nav">
            <li v-for="(navItem, index) in navList" :key="index"
                :class="{active: navIndex==index}" @click="navAction(index)">
                {{navItem}}
            </li>
        </nav>
        <!-- 放大镜图标 -->
        <span class="search-icon" @click="movieSearchAction()">
            <img src="../../assets/search.png"/>
        </span>
    </header>
          
    <keep-alive>      
        <playing v-if="navIndex==0"></playing>    
        <coming v-if="navIndex==1"></coming>    
    </keep-alive>
    <router-view></router-view>
        
</div>
</template>

<script>
import Playing from '../../components/Playing'
import Coming from '../../components/Coming'
import {mapState} from 'vuex'
export default {
    components: {
        'playing': Playing,
        'coming': Coming
    },
    data(){
        return {
            navList: ['正在热映', '即将上映'],
            navIndex: 0,
        }
    },
    computed: {
        ...mapState(['city'])
    },
    methods: {
        navAction(index){
            this.navIndex = index;
        },
        //进入选择城市列表
        goCityList(){
            this.$router.push('/movie/citylist');
        },
        //电影搜索
        movieSearchAction(){
            this.$router.push('/movie/movie-search');
        }
    }
    //但是请求次数过多时候会导致代码量过多，不利于维护，性能和编写
    //所以需要把请求数据封装起来 在created()方法进行调用即可
    //优点1：简化组件的代码 让组件的逻辑 结构看起来更加清晰
    //优点2：有利于复用性（多个地方需要请求数据时候调用即可 不用重复书写代码）
}
</script>
<style lang="scss" scoped>
.sub-header{
    width: 100%;
    height: 44px;
    border-bottom: 1px solid #e6e6e6;
    position: absolute;
    left: 0;
    top: 44px;
    color: #666;
    font-size: 14px;
    display: flex;
    .city-icon{
        flex: 1;
        text-align: center;
        line-height: 44px;
        &::after{
            content: '';
            display: inline-block;
            width: 0;
            height: 0;
            border: 6px solid transparent;
            border-top: 6px solid #666;
            transform: translateY(4px);
        }
    }
    .nav{
        width: 60%;
        display: flex;
        li{
            flex: 1;
            text-align: center;
            line-height: 44px;
            font-weight: bold;
            &.active{
                color: #f03d37;
                border-bottom: 2px solid #f03d37;
            }
        }
    }
    .search-icon{
        flex: 1;
        img{
            width: 24px;
            margin: 10px auto;
        }
    }
}
</style>
