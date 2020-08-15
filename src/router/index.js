import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

import Admin from '../views/Admin'
import NotFound from '../views/NotFound'
import Home from '../views/layout/Home'

//惰性加载
const Video = () => import('../views/video/Index')
const Movie = () => import('../views/video/Movie')
const Log = () => import('../views/log/Index')
const AddVideo = () => import('../views/video/AddVideo.vue')

var router = new Router({
    routes: [
        {
            path:'/',
            component:Admin, 
            children:[
                {
                    path: '',
                    name: '首页',
                    component: Home
                },
                {
                    path:'/video/list',
                    name:'视频列表',
                    component:Video
                },
                {
                    path: '/movie/list',
                    name:'电影列表',
                    component: Movie
                },
                {
                    path: '/video/add',
                    name: '添加视频',
                    component:AddVideo
                },
                {
                    path:'/log',
                    name:'日志管理',
                    component:Log
                }
            ]
        },
        {
            path:'*',
            name:'notfound',
            component:NotFound,
        }
    ]
  })

  router.beforeEach((to,from,next) => {
      //console.log(to, from);
      //处理tab
      if(to.name) {
          let tab = {title:to.name,name:to.name,router:to.path};
          store.commit("handleTab",tab);
      }
      next();
  })

export default router