/* eslint-disable @typescript-eslint/no-explicit-any */
export const record = () => {
    // 检查浏览器兼容性
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

        // 设置语言（支持中文、日语、英语等）
        recognition.lang = 'zh-CN'; // 或 'ja-JP', 'en-US'

        // 开始识别
        recognition.start();

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            console.log('识别结果:', transcript);
        };

        recognition.onerror = (event: any) => {
            console.error('识别错误:', event.error);
        };
    } else {
        console.error('当前浏览器不支持语音识别');
    }
}