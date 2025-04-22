/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "@/styles/Speech.module.css"; // 确保有对应的 CSS 文件

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

  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [transcripts, setTranscripts] = useState<string[]>([]);
  //   const [error, setError] = useState<string | null>(null);
  const [, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameId = useRef<number>(0);

  const [touchStartY, setTouchStartY] = useState<number>(0);
  //   const [currentY, setCurrentY] = useState<number>(0);

  const [voiceVolume, setVoiceVolume] = useState(0);
  const [vb, setVb] = useState(1);
  const [showTextModel, SetShowTextModel] = useState(false);
  const [countdown, setCountDown] = useState(15);
  let timer: any = null;
  const handleCount = () => {
    if (timer) {
      clearInterval(timer);
    }
    setCountDown(15);
    timer = setInterval(() => {
      setCountDown((pre) => pre - 1);
    }, 1000);
  };
  useEffect(() => {
    if (countdown === 0) {
      cancelText();
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
    };
    // 在初始化时添加 soundstart/speechstart 检测
    recognition.addEventListener("soundstart", () => {
      console.log("检测到声音输入");
    });

    recognition.addEventListener("speechstart", () => {
      console.log("检测到有效语音");
    });

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
      handleCount();
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
      setInterval(() => {
        analyser.getByteFrequencyData(dataArray); // 获取当前频率数据（0-255）
        const volume = Math.max(...dataArray); // 计算当前音量（取最大值）
        // console.log("音量:", volume);
        setVoiceVolume(volume);
      }, 100); // 每 100ms 检测一次音量
    } catch (err: any) {
      // 处理麦克风访问失败的情况
      console.error(err);
      setError("无法访问麦克风，请检查权限设置");
    }
  };

  // 控制录音
  const startRecording = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      initializeAudioAnalyser();
      recognitionRef.current.start();
    } catch (error) {
      console.error("麦克风访问失败:", error);
      cleanupResources();
    }
  }, []);

  useEffect(() => {
    if (recordingState === "idle" && transcripts.length > 0) {
      SetShowTextModel(true);
    } else {
      SetShowTextModel(false);
    }
  }, [transcripts, recordingState]);
  // 处理触摸开始
  const handleStart = useCallback(
    (clientY: number) => {
      setTouchStartY(clientY);
      //   setCurrentY(clientY);
      startRecording();
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
    if (res < 0.2) {
      setVb(1);
    } else if (res < 0.4) {
      setVb(2);
    } else if (res < 0.6) {
      setVb(3);
    } else if (res < 0.8) {
      setVb(4);
    } else {
      setVb(5);
    }
  }, [voiceVolume]);

  // 事件处理器
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientY);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return; // 确保左键按下
    handleMove(e.clientY);
  };

  const cancelText = () => {
    setTranscripts([]);
  };
  const sendText = () => {
    onSend?.(transcripts.join("")); // 调用外部传入的 onResult 回调（如果有）
  };
  // 处理结束
  const handleEnd = useCallback(() => {
    if (recordingState === "cancelled") {
      recognitionRef.current?.stop();
      cleanupResources();
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
    handleEnd();
  };
  // 渲染UI
  return (
    <div>
      {recordingState === "recording" ? (
        <div className={styles.contain}>
          <img className={styles.v} alt="" src={`/img/v${vb}.svg`} />
          <div className={styles.text}>Release to send swipe up to cancel</div>
        </div>
      ) : recordingState === "cancelled" ? (
        <div className={styles.contain}>
          <img className={styles.v} alt="" src={`/img/vcancel.svg`} />
          <div className={styles.text}>Release to send swipe up to cancel</div>
        </div>
      ) : (
        <></>
      )}
      {showTextModel ? (
        <div className={styles.textback}>
          <div className={styles.vtext}> {transcripts} </div>
          <div className={styles.textbackfoot}>
            <div className={styles.countdown}>{countdown}s</div>
            <div className={styles.btncontain}>
              <div className={styles.cancel} onClick={cancelText}>
                Cancel
              </div>
              <div className={styles.send} onClick={sendText}>
                Send
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <img
        className={styles.icon}
        src="/img/speak.min.png"
        alt=""
        onTouchStart={handleTouchStart}
        onMouseDown={handleMouseDown}
        onTouchMove={handleTouchMove}
        onMouseMove={handleMouseMove}
        onTouchEnd={handleEndEvent}
        onMouseUp={handleEndEvent}
        onMouseLeave={handleEndEvent}
      />
    </div>
  );
};
export default SpeechRecognition;
