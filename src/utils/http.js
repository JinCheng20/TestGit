import axios from 'axios';
import API from '../api';


export default function http({url, method, data}){
    let options = {
        url : url,
        method : method,
        //修改开发 测试或者上线环境的 域名直接修改这里一处就可以 封装的好处
        baseURL: API.SAT_HOST,
        timeout: 2000,
        withCredentials: false
    };
    if(method == 'GET'){
        options.params = data;
    }   
    else if(method == 'POST'){
        options.data = data;
    }
    return axios(options);
}

// axios.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     return config;
//     }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//     alert('网络错误，请刷新页面后重试');
// });



//1 组件要独立出来
//2 Api要单独管理
//3 请求不直接使用axios 需要将axios进行封装 修改域名维护时候会很方便