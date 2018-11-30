//引入自己设置api的接口文件  index.js可以省略
import API from '../api'
import http from '../utils/http'

//需要注意 请求数据的代码与前面调用组件的是异步的操作 需要promise

//请求正在热映的电影数据
export function getPlayingList(){
    return new Promise((resolve,reject)=>{
        http({
            url: API.PLAYING_API,
            method: 'GET',
            data: {
                token: ''
            }
        })
            .then(({data,status})=>{
                if(status != 200){
                    //请求失败
                    return;
                }
                //请求成功
                let newData = data.movieList.map(item=>{
                    let {id, nm, img, version, sc, star, showInfo, globalReleased, wish} = item;
                    img = img.replace(/w.h/,'128.180');
                    return {id, nm, img, version, sc, star, showInfo, globalReleased, wish};
                })
                resolve({
                    data: newData,
                    ids: data.movieIds,
                });
            })
            .catch(error=>{          
                return;
            })
        })
}

//请求更多正在热映的电影数据
export function getMorePlayingList(ids){
    return new Promise((resolve,reject)=>{
        http({
            url: API.MORE_PLAYING_API,
            method: 'GET',
            data: {
                token: '',
                movieIds: ids
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                return;
            }
            let newData = data.coming.map(item=>{
                let {id, nm, img, version, sc, star, showInfo, globalReleased} = item;
                img = img.replace(/w.h/, '128.180');
                return {id, nm, img, version, sc, star, showInfo, globalReleased};
            })
            resolve(newData);
        })
        .catch(error=>{
            console.log(error);
        })
    })
}


//请求即将上映的电影数据
export function getComingList(){
    return new Promise((resolve,reject)=>{
        http({
            url: API.COMING_API,
            method: 'GET',
            data: {
                ci: 30,//城市ID
                token: '',
                limit: 10
            }
        })
            .then(({data,status})=>{
                // console.log(data);
                if(status == 200){
                    let newData = data.coming.map(item=>{
                        let {rt, comingTitle, img, nm, wish, star, showInfo, globalReleased, version} = item;
                        img = img.replace(/w.h/, '128.180');
                        return {rt, comingTitle, img, nm, wish, star, showInfo, globalReleased, version};
                        console.log(newData);
                    })
                    let dataMap = {};
                    newData.map(item=>{
                        //由于dataMap 刚开始为一个空对象
                        //所以dataMap[item.comingTitle]第一次判断的时候为undefined
                        //所以肯定能进入if条件

                        //eg 对11月15日 周四这一天进行分类
                        if(!dataMap[item.comingTitle]){
                            dataMap[item.comingTitle] = [];
                        }
                        dataMap[item.comingTitle].push(item);
                        //这个对象key值就是上映时间
                        //value值就是对应时间的电影信息
                    })
                    resolve({
                        data: dataMap,
                        ids: data.movieIds,
                        coming_movie: data.coming
                    });
                }
                else{
                    return;
                }
            })
            .catch(error=>{
                return;
            })
    })
}

//请求更多即将上映的电影数据
export function getMoreComingList(ids){
    return new Promise((resolve,reject)=>{
        http({
            url: API.MORE_PLAYING_API,
            method: 'GET',
            data: {
                token: '',
                movieIds: ids
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                return;
            }
            else{
                let newData = data.coming.map(item=>{
                    let {rt, comingTitle, img, nm, wish, star, showInfo, globalReleased, version} = item;
                    img = img.replace(/w.h/, '128.180');
                    return {rt, comingTitle, img, nm, wish, star, showInfo, globalReleased, version};
                    console.log(newData);
                })
                let dataMap = {};
                newData.map(item=>{
                    if(!dataMap[item.comingTitle]){
                        dataMap[item.comingTitle] = [];
                    }
                    dataMap[item.comingTitle].push(item);
                })
                resolve(dataMap);
            }
        })
        .catch(error=>{
            return;
        })
    })
}


//请求电影的详情信息
export function getMovieDetail(id){
    return new Promise((resolve, reject)=>{
        http({
            url: API.MOVIE_DETAIL_API,
            method: 'GET',
            data: {
                movieId: id
            }
        })
        .then(data=>{
            console.log(data);
            // console.log(data.data);
            console.log(data.data.detailMovie);
            data.data.detailMovie.img = data.data.detailMovie.img.replace(/w.h/, '128.180');
            data.data.detailMovie.snum = '(' + (Math.round(data.data.detailMovie.snum / 10000)).toFixed(1) + '万人评)' ;
            resolve(data.data.detailMovie);
        })
        .catch(error=>{
            console.log(error);
        })
    })
}


//请求 电影详情页面 所选地址附近的影院地址 播放日期等信息接口
export function getMovieInfo(movieid, cityid){
    return new Promise((resolve, reject)=>{
        http({
            url: API.MOVIE_DETAIL_INFO_API,
            method: 'POST',
            data: {
                movieId: movieid,
                day: '',
                offset: 0,
                limit: 20,
                districtId: -1,
                lineId: -1,
                hallType: -1,
                brandId: -1,
                serviceId: -1,
                areaId: -1,
                stationId: -1,
                item: '',
                updateShowDay: true,
                reqId: Date.now(),
                cityId: cityid
            }
        })
        .then(data=>{
            resolve(data);
        })
        .catch(error=>{
            console.log(error);
        })
            
    })
}



//电视剧 综艺 电影搜索接口
export function SearchMovie_TvShow(value, cityid, type){
    return new Promise((resolve, reject)=>{
        http({
            url: API.CINEMA_TVSHOW_API,
            method: 'GET',
            data: {
                kw: value,
                cityId: cityid,
                stype: type
            }
        }).then(result=>{
            if(result.data.movies){
                result.data.movies.list.map(item=>{
                    item.img = item.img.replace(/w.h/, '128.180');
                })
                result.data.movies.total = '点击查看全部' + result.data.movies.total + '部影视剧';
            }
            resolve(result);
        }).catch(error=>{
            console.log(error);
        })
    })
}

//电视剧 综艺 电影搜索后加载更多的接口
export function SearchMovie_loadmore(value, cityid, offset, limit){
    return new Promise((resolve, reject)=>{
        http({
            url: API.MOVIE_TVSHOW_LOADMORE,
            method: 'GET',
            data: {
                keyword : value,
                ci: cityid,
                offset: offset,
                limit: limit
            }
        }).then(result=>{
            console.log(result);
            if(result.data.movies){
                result.data.movies.map(item=>{
                    item.img = item.img.replace(/w.h/, '128.180');
                })
                result.data.total = '点击查看全部' + result.data.total + '部影视剧';
            }
            // console.log(data);
            //需要获取ID***************未完成
            resolve(result);
        }).catch(error=>{
            console.log(error);
        })
    })
}


