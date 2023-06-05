import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/view/User/Login'
import GoodsList from '@/view/Goods/List'
import Release from '@/view/Goods/Release'
import Category from '@/view/Category/List'
import OrderList from '@/view/Orders/List'
import Layout from '@/components/Layout'
Vue.use(VueRouter)
let routes = [
     {
          path: '/',
          component: Login,
          meta: {
               requiredAuth: false
          }
     },
     {
          path: '/goods',
          component: Layout,
          redirect: '/goods/list',
          children: [
               {
                    path: 'category',
                    name: 'Category',
                    component: Category
               },
               {
                    path: 'list',
                    component: GoodsList
               },
               {
                    path: 'release',
                    component: Release
               }
          ],
          meta: {
               requiredAuth: true
          }
     },
     {
          path: '/order',
          component: Layout,
          redirect: '/order/list',
          meta: {
               requiredAuth: true
          },
          children:[
               {
                    path:'list',
                    component:OrderList,
                    name:'OrderList'
               }
          ]
     }
]

const router = new VueRouter({
     routes
})
// 路由守卫

router.beforeEach((to, from, next) => {
     if (to.matched.some(res => res.meta.requiredAuth)) {
          // 需要登录
          // 通过本地存储中的token判断是否登录
          if (!localStorage.getItem('token')) {
               next('/')
          } else if (to.path != '/') {

               next()
          }

     } else {
          // 放行
          next()
     }

})

export default router