<template>
<div class="page" id="cinema">
    <!-- 公共头部 -->
    <app-header title="影院"></app-header>
    <header class="sub-header">
        <!-- 地址定位 -->
        <span class="city-icon" @click="goCityList()">
            {{city}}
        </span>
        <nav class="search-input" >
            <input type="text" class="" placeholder="搜影院">
        </nav>
        <!-- 放大镜图标 -->
        <span class="search-icon">
            <img src="../../assets/search.png"/>
        </span>
    </header>
    <div class="content">
        <li @click="allcityAction">{{defaultArea}}</li>
        <li @click="brandAction">{{defaultBrand}}</li>
        <li @click="specialAction" style="border-right:none">特色</li>
        <!-- 全城展示列表 -->
        <div class="allcity" v-if="content_city">
            <div class="allcity-top">
                <!-- <i @click="back_content" class="back-content">返回</i> -->
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
</div>
</template>

<script>
import { mapState } from "vuex";
import { CinemaSearch, CinemaMoreInfo} from "../../services/CinemaService.js";
export default {
  data() {
    return {
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
      
    };
  },
  methods: {
    //城市
    allcityAction(){
        if(this.content_city == false){
            CinemaMoreInfo(this.$store.state.cityID)
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
        CinemaMoreInfo(this.$store.state.cityID)
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
        CinemaSearch(this.$store.state.cityID, id, this.disId)
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
        // console.log(id);
        this.defaultBrand = name;
        CinemaSearch(this.$store.state.cityID, '', this.disId, id)
        .then(result=>{
            console.log(result);
            this.CinemaList = result.data.cinemas;
            this.content_brand = false;
        })
    }
  },
  watch: {
      shop_subway_change(){
           CinemaMoreInfo(this.$store.state.cityID)
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
      }
  },
  created() {
    CinemaSearch(this.$store.state.cityID)
      .then(result => {
        console.log(result);
        //取得电影院的数据
        this.CinemaList = result.data.cinemas;
      })
      .catch(error => {
        console.log(error);
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
};

</script>

<style lang="scss" scoped>
.scroll-content{
    position: absolute;
    left: 0;
    width: 100%;
    top: 128px;
    overflow: hidden;
    bottom: 49px;
}
.sub-header {
  width: 100%;
  height: 44px;
  border-bottom: 1px solid #e6e6e6;
  position: absolute;
  left: 0;
  top: 44px;
  color: #666;
  font-size: 14px;
  display: flex;
  .search-input {
    margin: 0 auto;
    height: 55%;
    input {
      margin-top: 13px;
      width: 100%;
      height: 80%;
    }
  }
  .city-icon {
    flex: 1;
    text-align: center;
    line-height: 44px;
    &::after {
      content: "";
      display: inline-block;
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-top: 6px solid #666;
      transform: translateY(4px);
    }
  }
  .nav {
    width: 60%;
    display: flex;
    li {
      flex: 1;
      text-align: center;
      line-height: 44px;
      font-weight: bold;
      &.active {
        color: #f03d37;
        border-bottom: 2px solid #f03d37;
      }
    }
  }
  .search-icon {
    flex: 1;
    img {
      width: 24px;
      margin: 10px auto;
    }
  }
}
.content {
  border-bottom: 1px solid #ccc;
  height: 40px;
  width: 100%;
  background: #fff;
  margin-top: 88px;
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
      z-index: 10;
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
      z-index: 10;
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
