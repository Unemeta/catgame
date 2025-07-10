/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle } from ".";
import Discord from "../Discord";
interface iDialogExchange {
  show: boolean;
  setShow: (val: boolean) => void;
  cb?: () => void;
  trigger?: ReactNode;
}
const DialogLetter = ({ show, setShow }: iDialogExchange) => {
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
        <div className="bg-[url('/img/bg/bg_letter_dialog.png')] h-[48rem] bg-100100 p-[2.5rem] relative  rounded-[3rem]  shadow-[0px_4px_20px_0px_rgba(0,0,0,0.55)] border-[#FFFFF7] border-[0.2rem]">
          <div className=" inline-flex flex-col justify-start items-center overflow-hidden w-full">
            <div className="text-[#E96959] text-[1.8rem] font-[800] mb-[1.6rem]">
              Countdown X days
            </div>
            <div
              className="text-[#826662] text-[1.4rem] font-[500] leading-[1.1]"
              dangerouslySetInnerHTML={{
                __html: ` 📬 I have something on my mind that I want to tell you slowly...
              Don't turn it off in a hurry, I am secretly recording every bit of
              interaction with you every day✍ <br />
              <br />
              1.🕰 If you persist for x days, you will receive a "Cat Thoughts
              Summary Letter" that belongs only to you, and there are hidden
              Easter eggs waiting for you to discover. <br />
              <br />
              2. 🎀 If you want to know more cats, come to the community and
              leave your footprints. Exclusive identity, mysterious rewards, and
              super cute emojis are waiting for you to take away! <br />
              <br />
              3. Join the{" "}
              <span className="text-[#E96959] font-[700]">discord</span>{" "}
              community and complete the questionnaire, then you will have a
              chance to get a mysterious reward`,
              }}
            ></div>
            <div className="flex flex-col justify-center items-center">
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
