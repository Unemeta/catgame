import ProgressBar from "@/components/progressbar";
import { useState } from "react";
const AnswerLoading = () => {
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  return (
    <div>
      <ProgressBar></ProgressBar>
      <div>
        <div className="text-center justify-start text-[#826662] text-base font-[1.6rem] font-['SF_Pro_Rounded'] leading-none">
          Checking for updates…
        </div>
      </div>
    </div>
  );
};

export default AnswerLoading;
