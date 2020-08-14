import Vue from 'vue'
import Router from 'vue-router'

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
const UploadVideo = () => import('../views/video/UploadVideo.vue')

var router = new Router({
    routes: [
        {
            path:'/',
            name:'admin',
            component:Admin, 
            children:[
                {
                    path: '',
                    component: Home
                },
                {
                    path:'video/list',
                    component:Video
                },
                {
                    path: 'movie/list',
                    component: Movie
                },
                {
                    path: 'video/upload',
                    component:UploadVideo
                },
                {
                    path:'log',
                    component:Log
                }
            ]
        },
        {
        path:'/',
        name:'notfound',
        component:NotFound,
        alias:'*'
        }
    ]
  })
export default router