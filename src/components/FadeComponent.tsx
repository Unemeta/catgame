import { useEffect, useState } from "react";

export function FadeComponent({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) {
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    if (show) {
      setShouldRender(true); // 开始显示
    } else {
      // 延迟卸载，让动画播放完成
      const timeout = setTimeout(() => setShouldRender(false), 750); // 750ms 与动画时间一致
      return () => clearTimeout(timeout);
    }
  }, [show]);

  return shouldRender ? (
    <div className={`${show ? "" : "animate__bounceIn"}`}>{children}</div>
  ) : null;
}
