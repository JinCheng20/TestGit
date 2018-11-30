//因为项目会不断迭代更新 所以接口要进行统一管理 避免更改接口时候的复杂

//开发环境
const SAT_HOST = 'http://localhost:8080';
//测试
const UAT_HOST = 'http://localhost:8080';
//生产
const PRO_HOST = 'https://m.maoyan.com';
// 工作中为了区别常量和变量 会把常量大写

//正在热映的电影的接口
//参数  token 用户标识(猫眼里面没找到)
const PLAYING_API = '/ajax/movieOnInfoList';

//加载更多正在热映的电影数据的接口
// 参数：
//     token 用户标识
//     movieIds  请求的电影id
const MORE_PLAYING_API = '/ajax/moreComingList';

/* 
即将上映的电影接口
参数  ci         城市ID
     token      用户标识
     limit      数据长度

*/
const COMING_API = '/ajax/comingList'

// 更多即将上映的电影接口
// 参数：ci
//      token
//      limit
//      movieIds

const MORE_COMING_API = '/ajax/moreComingList';

/*
城市列表接口
*/
const CITY_LIST_API = '/dianying/cities.json';

/*
电影详情接口
/ajax/detailmovie?movieId=42964
参数 movieId 请求的电影Id
*/
const MOVIE_DETAIL_API = '/ajax/detailmovie';

/*
电影详情页面 

/ajax/movie
        请求方式 POST
        参数
        movieId: 341213
        day: 2018-11-23
        offset: 0
        limit: 20
        districtId: -1
        lineId: -1
        hallType: -1
        brandId: -1
        serviceId: -1
        areaId: -1
        stationId: -1
        item: 
        updateShowDay: true
        reqId: 1542936086640
        cityId: 30
*/
const MOVIE_DETAIL_INFO_API = '/ajax/movie';

/*
影院搜索接口
/ajax/cinemaList
参数 ci
*/ 
const CINEMA_SEARCH_API = 'ajax/cinemaList';


//点击全城 品牌 特色之后影院搜索界面同步更新至附近的影院  接口
// /ajax/cinemaList
/* ?day=2018-11-21
&offset=0
&limit=20
&districtId=32          行政区 id
&lineId=-1
&hallType=-1
&brandId=-1
&serviceId=-1
&areaId=6589            所选区域id
&stationId=-1
&item=
&updateShowDay=false
&reqId=1542800377353
&cityId=30              城市id
*/


/*
影院全程 品牌 特色接口
/ajax/filterCinemas
?ci=30
参数 ci
*/


const CINEMA_MOREINFO_API = '/ajax/filterCinemas';

// 电影/电视剧/综艺搜索
// /ajax/search
// ?kw=1        输入框的值
// &cityId=30   城市Id
// &stype=-1    搜索类型
const CINEMA_TVSHOW_API = '/ajax/search';


// /searchlist/movies
// ?keyword=1
// &ci=30
// &offset=20
// &limit=20
// 搜索后加载更多电影
const MOVIE_TVSHOW_LOADMORE = '/searchlist/movies';


// 输出接口 进行调用
export default {
    SAT_HOST,
    UAT_HOST,
    PRO_HOST,
    PLAYING_API,
    COMING_API,
    MORE_PLAYING_API,
    MORE_COMING_API,
    CITY_LIST_API,
    MOVIE_DETAIL_API,
    MOVIE_DETAIL_INFO_API,
    CINEMA_SEARCH_API,
    CINEMA_MOREINFO_API,
    CINEMA_TVSHOW_API,
    MOVIE_TVSHOW_LOADMORE
}

