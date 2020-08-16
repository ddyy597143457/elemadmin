import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

import Index from '../views/Index'
import NotFound from '../views/NotFound'
import Home from '../views/layout/Home'

//惰性加载
const Login = () => import('../views/login/Login')
//权限管理
const Role = () => import('../views/auth/Role')
const RoleAdd = () => import('../views/auth/RoleAdd')
const Admin = () => import('../views/auth/Admin')
const AddAdmin = () => import('../views/auth/AddAdmin')

//内容管理
const News = () => import('../views/content/News')
const Article = () => import('../views/content/Article')

//视频管理
const Video = () => import('../views/video/Index')
const Movie = () => import('../views/video/Movie')
const AddVideo = () => import('../views/video/AddVideo')

//日志管理
const Log = () => import('../views/log/Index')

var router = new Router({
    routes: [
        {
            path:'/',
            component:Index, 
            children:[
                {
                    path: '',
                    name: '首页',
                    component: Home
                },
                {
                    path: '/role/index',
                    name: '角色管理',
                    component:Role
                },
                {
                    path: '/role/add',
                    name: '添加角色',
                    component:RoleAdd
                },
                {
                    path: '/admin/index',
                    name: '管理员列表',
                    component:Admin
                },
                {
                    path: '/admin/add',
                    name: '添加管理员',
                    component:AddAdmin
                },
                {
                    path: '/content/news',
                    name: '资讯管理',
                    component: News
                },
                {
                    path: '/content/article',
                    name: '文章管理',
                    component: Article
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
                },
            ]
        },
        {
            path:'/login',
            name: '登陆',
            component:Login
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
    //判断登陆
    if(localStorage.getItem('userinfo')) {
        //处理tab
        if(to.name && to.name !== 'notfound') {
            let tab = {title:to.name,name:to.name,router:to.path};
            store.commit("handleTab",tab);
        }
        next();
    } else if(to.path === '/login') {
        next();
    } else {
        next({path:'/login'});
    }
  })

export default router