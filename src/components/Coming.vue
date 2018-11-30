<template>
<app-content :style="{top: '88px', bottom: '49px'}"  @loadmore="loadMoreData" :canLoadMore="canLoadMore">    
    <!-- 请求即将上映的电影数据 -->
    <div class="coming">
        <div v-for="(list,key) in comingMap" :key="key">
            <!-- 上映时间 -->
            <div class="coming-date">
                {{key}}
            </div>
            <ul> 
                <li v-for="item in list" :key="item.id" class="coming-item">
                    <!-- 图片 -->
                    <div class="item-img">
                        <img :src="item.img" alt="">
                    </div>
                    <!-- 电影名称  -->
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
                    <div class="item-wish" >
                        <span class="item-wish-peo">{{item.wish}}</span>
                        <span class="item-wish-txt">人想看</span>
                    </div>
                    <!-- 主演 -->
                    <div class="item-star">
                        <p>主演：{{item.star}}</p>
                    </div>
                    <!-- XXX上映 -->
                    <div class="item-ShowDate">
                        <p>{{item.rt}}上映</p>
                    </div>
                    <!-- 想看 或者 预售按钮 -->
                    <div class="item-orderBuy">
                        <span>预售</span>
                    </div>
                    <div class="item-wantSee">
                        <span>想看</span>    
                    </div>              
                </li>

            </ul>
        </div>
    </div>

</app-content>
</template>

<script>
import {getComingList, getMoreComingList} from '../services/movieService.js';

export default {
    data(){
        return{
            comingMap: {},
            canLoadMore: true,
            comingIDS:[],
            comingMovie: ''
        }
    },
    methods: {
        //加载更多数据
        loadMoreData(){
            let ids = [...this.comingIDS];
            ids = ids.splice(this.comingMovie.length, 10);
            let movieIds = ids.join(',');
            this.canLoadMore = false;
            getMoreComingList(movieIds).then(result=>{
                this.comingMap = Object.assign({}, this.comingMap, result);
                if(this.comingMovie.length >= this.comingIDS.length){
                    this.canLoadMore = false;
                }else{
                    this.canLoadMore = true;
                }
                console.log(this.comingMap);
            })
        }
    },

    created(){
        //初始化即将上映的数据
        getComingList().then(({data, ids, coming_movie})=>{
            this.comingMap = data;
            this.comingIDS = ids;
            this.comingMovie = coming_movie
        })
    }
}
</script>

<style lang="scss" scoped>
.coming-date{
    background: #f40;
}
.coming-item{
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
        .item-wish{
        margin-left: 78px;
        margin-top: 4px;
        .item-wish-txt{
            font-size: 13px;
        }
        .item-wish-peo{
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
    .item-ShowDate{
        color: #666;
        margin-left: 78px;
        font-size: 12px;
    }
    .item-orderBuy{
        background: #3c9fe6;
    }
    .item-wantSee{
        background: #faaf00;
        display: none;
    }
    .item-orderBuy,.item-wantSee{
        // display: none;
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
