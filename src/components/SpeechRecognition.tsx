/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef, useCallback } from "react";
import Recorder from "recorder-core"; // 你可以从npm安装这个库
import "recorder-core/src/engine/mp3";
import "recorder-core/src/engine/mp3-engine"; //如果此格式有额外的编码引擎（*-engine.js）的话，必须要加上
import "recorder-core/src/extensions/waveview";
import RecordApp from "recorder-core/src/app-support/app";
import CryptoJS from "crypto-js";

import styles from "@/styles/Speech.module.css"; // 确保有对应的 CSS 文件
import LottieView from "@/components/lottie";
import { cn } from "@/lib/utils";
import { useShowVocie } from "@/store";
import dynamic from "next/dynamic";

// 动态导入禁用 SSR
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);
// 类型定义
interface SpeechRecognitionProps {
  language?: "zh_cn" | "en_us" | "ja_jp";
  onResult?: (text: string) => void;
  onError?: (error: string) => void;
  onCancel?: () => void;
  onSend?: (text: string) => void;
}

type RecordingState = "idle" | "recording" | "cancelled";

const AudioRecorder: React.FC<SpeechRecognitionProps> = ({
  language = "zh_cn",
  onResult,
  onError,
  onCancel,
  onSend,
}) => {
  const [, setShowVoice] = useShowVocie();
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [, setError] = useState<string | null>(null);
  const [y, setY] = useState(0);

  const longPressTimer = useRef<any>(null);
  const [isLongPress, setIsLongPress] = useState(false);

  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [messageContent, setMessage] = useState("");
  const [voiceVolume, setVoiceVolume] = useState(0);
  const [countdown, setCountDown] = useState(15);
  const lottieInstance = useRef<any>(null);

  const voicetimer = useRef<any>(null);
  const countDownTimer = useRef<any>(null);
  // 常量配置
  const LONG_PRESS_DURATION = 700; // 长按判定时间

  // 清理定时器和状态
  const cancelLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = undefined;
    }
    setIsLongPress(false);
  };

  const handleCount = () => {
    clearInterval(countDownTimer.current);
    setCountDown(30);
    countDownTimer.current = setInterval(() => {
      setCountDown((pre) => pre - 1);
    }, 1000);
  };

  useEffect(() => {
    if (countdown === 0) {
      handleEnd();
    }
  }, [countdown]);

  // 处理触摸开始
  const handleStart = useCallback((clientY: number) => {
    setTouchStartY(clientY);
    longPressTimer.current = window.setTimeout(() => {
      setIsLongPress(true);
      startRecording();
    }, LONG_PRESS_DURATION);
  }, []);

  // 处理移动
  const handleMove = useCallback(
    (clientY: number) => {
      //   setCurrentY(clientY);
      const deltaY = touchStartY - clientY;
      setY(deltaY);
      if (deltaY > 50 && recordingState === "recording") {
        setRecordingState("cancelled");
        cancelLongPress();
        onCancel?.();
      } else if (recordingState === "cancelled" && deltaY <= 50) {
        setRecordingState("recording");
      }
    },
    [touchStartY, recordingState, onCancel]
  );

  // 根据音量设置播放速度
  useEffect(() => {
    const res = voiceVolume / 100;
    if (lottieInstance.current) {
      if (res < 0.2) {
        // vanimateRef.current?.setPlayerSpeed(1);
        lottieInstance.current.setSpeed(1);
      } else if (res < 0.4) {
        // vanimateRef.current?.setPlayerSpeed(2);
        lottieInstance.current.setSpeed(2);
      } else if (res < 0.6) {
        // vanimateRef.current?.setPlayerSpeed(3);
        lottieInstance.current.setSpeed(3);
      } else if (res < 0.8) {
        // vanimateRef.current?.setPlayerSpeed(4);
        lottieInstance.current.setSpeed(4);
      } else {
        // vanimateRef.current?.setPlayerSpeed(5);
        lottieInstance.current.setSpeed(5);
      }
    }
  }, [voiceVolume]);

  useEffect(() => {
    if (recordingState === "idle") {
      sendText();
    }
  }, [recordingState]);

  // 事件处理器
  const handleTouchStart = (e: React.PointerEvent) => {
    handleStart(e.clientY);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientY);
  };

  const handleTouchMove = (e: React.PointerEvent) => {
    handleMove(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return; // 确保左键按下
    handleMove(e.clientY);
  };

  // 清空文案
  const cancelText = () => {
    resultTextTempRef.current = "";
    resultTextRef.current = "";
  };

  // 发送文案，需要发送后进行清除
  const sendText = () => {
    setTimeout(() => {
      cancelText();
    }, 500);
    if (messageContent) {
      onSend?.(messageContent); // 调用外部传入的 onResult 回调（如果有）
    }
  };

  // 处理结束
  const handleEnd = useCallback(() => {
    stopRecording();
    if (recordingState === "cancelled") {
      // cleanupResources();
      cancelText(); // 清空转录内容，避免误发送
      setRecordingState("idle");
      return;
    }
    if (recordingState === "recording") {
      setRecordingState("idle");
    }
  }, [recordingState]);

  // 通用结束处理
  const handleEndEvent = () => {
    cancelLongPress();
    if (voicetimer.current) {
      clearInterval(voicetimer.current);
      voicetimer.current = null;
    }
    handleEnd();
  };

  useEffect(() => {
    return () => {
      clearInterval(countDownTimer.current);
      clearInterval(voicetimer.current);
      // 清理 WebSocket 连接
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const [isRecording, setIsRecording] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const pcmBufferRef = useRef<Int16Array>(new Int16Array(0)); //将pcm数据缓冲起来按固定大小切分发送
  const resultTextRef = useRef<string>("");
  const resultTextTempRef = useRef<string>("");
  const lastFrameRef = useRef<any>(null); //最后发送的一帧数据
  const testSampleRate = 16000;
  const testBitRate = 16; //本例子只支持16位pcm，不支持其他值
  const SendFrameSize = 0;

  let send_pcmSampleRate: number; //pcm缓冲的采样率，等于testSampleRate，但取值过大时可能低于配置值
  let send_chunk: null; //SampleData需要的上次转换结果，用于连续转换采样率
  // let send_logNumber;

  const RealTimeSendReset = function () {
    // send_pcmBuffer = new Int16Array(0);
    pcmBufferRef.current = new Int16Array(0);
    send_pcmSampleRate = testSampleRate;
    send_chunk = null;
    // send_lastFrame = null;
    lastFrameRef.current = null;
    // send_logNumber = 0;
  };

  // 科大讯飞配置（建议放在环境变量中）
  const XF_CONFIG = {
    APPID: process.env.NEXT_PUBLIC_XF_APP_ID,
    APIKey: process.env.NEXT_PUBLIC_XF_API_KEY,
    APISecret: process.env.NEXT_PUBLIC_XF_API_SECRET,
    host: "rtasr.xfyun.cn",
    path: "/v2/rtasr",
  };

  const generateWebSocketUrl = () => {
    // 请求地址根据语种不同变化
    let url = "wss://iat-api.xfyun.cn/v2/iat";
    const host = "iat-api.xfyun.cn";
    const apiKey = XF_CONFIG.APIKey;
    const apiSecret = XF_CONFIG.APISecret;
    const date = new Date().toUTCString();
    const algorithm = "hmac-sha256";
    const headers = "host date request-line";
    const signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2/iat HTTP/1.1`;
    const signatureSha = CryptoJS.HmacSHA256(
      signatureOrigin,
      apiSecret as string
    );
    const signature = CryptoJS.enc.Base64.stringify(signatureSha);
    const authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
    const authorization = btoa(authorizationOrigin);
    url = `${url}?authorization=${authorization}&date=${date}&host=${host}`;
    return url;
  };

  useEffect(() => {}, []);

  //连接websocket语音，初始和websocket断开后执行
  const connectWebSocket = () => {
    const url = generateWebSocketUrl();
    if (!wsRef.current) {
      wsRef.current = new WebSocket(url);
      wsRef.current.onopen = () => {
        console.log("WebSocket连接成功");
        // 首次连接
        const params = {
          common: {
            app_id: process.env.NEXT_PUBLIC_XF_APP_ID,
          },
          business: {
            // language: "zh_cn",
            language: language,
            domain: "iat",
            accent: "mandarin",
            vad_eos: 5000,
            dwa: "wpgs",
          },
          data: {
            status: 0,
            format: "audio/L16;rate=16000",
            encoding: "raw",
          },
        };
        wsRef.current?.send(JSON.stringify(params));
      };
      wsRef.current.onerror = (err) => {
        console.error("WebSocket错误:", err);
        // wsRef.current = null;
      };

      wsRef.current.onclose = (err) => {
        console.log("WebSocket关闭:", err);
        stopRecording();
        wsRef.current = null;
      };
      wsRef.current.onmessage = (event) => {
        // 识别结束
        const jsonData = JSON.parse(event.data);
        if (jsonData.data && jsonData.data.result) {
          const data = jsonData.data.result;
          let str = "";
          const ws = data.ws;
          for (let i = 0; i < ws.length; i++) {
            str = str + ws[i].cw[0].w;
          }
          // 开启wpgs会有此字段(前提：在控制台开通动态修正功能)
          // 取值为 "apd"时表示该片结果是追加到前面的最终结果；取值为"rpl" 时表示替换前面的部分结果，替换范围为rg字段
          if (data.pgs) {
            if (data.pgs === "apd") {
              // 将resultTextTemp同步给resultText
              resultTextRef.current = resultTextTempRef.current;
            }
            // 将结果存储在resultTextTemp中
            resultTextTempRef.current = resultTextRef.current + str;
          } else {
            resultTextRef.current = resultTextRef.current + str;
          }
          const innerText =
            resultTextTempRef.current || resultTextRef.current || "";
          setMessage(innerText);
          console.log(innerText);
        }
      };
    }
  };

  /**请求录音权限，Start调用前至少要调用一次RequestPermission**/
  const recReq = function (success?: () => void) {
    //RecordApp.RequestPermission_H5OpenSet={ audioTrackSet:{ noiseSuppression:true,echoCancellation:true,autoGainControl:true } }; //这个是Start中的audioTrackSet配置，在h5中必须提前配置，因为h5中RequestPermission会直接打开录音

    RecordApp.RequestPermission(
      function () {
        //注意：有使用到H5录音时，为了获得最佳兼容性，建议RequestPermission、Start至少有一个应当在用户操作（触摸、点击等）下进行调用
        if (success) {
          success();
        }
      },
      function (msg: string, isUserNotAllow: boolean) {
        //用户拒绝未授权或不支持
        console.log(
          (isUserNotAllow ? "UserNotAllow，" : "") + "无法录音:" + msg
        );
      }
    );
  };

  /**开始录音**/
  const startRecording = function () {
    if (!wsRef.current) {
      connectWebSocket();
    }
    let processTime = 0;
    let clearBufferIdx = 0;
    RealTimeSendReset();
    recReq();
    setRecordingState("recording");
    handleCount();
    setIsRecording(true);
    //开始录音的参数和Recorder的初始化参数大部分相同
    RecordApp.Start(
      {
        type: "mp3",
        sampleRate: 16000,
        bitRate: 16, //mp3格式，指定采样率hz、比特率kbps，其他参数使用默认配置；注意：是数字的参数必须提供数字，不要用字符串；需要使用的type类型，需提前把格式支持文件加载进来，比如使用wav格式需要提前加载wav.js编码引擎
        /*,audioTrackSet:{ //可选，如果需要同时播放声音（比如语音通话），需要打开回声消除（打开后声音可能会从听筒播放，部分环境下（如小程序、uni-app原生接口）可调用接口切换成扬声器外放）
          //注意：H5中需要在请求录音权限前进行相同配置RecordApp.RequestPermission_H5OpenSet后此配置才会生效
          echoCancellation:true,noiseSuppression:true,autoGainControl:true} */
        onProcess: function (
          buffers: null[],
          powerLevel: any,
          bufferDuration: any,
          bufferSampleRate: any,
          newBufferIdx: number,
          asyncEnd: any
        ) {
          //录音实时回调，大约1秒调用12次本回调，buffers为开始到现在的所有录音pcm数据块(16位小端LE)
          //可实时上传（发送）数据，可实时绘制波形，ASR语音识别，使用可参考Recorder
          processTime = Date.now();
          console.log(powerLevel, "powerLevel");
          setVoiceVolume(powerLevel); // 设置音量
          for (let i = clearBufferIdx; i < newBufferIdx; i++) {
            buffers[i] = null;
          }
          clearBufferIdx = newBufferIdx;
          RealTimeSendTry(buffers, bufferSampleRate, false);
        },

        //...  不同环境的专有配置，根据文档按需配置
      },
      function () {
        //开始录音成功
        console.log("开始录音成功");

        //【稳如老狗WDT】可选的，监控是否在正常录音有onProcess回调，如果长时间没有回调就代表录音不正常
        const this_ = RecordApp; //有this就用this，没有就用一个全局对象
        if (RecordApp.Current.CanProcess()) {
          const wdt = (this_.watchDogTimer = setInterval(function () {
            if (wdt != this_.watchDogTimer) {
              clearInterval(wdt);
              return;
            } //sync
            if (Date.now() < this_.wdtPauseT) return; //如果暂停录音了就不检测：puase时赋值this_.wdtPauseT=Date.now()*2（永不监控），resume时赋值this_.wdtPauseT=Date.now()+1000（1秒后再监控）
            if (Date.now() - (processTime || startTime) > 1500) {
              clearInterval(wdt);
              console.error(processTime ? "录音被中断" : "录音未能正常开始");
              // ... 错误处理，关闭录音，提醒用户
            }
          }, 1000));
        } else {
          console.warn("当前环境不支持onProcess回调，不启用watchDogTimer"); //目前都支持回调
        }
        const startTime = Date.now();
        this_.wdtPauseT = 0;
      },
      function (msg: string) {
        console.log("开始录音失败：" + msg);
      }
    );
  };

  //=====实时处理核心函数==========
  const RealTimeSendTry = function (
    buffers: string | any[],
    bufferSampleRate: any,
    isClose: boolean
  ) {
    //提取出新的pcm数据
    let pcm = new Int16Array(0);
    if (buffers.length > 0) {
      //【关键代码】借用SampleData函数进行数据的连续处理，采样率转换是顺带的，得到新的pcm数据
      const chunk = Recorder.SampleData(
        buffers,
        bufferSampleRate,
        testSampleRate,
        send_chunk
      );
      send_chunk = chunk;
      pcm = chunk.data; //此时的pcm就是原始的音频16位pcm数据（小端LE），直接保存即为16位pcm文件、加个wav头即为wav文件、丢给mp3编码器转一下码即为mp3文件
      send_pcmSampleRate = chunk.sampleRate; //实际转换后的采样率，如果testSampleRate值比录音数据的采样率大，将会使用录音数据的采样率
    }

    //没有指定固定的帧大小，直接把pcm发送出去即可
    if (!SendFrameSize) {
      TransferUpload(pcm, isClose);
      return;
    }

    //先将新的pcm写入缓冲，再按固定大小切分后发送
    let pcmBuffer = pcmBufferRef.current;
    const tmp = new Int16Array(pcmBuffer.length + pcm.length);
    tmp.set(pcmBuffer, 0);
    tmp.set(pcm, pcmBuffer.length);
    pcmBuffer = tmp;

    //循环切分出固定长度的数据帧
    const chunkSize = SendFrameSize / (testBitRate / 8);
    while (true) {
      //切分出固定长度的一帧数据
      if (pcmBuffer.length >= chunkSize) {
        const frame = new Int16Array(pcmBuffer.subarray(0, chunkSize));
        pcmBuffer = new Int16Array(pcmBuffer.subarray(chunkSize));

        let closeVal = false;
        if (isClose && pcmBuffer.length == 0) {
          closeVal = true; //已关闭录音，且没有剩余要发送的数据了
        }
        TransferUpload(frame, closeVal);
        if (!closeVal) continue; //循环切分剩余数据
      } else if (isClose) {
        //已关闭录音，但此时结尾剩余的数据不够一帧长度，结尾补0凑够一帧即可，或者直接丢弃结尾的这点数据
        const frame = new Int16Array(chunkSize);
        frame.set(pcmBuffer);
        pcmBuffer = new Int16Array(0);
        TransferUpload(frame, true);
      }
      break;
    }
    //剩余数据存回去，留给下次发送
    pcmBufferRef.current = pcmBuffer;
  };

  //=====数据传输函数==========
  const TransferUpload = function (
    pcmFrame: Int16Array<any>,
    isClose: boolean
  ) {
    if (isClose && pcmFrame.length == 0) {
      //最后一帧数据，在没有指定固定的帧大小时，因为不是从onProcess调用的，pcmFrame的长度为0没有数据。可以修改成复杂一点的逻辑：停止录音时不做任何处理，等待下一次onProcess回调时再调用实际的停止录音，这样pcm就一直数据了；或者延迟一帧的发送，isClose时取延迟的这帧作为最后一帧
      //这里使用简单的逻辑：直接生成一帧静默的pcm（全0），使用上一帧的长度或50ms长度
      //return; //如果不需要处理最后一帧数据，直接return不做任何处理

      // const len = send_lastFrame
      //   ? send_lastFrame.length
      //   : Math.round((send_pcmSampleRate / 1000) * 50);

      const len = lastFrameRef.current
        ? lastFrameRef.current.length
        : Math.round((send_pcmSampleRate / 1000) * 50);

      pcmFrame = new Int16Array(len);
    }
    lastFrameRef.current = pcmFrame;

    //*********发送方式一：Base64文本发送***************
    let str = "";
    const bytes = new Uint8Array(pcmFrame.buffer);
    for (let i = 0, L = bytes.length; i < L; i++)
      str += String.fromCharCode(bytes[i]);
    const base64 = btoa(str);
    // console.log("发送pcm数据:", wsRef.current);
    if (wsRef.current?.readyState === 1) {
      wsRef.current?.send(
        JSON.stringify({
          data: {
            status: pcmFrame ? 1 : 2,
            format: "audio/L16;rate=16000",
            encoding: "raw",
            audio: base64,
          },
        })
      );
    }

    // wsRef.current.send("--end--");
    //可以实现
    //最后一次调用发送，此时的pcmFrame可以认为是最后一帧
    if (isClose) {
      console.log("已停止传输");
    }
  };

  /**停止录音，清理资源**/
  const stopRecording = function () {
    const this_ = RecordApp;
    this_.watchDogTimer = 0; //停止监控onProcess超时
    setIsRecording(false);
    resultTextTempRef.current = "";
    resultTextRef.current = "";
    RecordApp.Stop(
      function (arrayBuffer: BlobPart, duration: string, mime: any) {
        //arrayBuffer就是录音文件的二进制数据，不同平台环境下均可进行播放、上传
        console.log(arrayBuffer, mime, "时长:" + duration + "ms");
        // console.dir(arrayBuffer,'arrayBuffer.buffer')
        //如果当前环境支持Blob，也可以直接构造成Blob文件对象，和Recorder使用一致
        if (typeof Blob != "undefined" && typeof window == "object") {
          const blob = new Blob([arrayBuffer], { type: mime });
          console.log(blob, (window.URL || webkitURL).createObjectURL(blob));
        }
      },
      function (msg: string) {
        console.log("录音失败:" + msg);
      }
    );
  };

  return (
    <div>
      {recordingState === "recording" ? (
        <>
          <Player
            src={"/lottie/vnormal.json"}
            className={styles.vanimate}
            loop={true}
            lottieRef={(instance) => {
              lottieInstance.current = instance;
            }}
            autoplay={true}
          ></Player>

          <div className={styles.vanimateText}>
            Recording ends in {countdown} seconds.
          </div>
          <div className={styles.status}>
            <img className={styles.statusIcon} alt="" src={`/img/sendv.svg`} />
            <div className={styles.statusText}>Release to send</div>
          </div>
        </>
      ) : recordingState === "cancelled" ? (
        <div className={styles.status}>
          <img className={styles.statusIcon} alt="" src={`/img/cancelv.svg`} />
          <div className={styles.statusText}>Swipe up to cancel</div>
        </div>
      ) : (
        <></>
      )}

      <div className={styles.container}>
        <div style={{ color: "red" }}>{y}</div>

        <div
          onPointerDown={handleTouchStart}
          onPointerMove={handleTouchMove}
          onPointerUp={handleEndEvent}
          onPointerCancel={handleEndEvent}
          onMouseDown={handleMouseDown}
          onKeyUp={handleEndEvent}
          onMouseMove={handleMouseMove}
          onMouseUp={handleEndEvent}
          onMouseLeave={handleEndEvent}
        >
          {recordingState === "recording" ? (
            <div className={cn(styles.input, styles.inputActive)}>
              <img
                src="/img/recording.png"
                alt=""
                className={styles.recording}
              />
            </div>
          ) : recordingState === "cancelled" ? (
            <div className={cn(styles.input, styles.inputCancel)}>
              <img
                src="/img/recording.png"
                alt=""
                className={styles.recording}
              />
            </div>
          ) : (
            <div className={"sendInputWrap"}>
              <div className={styles.recordText}>Press and hold to speak</div>
            </div>
          )}
        </div>
        <div className={styles.newIcon} onClick={() => setShowVoice(false)}>
          <LottieView src={"/lottie/v4.json"} loop={true}></LottieView>
        </div>
      </div>
    </div>
  );
};

export default AudioRecorder;
