import AnswerView from "@/components/answer";
import Step3View from "@/components/step3";
import { useState } from "react";
import { request } from "@/utils/request";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import * as globalApi from "@/services/global";

/* eslint-disable @next/next/no-img-element */
const PartyView = () => {
  const [stepIndex, setstepIndex] = useState(0);
  const router = useRouter();
  const { t } = useTranslation();

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
        url: "/api/survey/survey/mbti",
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
      <div className="relative w-[100vw] min-h-[100vh] bg-[linear-gradient(180deg,#F2ECE9_0%,#F5F0EE_100%)]">
        {/* <img
          className={cn("w-[100vw] min-h-[100vh] absolute inset-0 z-[1]", {
            "blur-[20px]": stepIndex !== 0,
          })}
          src="/img/bg/bg_pop_rain.min.png"
          alt=""
        /> */}
        {stepIndex == 0 && (
          <div className="w-full wrapHeight  text-center">
            <div className="flex flex-col h-full">
              <div
                className="text-[#EA8373] text-[2.8rem] font-[700] mb-[3vh] px-[3rem] leading-[1.2] pt-[5rem]"
                dangerouslySetInnerHTML={{
                  __html: t("qa.soul_title"),
                }}
              ></div>

              <div className="flex justify-center items-end">
                <div className="bg-[url('/img/cat_red.min.png')] w-[14rem] h-[14rem] bg-cover"></div>
              </div>
              {/* <div
                className="absolute bottom-[1rem] left-[50vw] translate-x-[-50%]"
                onClick={() => {
                  setstepIndex(1);
                }}
              > */}
              <div className="text-[#826662] text-[1.4rem] font-[500]  flex justify-center items-center text-left">
                <div
                  className="max-w-[31rem] leading-[1.4]"
                  dangerouslySetInnerHTML={{
                    __html: t("qa.soul_desc"),
                  }}
                >
                  {/* {t("qa.soul_desc")} */}
                </div>
              </div>
              <div className="flex justify-center items-center mt-[3rem]">
                <img
                  src="/img/arrow_right.min.png"
                  className="w-[10rem] h-[10rem]"
                  alt=""
                  onClick={() => {
                    globalApi.eventRecord("soultest_click");
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
