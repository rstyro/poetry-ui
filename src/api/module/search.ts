import http from "../index";


// 自动补全
export const getSuggest =(dto:any)=>{
    return http.get('search/getSuggest', {params:dto})
}

// 搜索
export const getSearchList =(dto:any)=>{
    return http.post('search/list',dto)
}
