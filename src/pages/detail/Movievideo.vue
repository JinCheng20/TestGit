<template>
    <div class="video">
        <video :src="MovieInfo.videourl" controls="controls" @click="closeVideo">
        </video>
        <!-- 影片信息 -->
        <div class="video-con">
            <div class="video-name">
                {{MovieInfo.nm}}
            </div>
            <div class="video-version" v-if="MovieInfo.version=='v3d imax'">
                <img src="../../assets/detail-3d.png" alt="">
            </div>
            <div class="video-score">
                <span>猫眼评分</span>
                <span>{{MovieInfo.sc}}</span>
            </div>
            <div class="video-showTime">
                {{MovieInfo.pubDesc}}
            </div>
            <div class="buyTicket">
                <a href="">特惠购票</a>
            </div>
        </div>
        <span class="hr"></span>
        <!-- 播放列表 -->
        <div class="videoList">
            <span class="videoList-title">播放列表</span>
            <span class="videoList-num">(全部{{MovieInfo.vnum}}部)</span>
        </div>
    </div>
</template>

<script>
import {getMovieDetail} from '../../services/movieService.js'
export default {
    data(){
        return{
            // Video: '',
            Movieid: '',
            MovieInfo: {}
        }
    },
    methods: {
        closeVideo(){
            console.log(this.MovieInfo) 
        }
    },
    created(){
        this.Movieid = this.$route.params.id;
        getMovieDetail(this.Movieid).then(result=>{
            // console.log(result);
            this.MovieInfo = result;
        }).catch(error=>{
            console.log(error);
        })
        
    }
    // ,
    // props: {
    //     MovieInfo: Object
    // }
}
</script>

<style scoped lang="scss">
.video{
    width: 100%;
    position: absolute;
    height: 100%;
    background: #fff;
    z-index: 70;
    video{
        width: 100%;
    }
    .video-con{
        position: relative;
        width: 100%;
        height: 80px;
        .video-name{
            display: inline-block;
            font-weight: 600;
            font-size: 16px;
        }
        .video-version{
            background: #ccc;
            display: inline-block;
            width: 50px;
            margin-top: 2px;
            margin-left: 8px;
            height: 16px;
            img{
                width: 100%;
            }
        }
        .buyTicket{
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            a{
                background: #F03D37;
                display: inline-block;
                width: 80px;
                height: 30px;
                color: #fff;
                border-radius: 20px;
                font-size: 15px;
                text-align: center;
                line-height: 30px;
                font-weight: 600;
            }
        }
    }
    .hr{
        display: block;
        width: 100%;
        height: 10px;
        background: #ccc;
    }

}
</style>
