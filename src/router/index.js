import Vue from 'vue'
import Router from 'vue-router'

// import Playing from './../'

import Movie from '../pages/movie/Root'
import Cinema from '../pages/cinema/Root'
import Mine from '../pages/mine/Root'
import CityList from '../pages/city/Root.vue'
import MovieSearch from '../pages/movieSearch/Root.vue'
import CinemaSearch from '../pages/cinemaSearch/Root.vue'
import Detail from '../pages/detail/Root.vue'
import DetailInfo from '../pages/detail/Info.vue'
import MovieVideo from '../pages/detail/Movievideo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/movie',
      component: Movie,
      children: [
        {
          path: 'movie-search',
          component: MovieSearch,
          props: {
            //---------------------
            type: ['cinema', 'movie']
          }
        },
        {
          path: 'citylist',
          component: CityList
        },
        //影片详情
        {
          path: 'detail/:id',
          component: Detail,
          children: [
            {
              path: 'detailInfo',
              component: DetailInfo,
              //影片Video
              children: [
                {
                  path: 'movie-video',
                  component: MovieVideo
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/cinema',
      component: Cinema,
      children: [
        {
          path: 'cinema-search',
          component: CinemaSearch,
          props: {
            type: ['cinema']
          }
        },
        {
          path: 'citylist',
          component: CityList,
        }
      ]
    },
    {
      path: '/mine',
      component: Mine
    },
    {
      path: '**',
      redirect: '/movie'
    }
  ]
})
