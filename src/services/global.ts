import { request } from "@/utils/request";



/** 获取用户信息 */
export function getUserInfo() {
    return request({
        url: "/api/cat/v1/user/info",
        method: "post",
    });
}

export function eventRecord(event_type: string, event_comment?: string) {
    return request({
        url: "/api/cat/v1/user/event",
        method: "post",
        data: {
            event_type,
            event_comment
        }
    });
}


