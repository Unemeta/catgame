import { request } from "@/utils/request";



/** 获取用户信息 */
export function getUserInfo() {
    return request({
        url: "/api/cat/v1/user/info",
        method: "post",
    });
}