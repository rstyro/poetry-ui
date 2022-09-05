import http from "../index";


// 自动补全
export const getSuggest =(dto:any)=>{
    return http.get('search/getSuggest', {params:dto})
}

// 搜索
export const getSearchList =(dto:any)=>{
    return http.post('search/list',dto)
}

// 详情
export const getDetail =(id:string)=>{
    return http.get('search/detail/'+id)
}
