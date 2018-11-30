<template>
<div id="search" class="page">
    <app-header title="猫眼电影" style="z-index:1">
        <span @click="MovieSearchBack" class="back_btn">返回</span>
    </app-header>
    <div class="top_input">
        <span class="search_btn" @click="handSearchAction">
            <img src="../../assets/search.png" alt="">
        </span>
        <input type="text" placeholder="搜电影、搜影院" class="top_inputText" @input="inputchangeAction()" v-model="input_data">
        <span class="cancel_btn" @click="cancelSearchAction">取消</span>
    </div>
    <div class="NoSorce" v-if="NoSearchSorce==true">
      没有您所搜索的资源
    </div>
    <div class="AllContent" v-if="AllContentShow==true">
        <!-- 电影/电视剧/综艺 -->
        <div class="noCinema" v-if="TvShowContent==true">
            <span class="serachResultType1">
                电影/电视剧/综艺
            </span>        
            <ul class="noCinema-List">
                <li v-for="(item, index) in NoCinemaList" :key="index">
                    <img :src="item.img" alt="">
                    <span class="title1">
                        {{item.nm}}
                    </span>
                    <span class="wish1">
                        {{item.wish}}人想看
                    </span>
                    <span class="englishName1">
                        {{item.enm}}
                    </span>
                    <span class="cat1">
                        {{item.cat}}
                    </span>
                    <!-- <span class="item-order" :class="{active: item.globalReleased == false}">预售</span> -->
                    <span class="rt1">
                        {{item.rt}}
                    </span>
                </li>
                <!-- 查看剩余XXX影视剧 -->
                <span class="loadmoreNocinema" @click="loadmoreShowAction">
                    {{this.NoCinemaListTotal}}
                </span>
            </ul>
        </div>
        <!-- 影院 -->
        <div class="Cinema" v-if="CinemaContent==true">
            <span class="serachResultType2">
                影院
            </span>      
            <ul class="Cinema-List">
                <li v-for="(item, index) in CinemaList" :key="index">
                    <span class="title2" v-if="item.nm">
                        {{item.nm}}
                    </span>
                    <span class="cinema_price" v-if="item.sellPrice">
                        {{item.sellPrice}}元起
                    </span>
                    <span class="addr" v-if="item.addr">
                        {{item.addr}}
                    </span>
                    <span class="distance" v-if="item.distance">
                        {{item.distance}}
                    </span>
                    <br>
                    <span class="sit cinema_special">
                        座
                    </span>
                    <span class="lowPriceCard cinema_special" v-if="item.vipDesc == '折扣卡'">
                        折扣卡
                    </span>
                    <!-- 查看剩余XXX影视剧
                    <span class="loadmoreNocinema" @click="loadmoreShowAction">
                        {{this.CinemaListTotal}}
                    </span> -->

                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import { SearchMovie_TvShow,SearchMovie_loadmore } from "../../services/movieService.js";
export default {
  props: {
    type: Array
  },
  data() {
    return {
      input_data: "",
      NoCinemaList: [],
      CinemaList: [],
      NoCinemaListTotal: "",
      AllContentShow: false,
      NoSearchSorce: false,
      TvShowContent: false,
      CinemaContent: false,
      Movies_id: [],
      limit: 20,
      //每次加载20条数据
      offset: 20
    };
  },
  created() {
    console.log(this.type);
  },
  methods: {
    handSearchAction(){
        this.inputchangeAction();
    },
    MovieSearchBack() {
      this.$router.push("/movie");
    },
    cancelSearchAction() {
      this.$router.push("/movie");
    },
    //加载更多
    loadmoreShowAction() {
      SearchMovie_loadmore(this.input_data, this.$store.state.cityID, this.offset, this.limit)
      .then(data=>{
        // 之前的this.NocinemaList 与 新请求到的数据进行结合
        this.NoCinemaList.push.apply(this.NoCinemaList, data.data.movies);
        this.offset += 20;
        
        // console.log(this.NoCinemaList);
      })
      .catch(error=>{
        console.log(error);
      })
    },
    //输入框事件
    inputchangeAction() {
      if(this.input_data == ''){
          setTimeout(()=>{
              this.AllContentShow = false;
              this.NoSearchSorce = false;              
          },300)
      }
      
        SearchMovie_TvShow(this.input_data, this.$store.state.cityID, -1)
          .then(data => {
              if(data.data.movies){
                //只展示3条数据
                console.log(data.data.movies.list);
                this.NoCinemaList = data.data.movies.list.splice(0,3);
                this.Movies_id = data.data.movies.list.id;
                this.TvShowContent = true;
                this.AllContentShow = true;   
                this.NoCinemaListTotal = data.data.movies.total;  
                this.NoSearchSorce = false;                                                
              }else{
                this.TvShowContent = false;              
              }
              if(data.data.cinemas)
              {                
                this.CinemaList = data.data.cinemas.list.splice(0,3);
                this.CinemaContent = true;
                this.AllContentShow = true;  
                this.NoSearchSorce = false;                                                                              
              }else{                
                this.CinemaContent = false;                
              }
              if(!data.data.movies && !data.data.cinemas && this.input_data != ''){
                this.NoSearchSorce = true;                              
              }
          })
          .catch(error => {
            console.log(error);
          });
    }
  }
};
</script>

<style lang="scss" scoped>
#search {
  .active {
    display: block;
  }
  .NoSorce{
    width: 100%;
    height: 100%;
    font-size: 30px;
    position: absolute;
    top: 88px;
    text-align: center;
    color: #f40;
    font-weight: bold;
    z-index: 100;
  }
  .AllContent{
      width: 100%;
      height: 100%;
      overflow: auto;
  }
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 20;
  .back_btn {
    float: left;
    height: 44px;
    line-height: 44px;
    font-weight: bold;
    cursor: pointer;
    position: absolute;
    z-index: 20;
  }
  .top_input {
    position: absolute;
    top: 44px;
    width: 100%;
    z-index: 99;
    background: #f5f5f5;
    .search_btn {
      display: inline-block;
      padding: 5px;
      width: 20px;
      height: 30px;
      float: left;
      img {
        width: 100%;
      }
    }
    .top_inputText {
      width: 70%;
      padding: 4px 0;
      font-size: 13px;
      color: #333;
      margin-top: 4px;
    }
    .cancel_btn {
      color: #f03d37;
      float: right;
      padding: 0 10px;
      margin-top: 7px;
      cursor: pointer;
    }
  }
  .noCinema {
    margin-top: 80px;
    color: #999;
    width: 100%;
    background: #fff;
    padding-top: 10px;
    .serachResultType1 {
      margin: 0 10px 10px;
      display: block;
    }
    .noCinema-List {
      width: 100%;
      margin-top: 1px;
      background: #fff;
      border-top: 1px solid #999;
      li {
        width: 100%;
        padding: 10px 20px;
        height: 100px;
        border-bottom: 1px solid #999;
        img {
          width: 60px;
          height: 90px;
          display: inline-block;
          float: left;
        }
        .title1 {
          display: inline-block;
          color: #000;
          font-weight: bold;
          width: 190px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .englishName1 {
          display: block;
          font-size: 10px;
          margin-top: 3px;
        }
        .cat1 {
          font-size: 12px;
          margin-top: 2px;
        }
        .wish1 {
          float: right;
          color: #fa0;
          margin-right: 35px;
          font-size: 14px;
        }
        // .item-order{
        //     background-color: #3c9fe6;
        //     display: none;
        //     text-align: center;
        //     color: #fff;
        //     line-height: 28px;
        //     width: 47px;
        //     height: 27px;
        //     border-radius: 4px;
        //     cursor: pointer;
        //     position: absolute;
        //     top: 50%;
        //     margin-top: -13px;
        //     right: 30px;
        //     font-size: 12px;
        // }
        .rt1 {
          display: block;
          font-size: 12px;
          margin-top: 5px;
        }
      }
      .loadmoreNocinema {
        display: block;
        width: 100%;
        height: 40px;
        color: #ef4238;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
      }
    }
  }

  .Cinema {
    color: #999;
    width: 100%;
    background: #fff;
    margin-top: 10px;
    padding: 10px 0 10px;
    .serachResultType2 {
      display: block;
      margin-left: 10px;
    }
    .Cinema-List {
      width: 100%;
      margin-top: 1px;
      background: #fff;
      border-top: 1px solid #999;
      li {
        width: 100%;
        padding: 10px 20px;
        height: 100px;
        border-bottom: 1px solid #999;
        .title2 {
          display: inline-block;
          color: #000;
          width: 250px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cinema_price {
          color: #ef4238;
          font-size: 15px;
          display: inline-block;
          margin-left: 20px;
          transform: translateY(-3px);
        }
        .addr {
          display: inline-block;
          font-size: 12px;
          width: 70%;
          margin-top: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .distance{
            display: inline-block;
            margin-left: 10px;
        }
        .lowPriceCard {
          color: #589daf;
          margin-left: 5px;
        }
        .sit {
          color: #f90;
        }
        .cinema_special {
          display: inline-block;
          border: 1px solid #589daf;
          position: relative;
          padding: 0 3px;
          height: 15px;
          line-height: 15px;
          border-radius: 2px;
          font-size: 0.6rem;
        }
      }
    }
  }
}
</style>
