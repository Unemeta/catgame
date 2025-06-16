/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import NickName from "@/components/nickname";
import Age from "@/components/age";
import Gender from "@/components/gender";
import ProgressBar from "@/components/progressbar";
import { cn } from "@/lib/utils";
import { useUserBasicInfo } from "@/store/info";
import { request } from "@/utils/request";
import { useRouter } from "next/router";
const InfoView = () => {
  const [stepIndex, setstepIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [basicInfo] = useUserBasicInfo();
  const router = useRouter()
  const postInfo = async () => {
    router.push("/question");
    const res = await request({
      url: "/api/cat/v1/survey/survey/basic",
      method: "post",
      data: {
        ...basicInfo,
      },
    });
    console.log(res);
  };
  return (
    <div className="w-full h-[100vh] absolute inset-0 z-[2] px-[2rem] bg-[url('/img/infoback.jpg')] bg-cover">
      {showQuestion ? (
        <>
          <div className="h-[3vh]"></div>
          <div className="w-full inline-flex justify-start items-center gap-1 space-x-[0.4rem]">
            <div
              className={cn("flex-1 h-[1.1vh] bg-red-300 rounded-[3rem]", {
                "bg-red-300": stepIndex === 0,
                "bg-red-300/20": stepIndex !== 0,
              })}
              onClick={() => {
                setstepIndex(0);
              }}
            />
            <div
              className={cn("flex-1 h-[1.1vh] rounded-[3rem]", {
                "bg-red-300": stepIndex === 1,
                "bg-red-300/20": stepIndex !== 1,
              })}
              onClick={() => {
                if (basicInfo.nickname) {
                  setstepIndex(1);
                }
              }}
            />
            <div
              className={cn("flex-1 h-[1.1vh] rounded-[3rem]", {
                "bg-red-300": stepIndex === 2,
                "bg-red-300/20": stepIndex !== 2,
              })}
              onClick={() => {
                if (basicInfo.age) {
                  setstepIndex(2);
                }
              }}
            />
          </div>
          {stepIndex === 0 && (
            <NickName
              onClick={() => {
                setstepIndex(1);
              }}
            ></NickName>
          )}
          {stepIndex === 1 && (
            <Age
              onClick={() => {
                setstepIndex(2);
              }}
            ></Age>
          )}
          {stepIndex === 2 && (
            <Gender
              onClick={async() => {
                try {
                 await postInfo();
                } catch (error) {
                  console.log(error)
                }
                
              }}
            ></Gender>
          )}
        </>
      ) : (
        <ProgressBar
          setShow={() => {
            setShowQuestion(true);
          }}
        ></ProgressBar>
      )}
    </div>
  );
};

export default InfoView;
