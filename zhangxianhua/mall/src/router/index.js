import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/view/Index'
import Car from '@/view/Car'
import Goods from '@/view/Goods'
import Mine from '@/view/Mine'
import Login from '@/view/Login'
import Register from '@/view/Register'
import Details from '@/view/Details'
import Orders from '@/view/Orders'
import OrderDetail from '@/view/OrderDetail'
import UserInfo from '@/view/UserInfo'
import Address from '@/view/Address'
import Search from '@/view/Search'
import Collection from '@/view/Collection'
Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        component:Index,
        meta:{
            isLogin:false
        }
    },
    {
        path:'/goods',
        component:Goods,
        meta:{
            isLogin:false
        },
    },
    {
        path:'/car',
        component:Car,
        meta:{
            isLogin:true
        }
    },
    {
        path:'/mine',
        component:Mine,
        meta:{
            isLogin:true
        }
    },
    {
        path:'/login',
        component:Login,
        meta:{
            isLogin:false
        }
    },
    {
        path:'/register',
        component:Register,
        meta:{
            isLogin:false
        }
    },
    {
        path:'/details/:id',
        name:'Details',
        component:Details,
        props:true,
        meta:{
            isLogin:false
        }
    },
    {
        path:'/orders/:status',
        name:'Orders',
        component:Orders,
        props:true,
        meta:{
            isLogin:true
        }
    },
    {
        path:'/order-detail/:orderId',
        name:'OrderDetail',
        component:OrderDetail,
        props:true,
        meta:{
            isLogin:true
        }
    },
    {
        path:'/userInfo',
        name:'UserInfo',
        component:UserInfo,
        meta:{
            isLogin:true
        }
    },
    {
        path:'/address',
        name:'Address',
        component:Address,
        meta:{
            isLogin:true
        }
    },
    {
        path:'/search',
        name:'Search',
        component:Search,
        meta:{
            isLogin:false
        }
    },
    {
        path:'/collection',
        name:'Collection',
        component:Collection,
        meta:{
            isLogin:false
        }
    }
    
    
]
// 路由守卫---导航守卫



const router = new VueRouter({
    routes
})

// 路由守卫  解决一些需要登录后才能访问的路由
router.beforeEach((to, from, next) => {

    if(to.matched.some(res=>res.meta.isLogin)){
         if(!localStorage.getItem('VUEX-PERSISTEDSTATE')){
              router.push('/login')
         }else if(to.path!='/'){
              next()
         }
    }else{
         next()
    }
})


export default router