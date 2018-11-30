<template>
<!-- <app-content :style="{top: '88px', bottom: '49px'}" @loadmore="loadMoreData" :canLoadMore="canLoadMore"> -->
<app-content :style="{top: '88px', bottom: '49px'}" @loadmore="loadMoreData" :canLoadMore="canLoadMore">    
    <!-- 请求正在热映的电影数据 -->
    <ul class="playing">
        <li class="playing-item" v-for="(item,index) in playingList" :key="index" @click="detailAction(index)">
            <!-- 图片 -->
            <div class="item-img">
                <img :src="item.img" alt="">
            </div>
            <!-- 电影名称 -->
            <div class="item-title">
                <h3 style="display:inline-block">{{item.nm}}</h3>
                <!-- 电影是否v3d imax -->
                <span class="item-version" v-if="item.version == 'v3d imax'"> 
                </span>
                <!-- 电影是否v2d imax -->
                <span class="item-version2" v-if="item.version == 'v2d imax'"> 
                </span>                
            </div>
            <!-- 观众评分 或者 XXX人想看 -->
            <div class="item-score" :class="{active: item.globalReleased == true}">
                <span class="item-score-txt">观众评分</span>
                <span class="item-score-con">{{item.sc}}</span>
            </div>
            <div class="item-wish" :class="{active: item.globalReleased == false}">
                <span class="item-wish-peo">{{item.wish}}</span>
                <span class="item-wish-txt">人想看</span>
            </div>
            <!-- 主演 -->
            <div class="item-star">
                <p>主演：{{item.star}}</p>
            </div>
            <!-- 放映信息 -->
            <div class="item-showInfo">
                <span>{{item.showInfo}}</span>
            </div>
            <!-- 购票或者预售 -->
            <div class="item-buy" 
            :class="{active: item.globalReleased == true}">
                <span>购票</span>
            </div>
            <div class="item-order"
            :class="{active: item.globalReleased == false}">
                <span>预售</span>
            </div>
        </li>
    </ul>
</app-content>
</template>

<script>
import {getPlayingList, getMorePlayingList, getMovieDetail, getMovieInfo} from '../services/movieService.js'
export default {
    data(){
        return{
            movieTitle: '11',
            playingList: [],
            playingIDS: [],
            canLoadMore: true,
            movieDetailId: [],
            detailList: [],
            time: Date.now(),
            movieId: '',
            cityId: ''
        }
    },
    /*created(){
        getPlayingList().then(result=>{
            this.playingList = result;
            // 数据渲染要经过beforeUpdate updated阶段
            // 而这里是created阶段 所以不能在这时候刷新滚动视图
            // 但是每次数据刷新都会调用updated方法 放在updated方法里面每次都会执行 浪费性能
            // 数据变化执行顺序
            // watch -> beforeUpdate -> updated -> nextTick
            // 但是这样的话还是会导致上面那种老问题- - 所以可以考虑直接在Content页面刷新视图
            // this.$nextTick(()=>{
            //     //刷新滚动视图
            //     //Content.vue组件内部通过ref=content获得的是div标签 外部获得的是组件对象
            //     this.$refs.content.refresh();
            // })
        })
    },*/
    methods: {
        //加载更多数据
        loadMoreData(){
            //取出ids
            let ids = [...this.playingIDS];
            ids = ids.splice(this.playingList.length, 10);
            //组装ids
            let movieIds = ids.join(',');
            // 发送请求
            this.canLoadMore = false;
            getMorePlayingList(movieIds).then(result=>{
                this.playingList = [...this.playingList, ...result];
                //判断是否可以继续加载更多
                if(this.playingList.length >= this.playingIDS.length){
                    //加载完毕
                    this.canLoadMore = false;
                }else{
                    //还可以继续加载
                    this.canLoadMore = true;
                }
            })
        },
        detailAction(index){
            //取得点击的电影的ID
            let detailId = this.playingIDS[index];
            this.$router.push(`/movie/detail/${detailId}`);
        }
    },
    created(){
        //初始化请求数据
        getPlayingList().then(({data, ids})=>{
            this.playingList = data;
            this.playingIDS = ids;
        })
    }  
}
</script>

<style lang="scss" scoped>
.playing-item{
    padding: 10px;
    border-bottom: 1px solid #e6e6e6;
    height: 90px;
    position: relative;
    .item-img{
        width: 64px;
        float: left;
        img{
            width: 100%;
        }
    }
    .item-title{
        color: #333;
        font-size: 14px;
        font-weight: 700;
        margin-left: 78px;
        .item-version{
            width: 56px;
            transform: translateY(1px);
            height: 15px;
            background-image: url(../assets/version-3D.png);
            background-position: 10px center;
            display: inline-block;
            background-repeat: no-repeat;
            background-size: contain;
        }
        .item-version2{
            width: 56px;
            transform: translateY(1px);
            height: 15px;
            background-image: url(../assets/version-2D.png);
            background-position: 10px center;
            display: inline-block;
            background-repeat: no-repeat;
            background-size: contain;
        }
    }
    .item-score,.item-wish{
        display: none;
        margin-left: 78px;
        margin-top: 4px;
        .item-score-txt,.item-wish-txt{
            font-size: 13px;
        }
        .item-score-con,.item-wish-peo{
            color: #faaf00;
            margin-left: 2px;
        } 
    }
    .item-star{
        margin-left: 78px;
        font-size: 13px;
        margin-top: 2px;
        width: 180px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .item-showInfo{
        font-size: 13px;
        margin-left: 78px;
    }
    .item-buy{
        background-color: #f03d37;
    }
    .item-order{
        background-color: #3c9fe6;
    }
    .item-buy,.item-order{
        display: none;
        text-align: center;
        color: #fff;
        line-height: 28px;
        width: 47px;
        height: 27px;
        border-radius: 4px;
        cursor: pointer;
        position: absolute;
        top: 50%;
        margin-top: -13px;
        right: 30px;
        font-size: 12px;
    }
    .active{
        display: block;   
    }
}

</style>
