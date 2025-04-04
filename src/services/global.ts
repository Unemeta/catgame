import { request } from "@/utils/request";



/** 获取用户信息 */
export function getUserInfo() {
    return request({
        url: "/cat/v1/user/user/info",
        method: "post",
    });
}