import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import commonUI from './common'
Vue.use(commonUI);

Vue.config.productionTip = false
Vue.prototype.$center = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// axios.get('http://m.maoyan.com')
//   .then(result=>{
//     console.log(result);
//   })
//   .catch(error=>{
//     console.log(error);
//   })
