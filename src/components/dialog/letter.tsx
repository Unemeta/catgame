/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle } from ".";
import Discord from "../Discord";
import { useFetchUser } from "@/store";
import { useTranslation } from "react-i18next";
import { ddLocaleIndex } from "@/lib/utils";
interface iDialogExchange {
  show: boolean;
  setShow: (val: boolean) => void;
  cb?: () => void;
  trigger?: ReactNode;
}
const DialogLetter = ({ show, setShow }: iDialogExchange) => {
  const { userData } = useFetchUser();
  const { t } = useTranslation();

  const getCountDay = (day: number) => {
    // if (loginDay >= 7) {
    //   return "0";
    // } else if (loginDay >= 0) {
    //   return `${7 - loginDay}`;
    // } else {
    //   return "X";
    // }
    if (day >= 0) {
      return 7 - (day % 7);
    }
    return "--";
  };
  const locales = [
    `<div className="">
          📬 有些心事，我想慢慢告诉你……
          别急着关掉，我每天都在偷偷记录和你的点滴互动✍
          <br /> <br />
          1.🕰
          再坚持x天，你将收到一封只属于你的“喵喵告白信”，还有隐藏彩蛋等你发现。
          <br /> <br />
          2. 🎀
          想认识更多的猫咪，就来社区留下你的足迹吧。专属身份、神秘奖励，还有超萌表情包等你抱走！
          <br /> <br />
          3.加入discord社区完成问卷，则有机会获得神秘奖励
        </div>`,
    `<div>
        📬 There’s something on my mind... I want to share it with you, little
        by little. Please don’t close this just yet — I’ve been secretly
        recording every precious moment we’ve shared ✍
        <br /> <br />
        1. 🕰 Just hold on for X more days, and you’ll receive a special
        Meow-Meow letter, just for you — with hidden surprises waiting to be
        found!
        <br /> <br />
        2. 🎀 Want to meet more adorable kitties? Come leave your pawprint in
        our community! Unlock your exclusive identity, mysterious rewards, and
        take home the cutest sticker packs!
        <br /> <br />
        3.Join our Discord community and complete the questionnaire for a
        chance to win special prizes
      </div>`,
    ` <div>
          📬 ちょっとだけ……あなたに伝えたい想いがあります。
          まだ閉じないでね。あなたとの毎日の小さなやりとりを、こっそり記録してるんです✍
          <br /> <br />
          1.🕰
          あとX日がんばれば、あなた専用の「にゃんにゃん告白のお手紙」が届きます。
          さらに、ひみつのサプライズも見つけられるかも…？
          <br /> <br />
          2.🎀
          他の猫さんたちにも会いたいなら、ぜひコミュニティに足跡を残してみてくださいね。
          限定プロフィールやミステリーなご褒美、超かわいいスタンプももらえます！
          <br /> <br />
          3.Discordコミュニティに参加してアンケートに答えると、素敵なプレゼントが当たるチャンスも♪
        </div>`,
  ];

  return (
    <Dialog
      open={show}
      onOpenChange={(val) => {
        console.log(val);
        setShow(val);
      }}
    >
      <DialogContent className="p-0 h-auto w-[83vw]">
        <DialogTitle></DialogTitle>
        <div className="bg-[url('/img/bg/bg_letter_dialog.png')] h-[48rem] bg-100100 py-[2.2rem] px-[2.5rem] relative rounded-[3rem]  shadow-[0px_4px_20px_0px_rgba(0,0,0,0.55)] border-[#FFFFF7] border-[0.2rem]">
          <div className=" inline-flex flex-col justify-start items-center overflow-hidden w-full">
            <div className="text-[#E96959] text-[1.8rem] font-[800] mb-[1.2rem]">
              {t("letter.Countdown")} {getCountDay(userData?.day)}{" "}
              {t("letter.days")}
            </div>
            <div
              className="text-[#826662] text-[1.4rem] font-[500] leading-[1.1]"
              dangerouslySetInnerHTML={{
                __html: locales[ddLocaleIndex()],
              }}
            ></div>
            <div className=""></div>

            <div className="flex flex-col justify-center items-center mt-[1.3rem]">
              <Discord
                text="Join in Discord"
                textColor="text-[#6E6E6E]"
              ></Discord>
            </div>
          </div>

          <div className="flex absolute top-[1.5rem] right-[2.5rem] translate-x-[100%] translate-y-[-80%]">
            <div
              className="flex justify-center items-center cursor-pointer select-none"
              onClick={() => setShow(false)}
            >
              <img className="w-[4rem] h-auto" src="/img/close.png" alt="" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogLetter;
