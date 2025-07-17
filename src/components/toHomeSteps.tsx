import { useEffect, useState } from "react";
import DialogToHomeStep from "./dialog/toHomeStep";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

/* eslint-disable @next/next/no-img-element */

interface iToHomeStepView {
  isOtherPageNotLogin?: boolean;
}
const ToHomeStepView = ({ isOtherPageNotLogin = true }: iToHomeStepView) => {
  const [showStepView, setshowStepView] = useState(false);
  const { t } = useTranslation();

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
        <div
          className={cn(
            "absolute left-0 top-0 w-full flex justify-between items-center bg-[#F3EDEA] px-[1.6rem] py-[0.8rem]",
            {
              "bg-[#DE8D81]": isOtherPageNotLogin,
            }
          )}
        >
          <img
            onClick={handleCloseStep}
            className={cn("w-[2rem] h-[2rem]", {})}
            src={
              isOtherPageNotLogin
                ? "/svg/pwd_close_white.svg"
                : "/svg/pwd_close_black.svg"
            }
            alt=""
          />
          <div className="grow px-[1rem] flex justify-start items-center">
            <img
              className="w-[2.9rem] h-[2.9rem] mr-[1rem]"
              src="/img/pwd_cat.png"
              alt=""
            />
            <div
              className={cn("text-[#5E4D4B]", {
                "text-white!": isOtherPageNotLogin,
              })}
            >
              {t("login.pwaDesc")}
            </div>
          </div>
          <DialogToHomeStep
            trigger={
              <div
                className={cn(
                  "bg-[#EB9588] rounded-[2rem] w-[8.3rem] py-[0.6rem] text-white font-[700] text-[1.2rem]",
                  {
                    "bg-[linear-gradient(180deg,#FFF_0%,#FBE8DE_101.43%)] text-[#DE8D81]":
                      isOtherPageNotLogin,
                  }
                )}
              >
                <span>{t("login.Install")}</span>
              </div>
            }
          ></DialogToHomeStep>
        </div>
      )}
    </div>
  );
};
export default ToHomeStepView;
