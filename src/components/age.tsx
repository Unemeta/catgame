/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
interface iAnswerView {
  onClick: VoidFunction;
}
import { cn } from "@/lib/utils";
import { useUserBasicInfo } from "@/store/info";
import { useTranslation } from "react-i18next";
import * as globalApi from "@/services/global";

const oldList: number[] = [];
for (let i = 16; i < 101; i++) {
  oldList.push(i);
}
const Age = ({ onClick }: iAnswerView) => {
  const [basicInfo, setBasicInfo] = useUserBasicInfo();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center mt-[11rem] h-[58rem]">
      <div className="text-center justify-start text-[#EA8373] text-[2.4rem] font-[700] font-['SF_Pro_Rounded'] leading-9">
        {t("info.howold")}
      </div>
      <div className="h-[36rem]">
        <div className="relative mt-[6rem] w-[35rem] h-[28rem] overflow-auto py-[2rem] px-[2rem]">
          {oldList.map((item) => {
            return (
              <div
                key={item}
                className={cn(
                  "w-[30rem] py-[1.2rem] rounded-[5rem] inline-flex justify-center items-center gap-[1rem] mb-[2rem]",
                  {
                    "bg-white": item !== basicInfo.age,
                    "bg-[linear-gradient(0deg,#EA8273_0%,#ECA89E_100%)] rounded-[20px]":
                      item === basicInfo.age,
                  }
                )}
                onClick={() => {
                  globalApi.eventRecord("age_input");
                  setBasicInfo({ ...basicInfo, age: item });
                }}
                style={{
                  boxShadow:
                    item === basicInfo.age
                      ? "0px 3px 4px 0px rgba(255, 255, 255, 0.25), 0px 4px 24px 0px #ECA89E"
                      : "",
                }}
              >
                {/* {item === basicInfo.age ? (
                <img
                  src="/img/agebg.png"
                  className="absolute -z-1 w-full"
                ></img>
              ) : (
                <></>
              )} */}

                <div
                  className={cn(
                    "flex-1 text-center justify-start text-[#826662] text-[1.6rem] font-bold font-['SF_Pro_Rounded'] leading-tight",
                    {
                      "text-[#826662]": item !== basicInfo.age,
                      "text-[#FFFAFA]": item === basicInfo.age,
                    }
                  )}
                >
                  {item}
                </div>
              </div>
            );
          })}
          {/* <div
          className="w-[33rem] px-[2rem] py-[1.2rem] bg-white rounded-[5rem] inline-flex justify-center items-center gap-[1rem] mb-[2rem]"
          onClick={() => {
            setOld(1);
          }}
        >
          <div className="flex-1 text-center justify-start text-[#826662] text-[2rem] font-bold font-['SF_Pro_Rounded'] leading-tight">
            1
          </div>
        </div>
        {/* <div className="w-[33rem] px-[2rem] py-[1.2rem] bg-gradient-to-l from-[#EA8273] to-[#ECA89E] rounded-[5rem] inline-flex justify-center items-center gap-[1rem] mb-[2rem] shadow-[0_4px_24px_0_rgba(236,168,158,1.00)] shadow-[0_3px_4px_0_rgba(255,255,255,0.25)] border border-[#FF9A8B]">
          <div className="flex-1 text-center justify-start text-[#FFFAFA] text-[2rem] font-bold font-['SF_Pro_Rounded'] leading-tight">
            5
          </div>
        </div> */}
        </div>
      </div>
      <div className="mt-[3rem]">
        {basicInfo.age ? (
          <img
            src="/img/arrow_right.min.png"
            alt=""
            className="w-[10rem] h-[10rem]"
            onClick={onClick}
          />
        ) : (
          <img
            src="/img/arrow_rightdis.min.png"
            alt=""
            className="w-[10rem] h-[10rem]"
          />
        )}
      </div>
    </div>
  );
};

export default Age;
