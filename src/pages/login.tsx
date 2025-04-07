import styles from "@/styles/Login.module.css"; // 确保有对应的 CSS 文件
import { cn } from "@/lib/utils";
interface ProgressLoaderProps {
  progress: number;
}

const ProgressLoader: React.FC<ProgressLoaderProps> = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center z-50 bg-[url('/img/loadBg.png')] bg-cover">
      <div
        className={cn(
          "bg-[url('/img/bg/modelBg.jpg')] bg-cover",
          styles.loginModel
        )}
      ></div>
    </div>
  );
};

export default ProgressLoader;
