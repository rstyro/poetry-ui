import {defineStore} from "pinia";

export const useMainStore = defineStore('main', {
    state: () => {
        return {
            theme: true
        }
    },
    persist: {
        enabled: true,
        // 自定义持久化参数
        strategies: [
            {
                // 自定义key
                key: 'theme_store',
                // 自定义存储方式，默认sessionStorage
                storage: localStorage,
                // 指定要持久化的数据，默认所有 state 都会进行缓存，可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
                paths: ['theme'],
            }
        ]
    },
    getters: {
        getTheme(state) {
            return state.theme;
        }
    },
    actions: {
        changeTheme(str:boolean){
            this.theme = str     //action通过this操作state的数据
        }
    }
})