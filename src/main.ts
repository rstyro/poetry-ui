import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
createApp(App).use(router).mount('#app')


// 路由前置拦截器
router.beforeEach((to, from, next) => {
    if(to.path==="/search" && to.query.q){
        // 把搜索的内容变成标题
        document.title=to.query.q;
    }
    next();
})
