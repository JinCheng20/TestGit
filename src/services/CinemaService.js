import API from '../api'
import http from '../utils/http'

// 影院搜索请求数据接口
export function CinemaSearch(cityid, areaid, disId, brandid){
    if(cityid == ''){
        cityid = 30;
    }
    if(areaid == ''){
        areaid = -1;
    }
    if(brandid == ''){
        brandid = -1;
    }
    if(disId == ''){
        disId = -1;
    }
    return new Promise((resolve,reject)=>{
        http({
            url: API.CINEMA_SEARCH_API,
            method: 'GET',
            data: {
                cityId: cityid,
                areaId: areaid,
                districtId: disId,
                brandId: brandid
            }
        })
        .then(result=>{
            resolve(result);
        }).catch(error=>{
            console.log(error);
        })
    })
}

// 影院 品牌 特色 全城 搜索
export function CinemaMoreInfo(id){
    return new Promise((resolve,reject)=>{
        http({
            url: API.CINEMA_MOREINFO_API,
            method: 'GET',
            data: {
                ci: id
            }
        }).then(data=>{
            // console.log(data);
            resolve(data);
        }).catch(error=>{
            console.log(error);
        })
    })
}











