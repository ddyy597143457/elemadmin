import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Admin from '../views/Admin'
import NotFound from '../views/NotFound'

var router = new Router({
    routes: [
        {
            path:'/admin',
            name:'admin',
            component:Admin, 
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