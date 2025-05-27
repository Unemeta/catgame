// 下载视频或者图片
const downloadMedia = async (url: string, filename: string) => {
    const response = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`)
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename; // 设置下载文件名
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
}


const downloadMp4 = async (url: string, filename: string) => {
    const response = await fetch(`/api/mp4?url=${encodeURIComponent(url)}`)
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename; // 设置下载文件名
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
}
export { downloadMedia, downloadMp4 }