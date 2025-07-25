/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { get } from "lodash-es"
import {
    jwtHelper,
    JWT_HEADER_KEY,
} from './jwt';
import Router from 'next/router'; // 注意不是 useRouter

/** 创建请求实例 */
function createService() {
    // 创建一个 axios 实例
    const service = axios.create()
    // 请求拦截
    service.interceptors.request.use(
        (config) => {
            // 检查请求是否需要认证（默认需要）
            const requiresAuth = (config as any).requiresAuth !== false;

            if (requiresAuth) {
                const token = jwtHelper.getToken();

                // 只有存在有效 token 时才添加认证头
                if (token) {
                    config.headers = config.headers || {};
                    config.headers[JWT_HEADER_KEY] = `Bearer ${token}`;
                }
            }
            return config;
        },
        // 发送失败
        (error) => Promise.reject(error)
    )
    // 响应拦截（可根据具体业务作出相应的调整）
    service.interceptors.response.use(
        (response) => {
            // apiData 是 api 返回的数据
            // const apiData = response.data as any
            // 这个 code 是和后端约定的业务 code
            // const code = apiData.code
            // 如果没有 code, 代表这不是项目后端开发的 api
            // if (code === undefined) {
            //   ElMessage.error("非本系统的接口")
            //   return Promise.reject(new Error("非本系统的接口"))
            // } else {
            //   switch (code) {
            //     case 0:
            //       // code === 0 代表没有错误
            //       return apiData
            //     case 20000:
            //       // code === 20000 代表没有错误
            //       return apiData
            //     default:
            //       // 不是正确的 code
            //       ElMessage.error(apiData.msg || "Error")
            //       return Promise.reject(new Error("Error"))
            //   }
            // }
            return response;
        },
        (error) => {
            // status 是 HTTP 状态码
            const status = get(error, "response.status")
            switch (status) {
                case 400:
                    error.message = "Request Error"
                    break
                case 401:
                    error.message = "Not authorized, please log in"
                    jwtHelper.clearToken()
                    // 避免重定向循环：只在当前不是登录页时才跳转
                    if (Router.pathname !== '/login') {
                        Router.replace('/login');
                    }
                    break
                case 403:
                    // token 过期时，直接退出登录并强制刷新页面（会重定向到登录页）
                    // useUserStoreHook().logout()
                    // location.reload()
                    break
                case 404:
                    error.message = "Request address error"
                    break
                case 408:
                    error.message = "Request timeout"
                    break
                case 500:
                    error.message = "Internal server error"
                    break
                case 501:
                    error.message = "Service not implemented"
                    break
                case 502:
                    error.message = "Gateway Error"
                    break
                case 503:
                    error.message = "Service Unavailable"
                    break
                case 504:
                    error.message = "Gateway timeout"
                    break
                case 505:
                    error.message = "Unsupported HTTP version"
                    break
                default:
                    break
            }
            console.error(error.message)
            return Promise.reject(error)
        }
    )
    return service
}

/** 创建请求方法 */
function createRequestFunction(service: AxiosInstance) {
    return function (config: AxiosRequestConfig & { requiresAuth?: boolean }) {
        const configDefault = {
            headers: {},
            // 默认所有请求都需要认证
            requiresAuth: true,
            timeout: 300000,
            ...config
        }
        return service(Object.assign(configDefault, config))
    }
}

/** 用于网络请求的实例 */
export const service = createService()
/** 用于网络请求的方法 */
export const request = createRequestFunction(service)