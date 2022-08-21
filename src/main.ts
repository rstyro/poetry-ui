import { createApp,createVNode,render } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import {NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import LoadingBar from './components/LoadingBar.vue';

createApp(App).use(router).mount('#app')

const vNode = createVNode(LoadingBar);
render(vNode,document.body)
// 路由前置拦截器
router.beforeEach((to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext) => {
    vNode.component?.exposed.start();
    if(to.path==="/search" && to.query.q){
        // 把搜索的内容变成标题
        document.title=to.query.q;
    }
    next();
})

// 路由后置拦截器
router.afterEach((to:RouteLocationNormalized, from:RouteLocationNormalized) => {
    vNode.component?.exposed.end();
})
