
// 分 秒
export function formatSecondsToTime(seconds: number) {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    return `${hours}:${minutes}`;
}

// 格式化时间为 时:分:秒
export const formatHourTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

// 格式化时间为 时:
export function getHours(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    return `${String(hours).padStart(2, '0')}`;
}


// 返回两位分钟（自动补零）
export function getMinutes(seconds: number) {
    const remainingSeconds = seconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    return `${String(minutes).padStart(2, '0')}`;
}