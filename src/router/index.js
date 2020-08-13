import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Admin from '../views/Admin'
import NotFound from '../views/NotFound'
import Home from '../views/layout/Home'
import Log from '../views/log/Index'
import Video from '../views/video/Index'
import Movie from '../views/video/Movie'

var router = new Router({
    routes: [
        {
            path:'/admin',
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