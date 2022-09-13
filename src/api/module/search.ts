import http from "../index";


// 自动补全
export const getSuggest = (dto: any) => {
    return http.get('search/getSuggest', {params: dto})
}

// 搜索
export const getSearchList = (dto: any, pageNum: number) => {
    return http.post('search/list', dto, {
        headers: {
            "pageNum": pageNum || 1,
        }
    })
}

// 详情
export const getDetail = (id: string) => {
    return http.get('search/detail/' + id)
}

// 飞花令
export const getFlyFlower = (text: any, pageNum: number) => {
    return http.get('search/flyFlower', {
        params: {text: text},
        headers: {
            "pageNum": pageNum || 1,
        }
    })
}