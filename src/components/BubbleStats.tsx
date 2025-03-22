import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Bubble: React.FC<{ imageSrc: string; progress: number }> = ({
  imageSrc,
  progress,
}) => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    // 浮动动画
    gsap.to(bubbleRef.current, {
      y: -10, // 轻微上浮
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  // 计算 SVG 进度条偏移
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);

  return (
    <div className="relative flex items-center justify-center">
      {/* 进度条 */}
      <svg width="120" height="120" viewBox="0 0 120 120" className="absolute">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#ddd"
          strokeWidth="6"
          opacity="0.3"
        />
        <circle
          ref={circleRef}
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#4fa3ff"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)" // 旋转起始点
        />
      </svg>

      {/* 泡泡主体 */}
      <div
        ref={bubbleRef}
        style={{
          width: "100px",
          height: "100px",
        }}
        className="rounded-full overflow-hidden bg-[url('/img/bubbleBack.png')] bg-no-repeat bg-cover shadow-lg flex items-center justify-center"
      >
        <div className="bg-blue-500">123</div>
        <img
          src={imageSrc}
          alt="Bubble"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
export default Bubble;
// const App = () => {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const tl = gsap.timeline({ repeat: -1, yoyo: true });
//     tl.to({}, { duration: 3, onUpdate: () => setProgress((p) => (p >= 100 ? 0 : p + 1)) });
//   }, []);

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <Bubble imageSrc="https://source.unsplash.com/100x100/?nature" progress={progress} />
//     </div>
//   );
// };

// export default App;
