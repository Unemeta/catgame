import { request } from "@/utils/request";



/** 获取用户信息 */
export function getUserInfo() {
    return request({
        url: "/api/cat/v1/user/info",
        method: "post",
    });
}

// const (
//         // 图片放大
//         EventTypeZoomIn = 1
//         // 保存图片
//         EventTypeSaveImage = 2
//         // 播放视频
//         EventTypePlayVideo = 3
//         // 保存视频
//         EventTypeSaveVideo = 4

//         // 视频信息
//          EventTypeVideoInfo = 5
// )
/** 埋点数据上报 */
export enum eventType {
    EventTypeZoomIn = 1,
    EventTypeSaveImage = 2,
    EventTypePlayVideo = 3,
    EventTypeSaveVideo = 4,
    EventTypeVideoInfo = 5
}
export function eventRecord(id: number, type: number, videoInfo?: string) {
    return request({
        url: "/api/cat/v1/chat/event/record",
        method: "post",
        data: {
            eventId: id,
            type,
            videoInfo
        }
    });
}


