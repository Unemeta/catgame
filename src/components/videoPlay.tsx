import { useEffect, useRef } from "react";

interface iVideoPlayView {
  msg_id: string;
  msg: string;
}
const VideoPlayView = ({ msg_id, msg }: iVideoPlayView) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const videoRef = useRef<any>(null);

  useEffect(() => {
    const handleControlClick = (event) => {
      // 判断是否点击了控件内的元素
      if (event.target.closest(".video-controls")) {
        console.log("视频控件被点击:", event.target);
        // 根据需要添加其他逻辑
      }
    };
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement?.addEventListener("click", handleControlClick);
    }
    return () => {
      if (videoElement) {
        videoElement?.removeEventListener("click", handleControlClick);
      }
    };
  }, []);

  const handlePlay = (id: string) => {
    console.log(`视频 ${id} 开始播放`);
  };

  const handlePause = (id: string) => {
    console.log(`视频 ${id} 已暂停`);
  };

  const handleEnded = (id: string) => {
    console.log(`视频 ${id} 播放结束`);
  };

  const handleTimeUpdate = (id: string, currentTime: string) => {
    // console.log(`视频 ${id} 当前播放时间: ${currentTime}`);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnError = (id: string, e: any) => {
    console.log(`error ${id} ${JSON.stringify(e)}`);
  };
  const onResizeCb = (id: string) => {
    console.log(`onResizeCb ${id} `);
  };
  const onRateChangeCb = (id: string) => {
    console.log(`onRateChangeCb ${id} `);
  };
  const onSeekedCb = (id: string) => {
    console.log(`onSeekedCb ${id} `);
  };
  const onVolumeChangeCb = (id: string) => {
    console.log(`onVolumeChangeCb ${id} `);
  };

  // const handleFullscreen = () => {
  //   if (videoRef.current) {
  //     if (videoRef.current.requestFullscreen) {
  //       videoRef.current.requestFullscreen();
  //     } else if (videoRef.current.webkitRequestFullscreen) {
  //       // Safari
  //       videoRef.current.webkitRequestFullscreen();
  //     } else if (videoRef.current.msRequestFullscreen) {
  //       // IE
  //       videoRef.current.msRequestFullscreen();
  //     }
  //     console.log("进入全屏");
  //   }
  // };
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = msg;
    link.download = "video.mp4";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log("下载视频");
  };
  // const handlePlayPause = () => {
  //   if (videoRef.current.paused) {
  //     videoRef.current.play();
  //   } else {
  //     videoRef.current.pause();
  //   }
  // };
  return (
    <div className="relative">
      <video
        ref={videoRef}
        controls
        onPlay={() => handlePlay(msg_id)}
        onPause={() => handlePause(msg_id)}
        onEnded={() => handleEnded(msg_id)}
        onResize={() => onResizeCb(msg_id)}
        onRateChange={() => onRateChangeCb(msg_id)}
        onSeeked={() => onSeekedCb(msg_id)}
        onVolumeChange={() => onVolumeChangeCb(msg_id)}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onTimeUpdate={(e: any) =>
          handleTimeUpdate(msg_id, e.target.currentTime)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError={(e: any) => handleOnError(msg_id, e)}
      >
        <source src={msg} type="video/mp4" />
        您的浏览器不支持 HTML5 视频标签
      </video>
      <div className="absolute right-0 bottom-0 flex justify-end items-center videoTool">
        {/* <div className="videoToolItem" onClick={handlePlayPause}>
          {videoRef.current && !videoRef.current.paused ? "暂停" : "播放"}
        </div> */}
        {/* <div className="videoToolItem" onClick={handleFullscreen}>全屏</div> */}
        <div className="videoToolItem" onClick={handleDownload}>下载</div>
      </div>
    </div>
  );
};
export default VideoPlayView;
