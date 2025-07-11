
import { useRef } from "react";
import { debounce } from "lodash";
import * as globalApi from "@/services/global";

// 延迟发送埋点
const useDebouncelog = (event_type: string, event_comment?: string, time: number = 3000) => {
    const debouncelog = useRef(
        debounce(() => {
            if (event_type) {
                globalApi.eventRecord(event_type, event_comment);
            }
            console.log("执行埋点:");
        }, time)
    ).current;
    return debouncelog
}

export default useDebouncelog