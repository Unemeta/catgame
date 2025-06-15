/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import NickName from "@/components/nickname";
import Age from "@/components/age";
import Gender from "@/components/gender";
import ProgressBar from "@/components/progressbar";
const InfoView = () => {
  const [stepIndex, setstepIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  return (
    <div className="w-full h-[100vh] absolute inset-0 z-[2] px-[2rem] bg-[url('/img/infoback.jpg')] bg-cover">
      {showQuestion ? (
        <>
          <div className="h-[3vh]"></div>
          <div className="w-full inline-flex justify-start items-center gap-1 space-x-[0.4rem]">
            <div className="flex-1 h-2.5 bg-red-300 rounded-[3rem]" />
            <div className="flex-1 h-2.5 bg-red-300/20 rounded-[3rem]" />
            <div className="flex-1 h-2.5 bg-red-300/20 rounded-[3rem]" />
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
              onClick={() => {
                setstepIndex(3);
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
