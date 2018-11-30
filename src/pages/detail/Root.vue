<template>
    <div id="detail">
        <!-- 头部 -->
        <header class="top">
            <span class="btn-back" @click="backAction">返回</span>
            <h1 class="top-title">{{DetailList.nm}}</h1>
        </header>
        <!-- 详情页中间内容 -->
        <div class="detail-middle">
            <!-- 装详情页的模糊背景 -->
            <div class="bgimg">
                <img :src="DetailList.img" alt="">                
            </div>
            <!-- 电影图片 -->
            <div class="detail-img">
                <img :src="DetailList.img" alt="">
            </div>
            <!-- 电影名称 -->
            <div class="detail-name">
                {{DetailList.nm}}
            </div>
            <!-- 英文名 -->
            <div class="detail-enm">
                {{DetailList.enm}}
            </div>
            <!-- 评分 -->
            <div class="detail-score">
                {{DetailList.sc}}
            </div>
            <!-- 评分人数 -->
            <div class="detail-peo">
                {{DetailList.snum}}
            </div>
            <!-- 电影类型 -->
            <div class="detail-cat">
                {{DetailList.cat}}
            </div>
            <!-- 电影是否3d -->
            <div class="detail-version" v-if="DetailList.version == 'v3d imax'">
                <img src="../../assets/detail-3d.png" alt="">
            </div>
            <!-- 电影时长 地区 -->
            <div class="detail-timeInfo">
                <span>
                    {{DetailList.fra}}/{{DetailList.dur}}分钟
                </span>
            </div>
            <!-- 电影上映时间 -->
            <div class="showTime">
                {{DetailList.pubDesc}}
            </div>
            <!-- 电影详情页面点击进入按钮 -->
            <div class="detail-btn" @click="detailInfoAction">
                <span>
                    <img src="../../assets/right-btn.png" alt="">
                </span>
            </div>
        </div>

        <div class="ShowDeatil">
            <ul class="ShowDetail-date">
                <li v-for="(item, index) in showDays" :key="index">
                    {{item.date}}
                </li>
            </ul>
        </div>

        <div class="content">
                <li @click="allcityAction">{{defaultArea}}</li>
                <li @click="brandAction">{{defaultBrand}}</li>
                <li @click="specialAction" style="border-right:none">特色</li>
                <!-- 全城展示列表 -->
                <div class="allcity" v-if="content_city">
                    <div class="allcity-top">
                        <span @click="btnShop">商区</span>
                        <span @click="btnSubway">地铁站</span>
                    </div>
                    <ul class="allcity-content">
                        <div class="shop-con" >
                            <!-- 左边区/市/县/列表 与 地铁站列表的切换-->
                            <ul class="content-menu" >
                                <li v-for="(item,index) in CinemaAreaList" 
                                :key="index" @click="menuAction(index)" :class="{active: AreaSelectIndex == index}"
                                >
                                    {{item.name}}({{item.count}})
                                </li>
                            </ul>
                            <!-- 右边对应响应地区的详细信息 -->
                            <ul class="content-detail">
                                <li v-for="(item,index) in CinemaAreamsg.subItems" :key="index" 
                                @click="menuContentAction(item.id,item.name)" >
                                    {{item.name}}({{item.count}})
                                </li>
                            </ul>
                        </div>
                    </ul>
                </div>
                <!-- 品牌展示列表 -->
                <div class="allbrand" v-if="content_brand">
                    <ul style="overflow:auto;height:100%">
                        <li v-for="(item, index) in brandList" :key="index"
                        @click="branditemAction(item.id,item.name)">
                            {{item.name}}
                            <i>
                                {{item.count}}
                            </i>
                        </li>
                    </ul>
                    <!-- 特色展示列表 -->
                </div>
        </div>
        <div class="scroll-content" ref="content">
            <div class="wrap">
                <!-- 展示附近电影院 -->
                <div class="cinemaShowList">
                    <ul v-for="(item, index) in CinemaList" :key="index">
                        <li class="cinema-name">
                            {{item.nm}}
                        </li>
                        <li class="cinema-price">
                            {{item.sellPrice}}
                            <span class="cinema-price-txt">元起</span>
                        </li>
                        <li class="cinema-addr">
                            {{item.addr}}
                        </li>
                        <li class="cinema-distance">
                            {{item.distance}}
                        </li>
                        <div></div>
                        <li class="cinema-refuse" v-if="item.tag.allowRefund == 1">
                            退
                        </li>
                        <li class="cinema-refuse" v-if="item.tag.endorse == 1">
                            改签
                        </li>
                        <li class="cinema-snack"  v-if="item.tag.snack == 1">
                            小吃
                        </li>
                        <li class="lowPriceCard" v-if="item.tag.vipTag == '折扣卡'">
                            折扣卡
                        </li>

                    </ul>
                </div>
            </div>
        </div>

    <router-view></router-view>
    </div>
</template>

<script>

import axios from 'axios';
import { mapState } from "vuex";
import {CinemaSearch,CinemaMoreInfo } from '../../services/CinemaService.js'
import {getMovieDetail, getMovieInfo} from '../../services/movieService.js'
export default {
    name: 'movie-content',
    data(){
        return{
            DetailList: {},
            MovieInfoList: [],
            Movieid: '',
            showDays: [],

            disId: '',
            CinemaList: [],
            brandList: [],
            content_city: false,
            content_brand: false,
            //行政区列表
            CinemaAreaList: [],
            SubwayList: [],
            shop_subway_change: 0,
            CinemaAreamsg: [],
            AreaSelectIndex: 0,
            defaultArea: '全城',
            defaultBrand: '品牌'
        }
    },
    methods: {
        backAction(){
            this.$router.back();
        },
        detailInfoAction(){
            //进入更详细的影片详情页面
        this.$router.push(`/movie/detail/${this.Movieid}/detailInfo`)
        },

        allcityAction(){
            if(this.content_city == false){
                CinemaMoreInfo(this.$store.state.id)
                .then(data=>{
                    if(this.shop_subway_change == 0){
                        this.CinemaAreaList = data.data.district.subItems;
                        //同步切换
                        this.CinemaAreamsg = this.CinemaAreaList[this.AreaSelectIndex];                
                    }
                    else if(this.shop_subway_change == 1){
                        this.CinemaAreaList = data.data.subway.subItems;    
                        //同步切换
                        this.CinemaAreamsg = this.CinemaAreaList[this.AreaSelectIndex];
                    }
                })
                this.content_brand = false;
                this.content_city = true;
                }else if(this.content_city == true){
                this.content_city = false;
                }
        },
    //品牌
    brandAction(){
        CinemaMoreInfo(this.$store.state.id)
        .then(data=>{
            this.brandList = data.data.brand.subItems;
        })
        this.content_city = false;
        this.content_brand = true;

    },
    //特色
    specialAction(){

    },
    goCityList() {
      this.$router.push("/movie/citylist");
      //刷新页面
      this.$router.go(0);
    },
    //切换为商区
    btnShop(){
        this.shop_subway_change = 0;
    },
    //切换为地铁站
    btnSubway(){
        this.shop_subway_change = 1;
    },

    //点击左侧区号 右边随之切换内容
    menuAction(index){
        //获取disId
        this.disId = this.CinemaAreaList[index].id;
        this.CinemaAreamsg = this.CinemaAreaList[index];
        this.AreaSelectIndex = index;
    },
    // 全城
    menuContentAction(id, nm){
        //取得点击后的区域的id
        CinemaSearch(this.$store.state.id, id, this.disId)
        .then(data=>{
            if(this.shop_subway_change == 0){
                this.CinemaList = data.data.cinemas;  
                this.defaultArea = nm;      
                this.content_city = false;
            }else if(this.shop_subway_change == 1){
                this.CinemaList = data.data.subway;
            }
        })
    },
    //品牌
    branditemAction(id, name){
        this.defaultBrand = name;
        CinemaSearch(this.$store.state.cityID, '', this.disId, id)
        .then(result=>{
            console.log(result);
            this.CinemaList = result.data.cinemas;
            this.content_brand = false;
        })
    }
    },
    created(){   
        getMovieDetail(this.$route.params.id).then(result=>{
            this.Movieid = this.$route.params.id;
            this.DetailList = result;
        }).catch(error=>{
            console.log(error);
        })
        getMovieInfo(this.$route.params.id, this.$store.state.cityID)
        .then(data=>{
            //获取ShowDays
            this.showDays = data.data.showDays.dates;
        })
        .catch(error=>{
            console.log(error);
        })

        CinemaSearch(this.$store.state.cityID)
            .then(result => {
            console.log(result);
            //取得电影院的数据
            this.CinemaList = result.data.cinemas;
            })
            .catch(error => {
        });
    },
    computed: {
        ...mapState(["city"])
    },
    mounted(){
        this.contentScroll = new IScroll(this.$refs.content,{
        });
        this.contentScroll.on('beforeScrollStart',()=>{
            //滚动开始前刷新，识别最新高度            
            this.contentScroll.refresh();
        });    
    }
}
</script>

<style lang="scss" scoped>
#detail{
    .top{
        background: #e54847;
        height: 44px;
        .top-title{
            display: inline-block;
            font-weight: normal;
            color: #fff;
            line-height: 44px;
            text-align: center;
            font-size: 18px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 250px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
        .btn-back{
            padding-top: 10px;
            display: inline-block;
            height: 44px;
            padding: 10px;
        }
    .detail-middle{
        width: 100%;
        height: 150px;
        position: relative;
        padding: 10px 20px 0 20px;
        overflow: hidden;
        .detail-img{
            padding-right: 10px;
            width: 90px;
            float: left;
            img{
                width: 100%;
            }   
        }
        .bgimg{
            position: absolute;
            top: 0;
            right: 0;
            opacity: .4;
            left: 0;
            z-index: -1;
            img{
                width: 100%;
            }
        }
        .detail-name{
            width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #000;
            font-size: 16px;
            font-weight: 600;
        }
        .detail-enm{
            font-size: 10px;
            color: #000;
            margin-top: 2px;
        }
        .detail-score{
            font-size: 18px;
            color: orange;
            font-weight: 700;
            margin-right: 6px;
            float: left;
        }
        .detail-peo{
            font-size: 13px;
            color: #000;
            margin-top: 5px;
        }
        .detail-cat{
            font-size: 12px;
            color: #000;
            display: inline-block;
            margin-left: -19px;
        }
        .detail-version{
            display: inline-block;
            width: 42px;
            margin-left: 5px;
            img{
                width: 100%;
            }
        }
        .detail-timeInfo{
            margin-top: 4px;
            font-size: 12px;
            color: #000;
        }
        .showTime{
            font-size: 12px;
            color: #000;
            margin-top: 4px;
        }
        .detail-btn{
            position: absolute;
            top: 50%;
            left: 340px;
        }
    }
    .ShowDetail-date{
        color: #000;
        width: 100%;
        display: flex;
        // align-items: center;
        overflow-y: hidden;
        flex-wrap: nowrap;
        li{
            float: left;
            white-space: nowrap;
            padding: 10px 20px;
            background: #fff;
        }
    }
}    
#detail{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 60;
    background: #fff;
}

.scroll-content{
    position: absolute;
    left: 0;
    width: 100%;
    top: 285px;
    z-index: 100;
    overflow: hidden;
    bottom: 49px;
}
.content {
  z-index: 999;
  border-bottom: 1px solid #ccc;
  height: 40px;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  li {
    border-right: 1px solid #ccc;
    float: left;
    width: 145px;
    text-align: center;
    color: #555;
    font-size: 13px;
    line-height: 40px;
  }
  .back-content{
      font-size: 10px;
      margin-left: 0;
      font-style: normal;
  }
  .allcity-content{
      position: absolute;
      top: 50px;
      left: 0;
      background: #ccc;
      width: 100%;
      height: 80%;
  }
  .content-menu,.content-detail{
      display: inline-block;
      position: absolute;
      top: 0;
      height: 100%;
      li{
          border-bottom: 1px solid #f40;
      }
  }
  .content-menu{
      width: 80px;
      left: 0;
  }
  .content-detail{
      overflow: auto;
      background: #f5f5f5;
      width: 250px;
      right: 0;
  }
    // 品牌
  .allbrand{
      position: fixed;
      width: 100%;
      top: 128px;
      left: 0;
      height: 100%;
      padding: 0 10px 0 10px;
      background: #fff;
      z-index: 300;
      li{
          width: 100%;
          border-bottom: 1px solid #666;
          position: relative;
          text-align: left;
      }
      i{
        position: absolute;
        right: 30px;
        font-style: normal;
      }
  }
    // 全城
  .allcity{
      position: fixed;
      width: 100%;
      top: 128px;
      left: 0;
      height: 100%;
      padding: 0 10px 0 10px;
      background: rgba(0,0,0,.3);
      z-index: 300;
      .allcity-top{
        background: #fff;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          padding: 10px;
          color: #555;
          span{
              width: 170px;
              display: inline-block;
              text-align: center;
              line-height: 30px;
              height: 30px;
              font-weight: bold;
          }
      }
  }

}
.cinemaShowList {
  ul {
    padding: 8px 6px 15px 4px;
    border-bottom: 1px solid #ccc;
  }
  .cinema-name {
    margin-top: 6px;
    color: #000;
    height: 23px;
    line-height: 23px;
    display: inline-block;
    font-weight: bold;
  }
  .cinema-price {
    display: inline-block;
    color: #f03d37;
    font-size: 18px;
    font-weight: bold;
    .cinema-price-txt {
      font-size: 12px;
      font-weight: normal;
    }
  }
  .cinema-addr {
    display: inline-block;
    font-size: 12px;
    color: #666;
    margin-top: 4px;
    font-weight: 600;
    margin-left: 6px;
  }
  .cinema-distance {
    float: right;
    margin-right: 20px;
    font-size: 12px;
    color: #666;
    font-weight: 600;
  }
  .cinema-refuse {
    color: #589daf;
    border: 1px solid #589daf;
    padding: 0 3px;
    display: inline-block;
    text-align: center;
    line-height: 15px;
    border-radius: 2px;
    height: 15px;
    font-size: 10px;
    margin-left: 4px;
  }
  .cinema-snack,
  .lowPriceCard {
    color: #f90;
    border: 1px solid #f90;
    padding: 0 3px;
    display: inline-block;
    text-align: center;
    line-height: 15px;
    border-radius: 2px;
    height: 15px;
    font-size: 10px;
    margin-left: 4px;
  }
}
.active{
    background: #f5f5f5;
}

</style>
