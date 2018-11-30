<template>
<div id="city-list" class="page subpage">
    <app-content :style="{top: 0, bottom: 0}" ref="content">
        <!-- <div class="location-city">
            <span>定位城市</span>
        </div>
        <div class="location-city-con">
            点击此处进行定位
        </div>
        <div class="hot-city">
            热门城市
        </div>
        <div>
            <span class="hot-city-con">北京</span>
            <span class="hot-city-con">上海</span>
            <span class="hot-city-con">广州</span>
            <span class="hot-city-con">深圳</span>
            <span class="hot-city-con">长沙</span>
            <span class="hot-city-con">武汉</span>
            <span class="hot-city-con">南京</span>
            <span class="hot-city-con">重庆</span>
            
        </div> -->
        <div v-for="cityMap in data" :key="cityMap.key" ref="list">
            <h6 :style="{background: '#ccc'}">{{cityMap.key}}</h6>
            <ul>
                <li v-for="item in cityMap.value" :key="item.id"
                    @click="selectCityAction(item)">
                    {{item.nm}}
                </li>
            </ul>
        </div>
    </app-content>
    <nav class="nav-bar">
        <li class="nav-item" v-for="(item, index) in keys" :key="item" @click="btnAction(index)">
            {{item}}
        </li>
    </nav>
</div>

</template>

<script>
import {getCityListData} from '../../services/cityService.js'
import {mapActions} from 'vuex'
export default {
    data(){
        return {
            data: [],
            keys: []
        }
    },
    methods: {
        ...mapActions(['selectCity']),
        btnAction(index){
            //跳转到指定的字母的城市列表中
            //计算需要滚动的高度
            let height = 0;
            for(let i = 0; i < index; i++){
                height += this.$refs.list[i].offsetHeight;
            }     
            //让滚动视图滚动
            this.$refs.content.scrollTo(height);
        },
        selectCityAction(item){
            //将选中的城市保存，保存到全局数据中
            this.selectCity({
                city: item.nm,
                id: item.id
            })

            // 返回上一页
            this.$router.back();
        }
    },
    created(){
        // 去本地存储数据，如果没有就请求，如果有就直接使用
        getCityListData().then(({data, keys})=>{
            // 本地存储数据，以便下次使用
            this.data = data;
            this.keys = keys;
        })
    }
}
</script>

<style lang="scss" scoped>
#city-list{
    background: #eee;
    .location-city,.hot-city{
        background: #ccc;
    }
    .location-city-con{
        padding: 8px 14px;
        border: 1px solid #f40;
        display: inline-block;
    }
    .hot-city-con{
        border: 1px solid #f40;
        padding: 20px 45px;
        display: inline-block;
    }

}
.nav-bar{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    .nav-item{
        font-size: 14px;
        padding: 0 6px;
    }
}
</style>

