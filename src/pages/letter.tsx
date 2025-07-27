/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import DialogShare from "@/components/dialog/share";
import IconView from "@/components/IconView";
import { request } from "@/utils/request";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import ScreenshotDownloader from "@/components/ScreenshotDownloader";
import Discord from "@/components/Discord";
import { useQRCode } from "next-qrcode";
import * as globalApi from "@/services/global";
import { useTranslation } from "react-i18next";

function useRemToPx(remValue: number) {
  const [px, setPx] = useState(remValue * 10); // 默认 1rem = 10px

  useEffect(() => {
    const updatePx = () => {
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      setPx(remValue * rootFontSize);
    };
    updatePx();
    window.addEventListener("resize", updatePx); // 响应式调整
    return () => window.removeEventListener("resize", updatePx);
  }, [remValue]);

  return px;
}
const LetterView = () => {
  const contentRef = useRef(null);
  const [showDownLoad, setShowDownLoad] = useState(true);
  const { Canvas } = useQRCode();
  const router = useRouter();
  const { t } = useTranslation();

  const handleShare = async () => {
    globalApi.eventRecord("share_entry_click");
    console.log("share");
  };

  const [letterInfo, setletterInfo] = useState({
    start: "",
    end: "",
    chatCount: "",
    maxLoginCount: "",
    text: "",
    url: "",
    tag: [],
  });
  const [localImg, setLocalImg] = useState("");

  useEffect(() => {
    (async () => {
      const uuid = router.query.id;
      if (uuid) {
        //
      } else {
        return;
      }
      console.log(router.query);
      try {
        const { data } = await request({
          url: `/api/chat/farewellletter/info?uuid=${uuid}`,
          method: "get",
        });
        if (data) {
          console.log(data);
          if(data?.tag){
            // 
          }else{
            data["tag"] = []
          }
          setletterInfo(data);
          const imageUrl =
            "/api/proxy-image?url=" + encodeURIComponent(data.url);
          setLocalImg(imageUrl);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error);
        // toast.error(error?.msg || error?.message || JSON.stringify(error));
      }
    })();
  }, [router.query]);
  const downloadCallBack = (show: boolean) => {
    setShowDownLoad(show);
  };

  const widthPx = useRemToPx(6); // 10rem → px
  return (
    <div className="bg-[#F0E4DD] min-h-[100vh]">
      <div className="w-full bg-[#F0E4DD] z-[100]">
        <div className="header flex justify-between items-center h-[4.6rem] px-[2rem]">
          <IconView
            className="w-[2rem] h-[2rem]"
            type="back"
            onClick={() => router.replace("/chat")}
          ></IconView>
          <div className="flex justify-center items-center grow">
            <span className="text-[#6C4734] text-[1.8rem] font-[800]">
              {t("letter.LoveLetterTitle")}
            </span>
          </div>
          <DialogShare
            trigger={
              <IconView
                className="w-[2rem] h-[2rem]"
                type="share"
                onClick={handleShare}
              ></IconView>
            }
            targetRef={contentRef}
            fileName="sharepage"
            callback={downloadCallBack}
          ></DialogShare>
        </div>
      </div>
      <div ref={contentRef}>
        {/* <div className="h-[4.6rem]"></div> */}
        {/* dtest */}
        <div
          className="px-[0rem] pb-[2.5rem] bg-[url('/img/bg_letter_bye.min.png')]"
          style={{ backgroundSize: "100% 100%" }}
        >
          <div className="h-[6.6rem]"></div>
          <div className="px-[5.4rem]">
            <div className="w-[17rem] mb-[1.4rem]">
              <span className="text-[#E96959] text-[2rem] font-[800] leading-[1.1]">
                {t("letter.LetterDesc")}
              </span>
            </div>
            <div className="flex justify-center items-center relative">
              {/* <img
              className="w-[28rem] h-[35rem]"
              src="/img/letter_cat.png"
              alt=""
            /> */}
              <img className="w-[28rem] h-[35rem]" src={localImg} alt="" />
              <img
                className="w-[13rem] h-[6.4rem] absolute top-[-4rem] right-0"
                src="/img/letter_m.png"
                alt=""
              />
            </div>
            <div className="h-[1.6rem]"></div>
          </div>

          <div className="px-[5rem]">
            <div className="flex justify-between items-center gap-[0.6rem]">
              <div className="flex-1">
                {letterInfo?.tag.length > 0 && (
                  <div className="bg-[rgba(244,115,141,0.60);]  h-[2.2rem] flex justify-center items-center rounded-[5rem] border-[#E397BC] border-[0.1rem]">
                    <span className="text-white text-[1.2rem] font-[700]">
                      {letterInfo?.tag[0]}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                {letterInfo?.tag.length > 1 && (
                  <div className="bg-[rgba(34,120,193,0.60);] h-[2.2rem] flex justify-center items-center rounded-[5rem] border-[#6D9FDA] border-[0.1rem]">
                    <span className="text-white text-[1.2rem] font-[700]">
                      {letterInfo?.tag[1]}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="h-[0.7rem]"></div>
            {letterInfo?.tag.length > 2 && (
              <div className="flex justify-between items-center gap-[0.6rem]">
                <div className="flex-1 ">
                  {letterInfo?.tag.length > 2 && (
                    <div className="bg-[rgba(133,91,184,0.60);] h-[2.2rem] flex justify-center items-center rounded-[5rem] border-[#9184B7] border-[0.1rem]">
                      <span className="text-white text-[1.2rem] font-[700]">
                        {letterInfo?.tag[2] ?? ""}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1 ">
                  {letterInfo?.tag.length > 3 && (
                    <div className="bg-[rgba(61,142,108,0.60);] h-[2.2rem] flex justify-center items-center rounded-[5rem] border-[#5EA98A] border-[0.1rem]">
                      <span className="text-white text-[1.2rem] font-[700]">
                        {letterInfo?.tag[3] ?? ""}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="h-[2rem]"></div>
        </div>
        {/* <div className="h-[1.5rem]"></div> */}
        <div className="px-[0rem]">
          <div
            className="bg-[url('/img/bg_letter.min.png')] min-h-[70rem]"
            style={{ backgroundSize: "100% 100%" }}
          >
            <div className="px-[5.7rem] pt-[7.7rem] pb-[2.9rem]">
              <div className="text-[#6C4937] text-[1.4rem] font-[500] mb-[1rem]">
                {t("letter.timeRange")}： {letterInfo?.start}-{letterInfo?.end}
              </div>
              <div className="flex justify-between items-center gap-[0.6rem]">
                <div className="flex-1 bg-[linear-gradient(175deg,rgba(239,228,221,0.80)_4.83%,rgba(239,228,221,0.80)_96.6%)] rounded-[1rem] py-[1rem]">
                  <div className="text-[#6C4937] text-[1.8rem] font-[700] text-center">
                    {letterInfo?.chatCount}
                  </div>
                  <div className="text-[#6C4937] text-[1.2rem] font-[500] text-center">
                    {t("letter.chatCountAll")}
                  </div>
                </div>
                <div className="flex-1 bg-[linear-gradient(175deg,rgba(239,228,221,0.80)_4.83%,rgba(239,228,221,0.80)_96.6%)] rounded-[1rem] py-[1rem]">
                  <div className="text-[#6C4937] text-[1.8rem] font-[700] text-center">
                    {letterInfo?.maxLoginCount}
                  </div>
                  <div className="text-[#6C4937] text-[1.2rem] font-[500] text-center">
                    {t("letter.chatCountContinuous")}
                  </div>
                </div>
              </div>
              <div className="h-[1.9rem]"></div>
              <div
                className="text-[#6C4937] text-[1.4rem] font-[500] leading-[1.5]"
                dangerouslySetInnerHTML={{
                  __html: letterInfo?.text?.replace(/\n/g, "<br />") ?? "",
                }}
              ></div>
              <div className="h-[1px] bg-[#EE8E82] my-[2rem]"></div>
              <div className="flex justify-center items-center gap-[1.7rem]">
                <img src="/img/letterbottom.png" alt="" className="w-[8rem]" />
                <div className="text-[#6C4937] text-[1.4rem] font-[500] leading-[1.5]">
                  {t("letter.caidan")}
                </div>
              </div>
              <div className="h-[1.5rem]"></div>
            </div>
          </div>
        </div>

        <div className="h-[2.3rem]"></div>
        {showDownLoad ? (
          <>
            <div className="flex justify-around items-center gap-[4.1rem] w-full h-[10rem]">
              <ScreenshotDownloader
                targetRef={contentRef}
                fileName="sharepage"
                callback={downloadCallBack}
              />
              <Discord></Discord>
            </div>
            <div className="h-[2.2rem]"></div>
          </>
        ) : (
          <div className="flex justify-around items-center  bg-white py-[1.8rem] gap-[1.5rem] h-[10rem]">
            <img src="/img/logonew.png" alt="" className="w-[5.5rem]" />
            <div className="text-[#6C4937] text-[1.2rem] font-['SF_Pro_Rounded'] leading-none w-[15rem]">
              You teach it to understand the world, it teaches you to understand
              yourself
            </div>
            <Canvas
              text={window.location.host}
              options={{
                width: widthPx, // 设置较大的基础尺寸（确保清晰）
              }}
            ></Canvas>
          </div>
        )}
      </div>
    </div>
  );
};
export default LetterView;
