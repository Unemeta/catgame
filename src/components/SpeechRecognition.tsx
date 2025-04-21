/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "@/styles/Speech.module.css"; // 确保有对应的 CSS 文件

// 类型定义
interface SpeechRecognitionProps {
  language?: "zh-CN" | "en-US" | "ja-JP";
  buttonStyle?: React.CSSProperties;
  onResult?: (text: string) => void;
  onError?: (error: string) => void;
}

const SpeechRecognition: React.FC<SpeechRecognitionProps> = ({
  language = "zh-CN",
  onResult,
  onError,
}) => {
  // 状态管理
  const [isRecording, setIsRecording] = useState(false);
  const [transcripts, setTranscripts] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [voiceVolume, setVoiceVolume] = useState(0);
  const [vb, setVb] = useState(1);
  const recognitionRef = useRef(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameId = useRef<number>(0);

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
    recognition.interimResults = false; // 不返回中间结果（只返回最终识别结果）
    recognition.lang = language; // 设置识别语言（如 'zh-CN', 'en-US'）

    // 语音识别开始时的回调
    recognition.onstart = () => {
      console.log("onstartonstartonstartonstart");
      setIsRecording(true); // 设置录音状态为 true
    };

    // 语音识别结果的回调
    recognition.onresult = (event: any) => {
      // 提取所有识别结果并合并为字符串
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join("");
      setTranscripts((prev) => [...prev, transcript]); // 更新识别结果列表
      onResult?.(transcript); // 调用外部传入的 onResult 回调（如果有）
      console.log(transcript, "transcripttranscripttranscripttranscript");
    };

    // 识别错误的回调
    recognition.onerror = (event: Event) => {
      const error = (event as any).error;
      setError(`识别错误: ${error}`); // 设置错误信息
      onError?.(error); // 调用外部传入的 onError 回调（如果有）
    };

    // 识别结束的回调
    recognition.onend = () => setIsRecording(false);

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

  //   // 音量波动动画
  //   const startVisualization = () => {
  //     const bars = Array.from(document.getElementsByClassName('bar'));
  //     const analyser = analyserRef.current;
  //     const dataArray = new Uint8Array(analyser?.frequencyBinCount || 0);

  //     const updateBars = () => {
  //       if (!isRecording || !analyser) {
  //         cancelAnimationFrame(animationFrameId.current);
  //         return;
  //       }

  //       analyser.getByteFrequencyData(dataArray);

  //       bars.forEach((bar, index) => {
  //         const height = (dataArray[index] / 255) * 50 + 5;
  //         (bar as HTMLElement).style.height = `${height}px`;
  //       });

  //       animationFrameId.current = requestAnimationFrame(updateBars);
  //     };

  //     updateBars();
  //   };

  // 清理资源
  const cleanupResources = () => {
    microphoneRef.current?.disconnect();
    analyserRef.current?.disconnect();
    audioContextRef.current?.close();
    cancelAnimationFrame(animationFrameId.current);
  };

  // 控制录音
  const toggleRecording = () => {
    if (!recognitionRef.current) return;

    if (!isRecording) {
      initializeAudioAnalyser();
      recognitionRef.current.start();
    } else {
      recognitionRef.current.stop();
      cleanupResources();
    }
  };

  // 组件挂载时初始化
  useEffect(() => {
    initializeRecognition();
    return () => {
      recognitionRef.current?.stop();
      cleanupResources();
    };
  }, [initializeRecognition]);

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
  // 渲染UI
  return (
    // <div style={styles.container}>
    //   {/* 错误提示 */}
    //   {error && <div style={styles.error}>{error}</div>}

    //   {/* 录音状态显示 */}
    //   <div style={styles.voiceBox}>
    //     <span style={styles.status}>
    //       状态: {isRecording ? "录音中..." : "未录音"}
    //     </span>
    //     <div style={styles.wave}>
    //       {Array.from({ length: 20 }).map((_, i) => (
    //         <div key={i} className="bar" style={styles.bar as BarStyle} />
    //       ))}
    //     </div>
    //   </div>

    //   {/* 控制按钮 */}
    //   <button
    //     onClick={toggleRecording}
    //     style={{ ...styles.button, ...buttonStyle }}
    //   >
    //     {isRecording ? "停止录音" : "开始录音"}
    //   </button>

    //   {/* 识别结果 */}
    //   <div style={styles.results}>
    //     {transcripts.map((text, i) => (
    //       <p key={i} style={styles.resultText}>
    //         {text}
    //       </p>
    //     ))}
    //   </div>
    // </div>
    <>
      <div>
        {isRecording ? (
          <div className={styles.contain}>
            <img className={styles.v} alt="" src={`/img/v${vb}.svg`} />
            <div className={styles.text}>
              Release to send swipe up to cancel
            </div>
          </div>
        ) : (
            <div>{error}</div>
        )}
        <div className={styles.textback}>
          <div className={styles.vtext}> {transcripts} </div>
          <div className={styles.textbackfoot}>
            <div className={styles.countdown}>15s</div>
            <div className={styles.btncontain}>
              <div className={styles.cancel}>Cancel</div>
              <div className={styles.send}>Send</div>
            </div>
          </div>
        </div>
        <img
          className="dw120 dh120"
          src="/img/speak.min.png"
          alt=""
          onClick={toggleRecording}
        />
      </div>
    </>
  );
};

// // 样式对象
// const styles = {
//   container: {
//     maxWidth: "400px",
//     margin: "20px auto",
//     fontFamily: "Arial, sans-serif",
//   },
//   voiceBox: {
//     position: "relative",
//     border: "2px solid #ddd",
//     borderRadius: "8px",
//     padding: "20px",
//     margin: "20px 0",
//   } as React.CSSProperties,
//   status: {
//     position: "absolute" as const,
//     top: "5px",
//     left: "10px",
//     color: "#666",
//     fontSize: "12px",
//   },
//   wave: {
//     display: "flex",
//     gap: "3px",
//     alignItems: "center",
//     height: "50px",
//   },
//   bar: {
//     width: "4px",
//     background: "#4CAF50",
//     borderRadius: "2px",
//     transition: "height 0.1s",
//     height: "5px", // 初始高度
//   },
//   button: {
//     padding: "10px 20px",
//     background: "#4CAF50",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//     fontSize: "16px",
//   } as React.CSSProperties,
//   results: {
//     marginTop: "20px",
//     padding: "10px",
//     border: "1px solid #eee",
//   },
//   resultText: {
//     margin: "8px 0",
//   },
//   error: {
//     color: "red",
//     padding: "10px",
//     border: "1px solid red",
//     borderRadius: "4px",
//     marginBottom: "20px",
//   },
// };

export default SpeechRecognition;
