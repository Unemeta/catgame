import AnswerView from "@/components/answer";
import Step3View from "@/components/step3";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { request } from "@/utils/request";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

/* eslint-disable @next/next/no-img-element */
const PartyView = () => {
  const [stepIndex, setstepIndex] = useState(0);
  const router = useRouter();
  const [mbtiRes, setmbtiRes] = useState({
    disposition: 0,
    nickname: "",
    meowname: "",
  });
  // const [payload, setpayload] = useState({

  // });
  const [isLoading, setisLoading] = useState(false);
  const postInfo = async (selectIndexs: number[]) => {
    try {
      if (isLoading) {
        return;
      }
      setisLoading(true);
      const res = await request({
        url: "/api/cat/v1/survey/survey/mbti",
        method: "post",
        data: {
          ei: selectIndexs[0],
          sn: selectIndexs[1],
          tf: selectIndexs[2],
          jp: selectIndexs[3],
        },
      });
      console.log(res);
      if (res.data) {
        setstepIndex(2);
        setmbtiRes({
          disposition: res.data.disposition,
          nickname: res.data.nickname,
          meowname: res.data.meowname,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data ?? JSON.stringify(error));
      console.log(error);
      router.push("/");
    }
    setisLoading(false);
  };
  return (
    <div className="">
      <div className="relative">
        <img
          className={cn("w-[100vw] min-h-[100vh] absolute inset-0 z-[1]", {
            "blur-[20px]": stepIndex !== 0,
          })}
          src="/img/bg/bg_pop_rain.min.png"
          alt=""
        />
        {stepIndex == 0 && (
          <div className="w-full wrapHeight absolute inset-0 z-[2] text-center">
            <div className="flex flex-col h-full">
              <div className="h-[9.3vh]"></div>
              <div className="text-white text-[2.8rem] font-[700] mb-[3vh]">
                Soul Identification
              </div>
              <div className="text-center text-white text-[1.6rem] font-[500] leading-[1.1]">
                Meowster has prepared soul <br /> identification questions for
                you. <br /> Based on your answers, it will find a <br /> cat
                that matches you.
              </div>

              {/* <div
                className="absolute bottom-[1rem] left-[50vw] translate-x-[-50%]"
                onClick={() => {
                  setstepIndex(1);
                }}
              > */}
              <div className="flex justify-center items-center mt-[33rem]">
                <img
                  src="/img/arrow_right.min.png"
                  className="w-[27vw] h-[27vw]"
                  alt=""
                  onClick={() => {
                    setstepIndex(1);
                  }}
                />
              </div>
              {/* </div> */}
            </div>
          </div>
        )}
        {stepIndex == 1 && (
          <AnswerView
            onClick={(selectIndexs) => {
              postInfo(selectIndexs);
            }}
          ></AnswerView>
        )}
        {stepIndex == 2 && (
          <Step3View
            mbtiRes={mbtiRes}
            index={mbtiRes.disposition ? mbtiRes.disposition - 1 : 0}
          ></Step3View>
        )}
      </div>
    </div>
  );
};

export default PartyView;
