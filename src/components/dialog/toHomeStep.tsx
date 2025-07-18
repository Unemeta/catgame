/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from ".";
import { useTranslation } from "react-i18next";
interface iDialogToHomeStep {
  trigger?: ReactNode;
}
const DialogToHomeStep = ({ trigger }: iDialogToHomeStep) => {
  const { t } = useTranslation();
  //
  const localeIndex = () => {
    const lanuageStr = localStorage.getItem("locale");
    if (lanuageStr == "zh") {
      return 0;
    } else if (lanuageStr == "en") {
      return 1;
    } else if (lanuageStr == "ja") {
      return 2;
    } else {
      return 1;
    }
  };
  const dataArr = [
    {
      step1: <div className="">1.打开chrome浏览器，访问本页面</div>,
      step2: (
        <div className="">
          2.在浏览器底部或顶部找到{" "}
          <span className="text-[#1E00FF] font-[700]">"分享"</span>
          按钮
        </div>
      ),
      step3: (
        <div className="">
          <span>3.在弹出的菜单中，滑动找到并点击</span>
          <span className="text-[#1E00FF] font-[700]">"添加到主屏幕"</span>
        </div>
      ),
      step4: (
        <div className="">
          4.在新的确认页面，点击右上角的
          <span className="text-[#1E00FF] font-[700]">"添加"</span> button in
          the 按钮
        </div>
      ),
    },
    {
      step1: (
        <div className="">1. Open the Default browser and visit this page</div>
      ),
      step2: (
        <div className="">
          2. Find the <span className="text-[#1E00FF] font-[700]">"Share"</span>
          button at the bottom or top of the browser
        </div>
      ),
      step3: (
        <div className="">
          <span>3. In the pop-up menu, slide to find and click</span>
          <span className="text-[#1E00FF] font-[700]">
            "Add to Home Screen"
          </span>
        </div>
      ),
      step4: (
        <div className="">
          4. On the new confirmation page, click the{" "}
          <span className="text-[#1E00FF] font-[700]">"Add"</span> button in the
          upper right corner
        </div>
      ),
    },
    {
      step1: (
        <div className="">
          1.Chromeブラウザを開き、このページにアクセスしてください。
        </div>
      ),
      step2: (
        <div className="">
          2.画面の下部または上部にある「共有」ボタンをタップします。
        </div>
      ),
      step3: (
        <div className="">
          3.表示されたメニューの中からスクロールして「ホーム画面に追加」を選択してください。
        </div>
      ),
      step4: (
        <div className="">
          4.確認画面が表示されたら、右上の「追加」ボタンをタップしてください。
        </div>
      ),
    },
  ];
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="p-0 h-auto w-[83vw]">
        <DialogTitle></DialogTitle>
        <div className="relative bg-[linear-gradient(187deg,#B48471_-9.74%,rgba(212,204,195,0.60)_72.93%)] rounded-[3rem]  shadow-[0px_4px_20px_0px_rgba(0,0,0,0.55)] border-[#FFFFF7] border-[0.2rem]">
          <div className=" inline-flex flex-col justify-start items-center overflow-hidden w-full">
            <div
              className="text-center flex justify-center items-center text-yellow-900 text-[1.8rem] font-extrabold font-['SF_Pro_Rounded'] leading-snug p-[1rem] rounded-tl-[3rem] rounded-tr-[3rem] w-full"
              style={{
                background: "linear-gradient(180deg, #E3BFA5 0%, #DDB293 100%",
              }}
            >
              {/* {t("chat.Exchange")} */}
              <div className="max-w-[24rem] leading-[1.2] font-['SF_Pro_Rounded'] iosAddtohomeTitle">
                {t("login.addToScreen")}
              </div>
            </div>

            <div className="text-white text-[1.4rem] font-[500] px-[2rem] py-[1.6rem] leading-[1.2]">
              <div className="mb-[1.5rem]">{dataArr[localeIndex()].step1}</div>
              <div className="mb-[1.5rem]">{dataArr[localeIndex()].step2}</div>
              <div className="mb-[1.5rem]">{dataArr[localeIndex()].step3}</div>
              <div className="">{dataArr[localeIndex()].step4}</div>
            </div>
            <DialogTrigger>
              <div className="select-none">
                <div className="bg-white rounded-[3rem] shadow-[0px_3px_14px_0px_rgba(255,255,255,0.45)] w-[13.2rem] h-[3.8rem] flex justify-center items-center">
                  <span className="text-[#E96856] text-[1.6rem] font-[800]">
                    {t("login.Know")}
                  </span>
                </div>
              </div>
            </DialogTrigger>
            <div className="h-[1.6rem]"></div>
          </div>

          <div className="flex absolute top-[1.5rem] right-[2.5rem] translate-x-[100%] translate-y-[-80%]">
            <DialogTrigger>
              <div className="flex justify-center items-center cursor-pointer select-none">
                <img className="w-[4rem] h-auto" src="/img/close.png" alt="" />
              </div>
            </DialogTrigger>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogToHomeStep;
