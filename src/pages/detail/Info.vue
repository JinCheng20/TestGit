<template>
    <div id="detail">
        <router-view :MovieInfo="info"></router-view>
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
            <div class="detail-img" @click="showVideo">
                <img :src="DetailList.img" alt="">
                <!-- 播放按钮 -->
                <div class="show-btn">
                    <img src="../../assets/show.png" alt="">
                </div>
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

           


        </div>
        <div class="buyTicket">
            <span>
                特惠购票
            </span>
        </div>
        <div class="detail-movieInfo">
            {{DetailList.dra}}
        </div>
    </div>
        
</template>

<script>
import {getMovieDetail} from '../../services/movieService.js'
export default {
  data() {
    return {
      info: "",
      DetailList: {},
      Movieid: ''

      
    };
  },
  methods: {
    backAction() {
      this.$router.back();
    },
    showVideo() {
      this.$router.push(`/movie/detail/${this.Movieid}/detailInfo/movie-video`);
    }

    


  },
  created() {
    this.Movieid = this.$route.params.id;    
    getMovieDetail(this.Movieid).then(result=>{
      console.log(result);
      this.DetailList = result;
    }).catch(error=>{
      console.log(error);
    })

   

  }
  

};
</script>

<style lang="scss" scoped>
#detail {
  .top {
    background: #e54847;
    height: 44px;
    .top-title {
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
  .btn-back {
    padding-top: 10px;
    display: inline-block;
    height: 44px;
    padding: 10px;
  }
  .detail-middle {
    width: 100%;
    height: 150px;
    position: relative;
    padding: 10px 20px 0 20px;
    overflow: hidden;
    .detail-img {
      padding-right: 10px;
      width: 90px;
      float: left;
      position: relative;
      img {
        border: 2px solid #fff;
        width: 100%;
      }
      .show-btn {
        position: absolute;
        bottom: 2px;
        right: 12px;
        width: 20px;
        opacity: 0.7;
      }
    }
    .bgimg {
      position: absolute;
      top: 0;
      right: 0;
      opacity: 0.4;
      left: 0;
      z-index: -1;
      img {
        width: 100%;
      }
    }
    .detail-name {
      width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #fff;
      font-size: 16px;
      font-weight: 600;
    }
    .detail-enm {
      font-size: 10px;
      color: #ccc;
      margin-top: 2px;
    }
    .detail-score {
      font-size: 18px;
      color: orange;
      font-weight: 700;
      margin-right: 6px;
      float: left;
    }
    .detail-peo {
      font-size: 13px;
      color: #ccc;
      margin-top: 5px;
    }
    .detail-cat {
      font-size: 12px;
      color: #ccc;
      display: inline-block;
      margin-left: -33px;
    }
    .detail-version {
      display: inline-block;
      width: 42px;
      margin-left: 5px;
      img {
        width: 100%;
      }
    }
    .detail-timeInfo {
      margin-top: 4px;
      font-size: 12px;
      color: #ccc;
    }
    .showTime {
      font-size: 12px;
      color: #ccc;
      margin-top: 4px;
    }
    .detail-btn {
      position: absolute;
      top: 50%;
      left: 340px;
    }
  }
    .buyTicket{
        background: #e54847;
        height: 35px;
        width: 80%;
        margin: 0 auto;
        color: #fff;
        text-align: center;
        font-size: 18px;
        line-height: 35px;
        border-radius: 10px;
        margin-top: 12px;
        margin-bottom: 10px;
    }
    .detail-movieInfo{
        font-size: 15px;
        padding: 0 10px;

    }
}
#detail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 400;
  background: #fff;
}

</style>

