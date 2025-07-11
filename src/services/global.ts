import { request } from "@/utils/request";



/** 获取用户信息 */
export function getUserInfo() {
    return request({
        url: "/api/user/info",
        method: "post",
    });
}

export function eventRecord(event_type: string, event_comment?: string) {
    return request({
        url: "/api/user/event",
        method: "post",
        data: {
            event_type,
            event_comment: event_comment || ''
        }
    });
}


