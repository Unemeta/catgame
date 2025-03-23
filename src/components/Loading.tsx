interface ProgressLoaderProps {
  progress: number;
}

const ProgressLoader: React.FC<ProgressLoaderProps> = ({ progress }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center z-50 bg-[url('/img/loadBg.png')] bg-cover">
      <div className="w-64 h-6 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-4 text-lg">{Math.round(progress)}% 加载完成</div>
    </div>
  );
};

export default ProgressLoader;
