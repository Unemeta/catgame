/* eslint-disable @next/next/no-img-element */
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from ".";
import { useTalkSelcetDia } from "@/store";
import styles from "@/styles/TalkSelect.module.css";
const DialogTalk = () => {
  const [showTalk, setShowTalk] = useTalkSelcetDia();
  return (
    <Dialog open={showTalk} onOpenChange={setShowTalk}>
      <DialogTitle></DialogTitle>
      <DialogContent className="p-0 h-auto flex justify-center">
        <div className="bgBuy dw680 dh660 relative">
          <div className="flex justify-center items-cente dpt40 dmb70">
            <img className="w-[1.1vw] h-auto" src="/img/svg/paw.svg" alt="" />
            <span className="dml20 dmr20 text-white dtext35 font-[800] leading-none">
              {"AI Intelligence Enhancement"}
            </span>
            <img className="w-[1.1vw] h-auto" src="/img/svg/paw.svg" alt="" />
          </div>
          <div className={styles.des}>Choose the skills you want？</div>

          <div className="flex justify-center items-center dmb30">
            <div className="flex items-center flex-col dmr75">
              <img
                className={styles.item}
                src={"/img/fatalstrike.png"}
                alt=""
              />
              <div className={styles.text}>Fatal Strike</div>
            </div>
            <div className="flex items-center flex-col">
              <div>
                <img
                  className={styles.activeItem}
                  src={"/img/cattalk.jpg"}
                  alt=""
                />
              </div>

              <div className={styles.activeText}>Cat Talk</div>
            </div>
          </div>
          <div className="flex justify-center items-center dmb30">
            <DialogTrigger>
              <div
                className="bgConfirmBtn cursor-pointer select-none dw266 dh80  flex justify-center items-center"
                onClick={() => {}}
              >
                {/* Confirm */}
              </div>
            </DialogTrigger>
          </div>
          <div className="flex absolute top-0 right-0 translate-x-[100%] translate-y-[-80%]">
            <DialogTrigger>
              <div className="flex justify-center items-center cursor-pointer select-none">
                <img className="dw55 h-auto" src="/img/close.min.png" alt="" />
              </div>
            </DialogTrigger>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogTalk;
