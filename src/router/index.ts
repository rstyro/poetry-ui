import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

// 定义路由下的 meta 类型
declare module 'vue-router'{
    interface RouteMeta{
        title:string
    }
}

const routes:Array<RouteRecordRaw> = [     //主路由模块容器
    {
        path: '/',
        redirect: '/index',
    },
    {
        path: '/index',
        name: 'index',
        component: () => import("@/views/index.vue"),
        meta:{
            title:"首页",
            transition:'animate__zoomInDown'
        }
    },
    {
        path: '/search',
        name: 'search',
        component: () => import("@/views/search/index.vue"),
        // meta:{
        //     transition: 'animate__slideInUp'
        // }
    },
    {
        path: '/detail',
        name: 'detail',
        component: () => import("@/views/search/detail.vue"),
        // meta:{
        //     transition: 'animate__slideInUp'
        // }
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior:(to,from,savedPosition)=>{
        if(savedPosition){
            return savedPosition;
        }else {
            return {
                top:0
            }
        }
    },
    routes
})

export default router
