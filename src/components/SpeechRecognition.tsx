/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef, useCallback } from "react";
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
  language?: "zh-CN" | "en-US" | "ja-JP";
  onResult?: (text: string) => void;
  onError?: (error: string) => void;
  onCancel?: () => void;
  onSend?: (text: string) => void;
}

type RecordingState = "idle" | "recording" | "cancelled";

const SpeechRecognition: React.FC<SpeechRecognitionProps> = ({
  language = "zh-CN",
  onResult,
  onError,
  onCancel,
  onSend,
}) => {
  // 状态管理
  //   const [isRecording, setIsRecording] = useState(false);
  const [, setShowVoice] = useShowVocie();

  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [transcripts, setTranscripts] = useState<string[]>([]);
  //   const [error, setError] = useState<string | null>(null);
  const [, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameId = useRef<number>(0);

  const longPressTimer = useRef<any>(null);
  const [isLongPress, setIsLongPress] = useState(false);

  const [touchStartY, setTouchStartY] = useState<number>(0);

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
      // cancelText();
      handleEnd();
    }
  }, [countdown]);
  // 初始化语音识别
  const initializeRecognition = useCallback(() => {
    // 获取浏览器支持的 SpeechRecognition 对象（兼容不同浏览器的前缀）
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    // 检查浏览器是否支持语音识别
    if (!SpeechRecognition) {
      setError("浏览器不支持语音识别功能");
      return;
    }

    // 创建语音识别实例
    const recognition = new SpeechRecognition();

    // 配置识别模式
    recognition.continuous = true; // 持续监听，直到手动停止
    recognition.interimResults = true; // 不返回中间结果（只返回最终识别结果）
    recognition.lang = language; // 设置识别语言（如 'zh-CN', 'en-US'）
    recognition.maxAlternatives = 3; // 提高容错率

    // 语音识别开始时的回调
    recognition.onstart = () => {
      console.log("onstart");
      setRecordingState("recording");
      handleCount();
    };
    // 在初始化时添加 soundstart/speechstart 检测
    recognition.addEventListener("soundstart", () => {
      console.log("检测到声音输入");
    });

    recognition.addEventListener("speechstart", () => {
      console.log("检测到有效语音");
    });

    // // 语音识别结果的回调
    // recognition.onresult = (event: any) => {
    //   // 提取所有识别结果并合并为字符串
    //   const result = event.results[event.resultIndex];
    //   if (result.isFinal) {
    //     const transcript = result[0].transcript;
    //     setTranscripts(() => [transcript]);
    //     onResult?.(transcript);
    //     console.log(transcript, "onresult");
    //   }
    // };
    // 语音识别结果的回调
    recognition.onresult = (event: any) => {
      // 提取所有识别结果并合并为字符串
      console.log(event, "onresult");
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join("");
      //   setTranscripts((prev) => [...prev, transcript]); // 更新识别结果列表
      setTranscripts(() => [transcript]); // 更新识别结果列表
      onResult?.(transcript); // 调用外部传入的 onResult 回调（如果有）
      console.log(transcript, "onresult");
    };

    // 识别错误的回调
    recognition.onerror = (event: Event) => {
      const error = (event as any).error;
      // 根据错误类型处理
      switch (error) {
        case "no-speech":
          console.log("未检测到语音输入");
          break;
        case "network":
          console.log("网络连接失败");
          break;
        case "not-allowed":
          console.log("请允许麦克风权限");
          break;
      }
      setError(`识别错误: ${error}`); // 设置错误信息
      onError?.(error); // 调用外部传入的 onError 回调（如果有）
    };

    // 识别结束的回调
    recognition.onend = () => {
      setRecordingState("idle");
      console.log("onend");
    };

    // 将 recognition 实例保存到 React ref 中，以便后续控制（如启动/停止）
    recognitionRef.current = recognition;
  }, [language, onResult, onError]);

  // 初始化音频分析
  const initializeAudioAnalyser = async () => {
    try {
      // 请求麦克风权限并获取音频流
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // 创建音频上下文（用于处理音频分析）
      const audioContext = new window.AudioContext();

      // 创建音频分析器节点
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 32; // 设置 FFT 窗口大小（影响频率分析的精度）

      // 将麦克风音频流连接到分析器
      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);

      // 将音频相关对象保存到 React ref 中，以便后续使用或清理
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      microphoneRef.current = microphone;

      // 实时音量检测逻辑
      const dataArray = new Uint8Array(analyser.frequencyBinCount); // 创建用于存储频率数据的数组
      clearInterval(voicetimer.current);
      voicetimer.current = setInterval(() => {
        analyser.getByteFrequencyData(dataArray); // 获取当前频率数据（0-255）
        const volume = Math.max(...dataArray); // 计算当前音量（取最大值）
        setVoiceVolume(volume);
      }, 100); // 每 100ms 检测一次音量
    } catch (err: any) {
      // 处理麦克风访问失败的情况
      console.error(err);
      setError("无法访问麦克风，请检查权限设置");
    }
  };

  const isStarting = useRef(false);

  // 控制录音
  const startRecording = useCallback(() => {
    if (!recognitionRef.current || isStarting.current) return;
    isStarting.current = true;
    try {
      if (recordingState === "recording") return;
      initializeAudioAnalyser();
      recognitionRef.current.start();
    } catch (error) {
      console.error("麦克风访问失败:", error);
      cleanupResources();
    } finally {
      setTimeout(() => {
        isStarting.current = false;
      }, 1000); // 解锁，防止误触连发
    }
  }, []);

  useEffect(() => {
    if (recordingState === "idle" && transcripts.length) {
      sendText();
    }
  }, [recordingState]);
  // 处理触摸开始
  const handleStart = useCallback(
    (clientY: number) => {
      setTouchStartY(clientY);
      //   setCurrentY(clientY);
      longPressTimer.current = window.setTimeout(() => {
        setIsLongPress(true);
        // executeLongPressAction();
        startRecording();
      }, LONG_PRESS_DURATION);
    },
    [startRecording]
  );
  // 处理移动
  const handleMove = useCallback(
    (clientY: number) => {
      //   setCurrentY(clientY);
      const deltaY = touchStartY - clientY;
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
  // 清理资源
  const cleanupResources = useCallback(() => {
    microphoneRef.current?.disconnect();
    analyserRef.current?.disconnect();
    audioContextRef.current?.close();
    cancelAnimationFrame(animationFrameId.current);
    if (voicetimer.current) {
      clearInterval(voicetimer.current);
      voicetimer.current = null;
    }
  }, []);

  // 组件挂载时初始化
  useEffect(() => {
    initializeRecognition();
    return () => {
      recognitionRef.current?.stop();
      cleanupResources();
    };
  }, [initializeRecognition, cleanupResources]);

  useEffect(() => {
    const res = voiceVolume / 255;
    console.log(res);

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

  const cancelText = () => {
    setTranscripts([]);
  };
  const sendText = () => {
    setTimeout(() => {
      cancelText();
    }, 500);
    const message = transcripts.join("");
    if (message) {
      onSend?.(message); // 调用外部传入的 onResult 回调（如果有）
    }
  };
  // 处理结束
  const handleEnd = useCallback(() => {
    if (recordingState === "cancelled") {
      recognitionRef.current?.stop();
      cleanupResources();
      cancelText(); // 清空转录内容，避免误发送
      setRecordingState("idle");
      return;
    }

    if (recordingState === "recording") {
      recognitionRef.current?.stop();
      setRecordingState("idle");
    }
  }, [recordingState, cleanupResources]);
  // 通用结束处理
  const handleEndEvent = () => {
    console.log('handleEndEvent');
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
    };
  }, []);

  useEffect(() => {
    // const globalEndHandler = () => {
    //   handleEndEvent();
    // };
    // window.addEventListener("touchend", globalEndHandler);
    // window.addEventListener("mouseup", globalEndHandler);
    // return () => {
    //   window.removeEventListener("touchend", globalEndHandler);
    //   window.removeEventListener("mouseup", globalEndHandler);
    // };
  }, []);
  // 渲染UI
  return (
    <div>
      {recordingState === "recording" ? (
        <>
          {/* <LottieView
            src={"/lottie/vnormal.json"}
            className={styles.vanimate}
            loop={true}
            ref={vanimateRef}
            speed={speed}
          ></LottieView> */}
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
export default SpeechRecognition;
