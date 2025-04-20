/* eslint-disable @next/next/no-img-element */
import { ReactNode, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from ".";
import styles from "@/styles/Backpack.module.css";

interface iDialogChatView {
  trigger?: ReactNode;
}
const DialogChatView = ({ trigger }: iDialogChatView) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTitle></DialogTitle>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="p-0 w-full  h-full overflow-hidden max-w-[100%] max-h-[100%]">
        <div className={styles.backpackBg}>
          <div className="headerBackpack flex dpl25 dpt18 dpb18 dpr110 dh90">
            <div
              className="flex justify-start items-center cursor-pointer select-none"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                className="dw48 dhauto dmr10"
              >
                <circle opacity="0.3" cx="24" cy="24" r="24" fill="#D9D9D9" />
                <circle cx="24" cy="24" r="20" fill="white" />
                <path
                  d="M27.5 15L18.5 24L27.5 33"
                  stroke="#E239EE"
                  stroke-width="4.15385"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span className="text-white dtext26 font-[500]">Back</span>
            </div>
          </div>
          <div className="flex justify-end items-start dmb40">
            <div className="chatCtt grid grid-cols-1 dgap20 dh730 overflow-y-scroll dpr36">
              {[1, 1, 1, 1, 1, 1]?.map((item, index: number) => {
                if (index % 2 === 0) {
                  return (
                    <div
                      key={index}
                      className="receive dp24 drounded30 bg-[rgba(90,_35,_92,_0.30)] flex justify-start items-start"
                    >
                      <img
                        className="dw65 dh65 rounded-full dmr25"
                        src="/img/1.jpg"
                        alt=""
                      />
                      <div className="dmaxW460 lmd:max-w-[400px]">
                        <div className="dtext24 font-[500] text-[#F5F2FF]/60 dmb8">
                          2024/1/23 23:34
                        </div>
                        <div className="dtext28 font-[500] text-[#F5F2FF]">
                          At least 34 people have been killed and 117 injured in
                          a Russian attack on the city of Sumy, according to
                          Ukrainian authorities.
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      className="send dp24 drounded30 bg-[rgba(90,_35,_92,_0.30)] flex justify-start items-start"
                    >
                      <div className="dmaxW460 lmd:max-w-[400px] dmr25">
                        <div className="dtext24 font-[500] text-[#F5F2FF]/60 dmb8 text-right">
                          2024/1/23 23:34
                        </div>
                        <div className="dtext28 font-[500] text-[#F5F2FF]">
                          At least 34 people have been killed and 117 injured in
                          a Russian attack on the city of Sumy, according to
                          Ukrainian authorities.
                        </div>
                      </div>
                      <img
                        className="dw65 dh65 rounded-full "
                        src="/img/1.jpg"
                        alt=""
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="textInput flex justify-center items-center">
            <input className="drounded160 dborderW4 border-[#FFF] dw410 dh100 bg-white/70 dmr30 dtext30 dpl15 dpr15" type="text" />
            <img className="dw120 dh120" src="/img/speak.min.png" alt="" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  ); 
};

export default DialogChatView;
