import http from "../index";

// 搜索
export const getSearchList =(dto:any)=>{
    return http.post('search/list',dto)
}
