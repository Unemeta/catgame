import { useEffect, useState } from "react";
import DialogToHomeStep from "./dialog/toHomeStep";

/* eslint-disable @next/next/no-img-element */
const ToHomeStepView = () => {
  const [showStepView, setshowStepView] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("showStep")) {
      setshowStepView(false);
    } else {
      setshowStepView(true);
    }
  }, []);

  const handleCloseStep = () => {
    localStorage.setItem("showStep", "0");
    setshowStepView(false);
  };

  return (
    <div className="">
      {showStepView && (
        <div className="absolute left-0 top-0 w-full flex justify-between items-center bg-[#F3EDEA] px-[1.6rem] py-[0.8rem]">
          <img
            onClick={handleCloseStep}
            className="w-[2rem] h-[2rem]"
            src="/img/pwd_close.png"
            alt=""
          />
          <div className="grow px-[1rem] flex justify-start items-center">
            <img
              className="w-[2.9rem] h-[2.9rem] mr-[1rem]"
              src="/img/pwd_cat.png"
              alt=""
            />
            <div className="">
              Get your free app. it won’t take up space on your phone
            </div>
          </div>
          <DialogToHomeStep
            trigger={
              <div className="bg-[#EB9588] rounded-[2rem] px-[2rem] py-[0.6rem]">
                <span className="text-white font-[700] text-[1.2rem]">
                  Install
                </span>
              </div>
            }
          ></DialogToHomeStep>
        </div>
      )}
    </div>
  );
};
export default ToHomeStepView;
