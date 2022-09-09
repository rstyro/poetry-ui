import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

// axios 配置
const config: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL,
    // 定义请求超时时间
    timeout: 60000,
    // 请求带上 cookie
    withCredentials: true,
    // 定义消息头
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        "token": "rstyro",
        "pageNum":1,
        "pageSize":10
    }
}
// 创建 axios 实例
const http = axios.create(config);


// 定义请求拦截
http.interceptors.request.use(
    (config:AxiosRequestConfig) => {
        return config;
    },
    (error) => {
        ElMessage.error('请求失败，请检查你的参数!');
        Promise.reject(error);
    }
)

// 请求返回拦截
http.interceptors.response.use(
    (response:AxiosResponse) => {
        const res = response.data;
        if(res.code != 200){
            ElMessage.error(res.msg);
        }
        // 响应数据
        return res;
    },
    (error) => {
        ElMessage.error('请求接口失败，请检查你的网络!');
        return Promise.reject(error);
    }
)

export default http;
