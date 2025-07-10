/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from ".";
import { useFetchUser } from "@/store";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import IconView from "../IconView";

interface iDialogSetting {
  trigger?: ReactNode;
  // isOpen: boolean;
  indexXingGe?: number;
  catName?: string;
  // setIsOpen: (bool: boolean) => void;
}
const DialogAvatarCat = ({ trigger, indexXingGe, catName }: iDialogSetting) => {
  const [isOpen, setisOpen] = useState(false);
  const { userData } = useFetchUser();
  const { t } = useTranslation();
  const router = useRouter();

  const cats = [
    {
      type: t("qa.cat_type1"),
      name: "",
      keys: [" ", " "],
      desc: " ",
    },
    {
      type: t("qa.cat_type2"),
      name: "",
      keys: [t("qa.Reserved"), t("qa.Tsundere")],
      desc: t("qa.cat_desc2"),
    },
    {
      type: t("qa.cat_type3"),
      name: "",
      keys: [t("qa.Soothing"), t("qa.Tenderness")],
      desc: t("qa.cat_desc3"),
    },
    {
      type: t("qa.cat_type4"),
      name: "",
      keys: [t("qa.Spirited"), t("qa.Lively")],
      desc: t("qa.cat_desc4"),
    },
  ];
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(val) => {
        setisOpen(val);
      }}
    >
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="p-0 h-auto w-[83vw]">
        <DialogTitle></DialogTitle>
        <div
        // className="rounded-[3rem] bg-[linear-gradient(187deg,#B48471_-9.74%,rgba(212,204,195,0.60)_72.93%)] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.55)] border-[#FFFFF7] border-[0.2rem] "
        // style={{
        //   background:
        //     "linear-gradient(187deg, #EDA88D -9.74%, rgba(157, 137, 87, 0.00) 72.93%, rgba(240, 233, 225, 0.60));",
        // }}
        >
          <div className="px-[0rem]">
            <div
              className="px-[1.6rem] py-[1.6rem] relative h-[55vh] bg-[url('/img/bg/bg_card_cat.min.png')]"
              style={{ backgroundSize: "100% 100%" }}
            >
              {indexXingGe != null && (
                <div className="">
                  <div className="px-[1rem] py-2 text-white text-[1.6rem] font-[700] bg-[#F4738D99] rounded-[5rem] border-[#E397BC] border-w-[0.1rem] inline-block">
                    {cats[indexXingGe].keys[0]}
                  </div>
                </div>
              )}
              {indexXingGe != null && (
                <div className="">
                  <div className="px-[1rem] py-2 text-white text-[1.6rem] font-[700] bg-[#2278C199] rounded-[5rem] border-[#6D9FDA] border-w-[0.1rem] inline-block my-[0.6rem]">
                    {cats[indexXingGe].keys[1]}
                  </div>
                </div>
              )}
              {indexXingGe != null && cats[indexXingGe].keys.length > 2 && (
                <div className="">
                  <div className="px-[1rem] py-2 text-white text-[1.6rem] font-[700] bg-[#4A5F7799] rounded-[5rem] border-[#95A1C1] border-w-[0.1rem] inline-block">
                    {cats[indexXingGe].keys[2]}
                  </div>
                </div>
              )}
              {indexXingGe != null && (
                <div className="absolute right-[1.6rem] top-[1.6rem] bg-[#B4886D] border-[1px] border-[#DBB399] rounded-[5rem] flex justify-center items-center px-[1rem] h-[2.8rem]">
                  <span className="text-white text-[1.2rem] font-[700] text-center leading-[1]">
                    {cats[indexXingGe].type}.
                  </span>
                </div>
              )}
              <div className="absolute left-[0] top-[4rem] w-full flex justify-center">
                <img
                  src="/img/bg_cat.min.png"
                  className="w-[auto] h-[34vh]"
                  alt=""
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[40%]">
                <div className="flex justify-center items-center">
                  {/* <div className="bg-[url('/img/bg/bg_aloof_cat.min.png')] bg-cover bg-no-repeat text-white text-[2.8rem] font-[700] h-[5.3rem] px-[5rem] flex justify-center items-center">
                {cats[index].type}
              </div> */}
                  <div className="relative">
                    <input
                      tabIndex={-1}
                      readOnly
                      // onChange={(e) => setinputMsg(e.target.value)}
                      value={catName}
                      className="border-[1px] focus:outline-none! border-[#E96856] rounded-full bg-white w-[21rem] h-[4rem] text-[#EA8273] text-[2rem] font-[700] px-[2rem] pr-[3.6rem] text-center"
                      type="text"
                    />
                    <IconView
                      className="w-[1.5rem] h-[1.5rem] absolute right-[1.8rem] top-[1.2rem]"
                      type="eduitCatName"
                    ></IconView>
                  </div>
                </div>
                {indexXingGe != null && (
                  <div className="mt-[1rem] text-[#826662] text-[1.3rem] font-[700] flex justify-center items-center px-[2.5rem] text-center h-[5.1rem] pt-[3rem]">
                    {cats[indexXingGe].desc}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <DialogTrigger>
          <div className="absolute top-[-0.4rem] right-[-1.6rem] flex  justify-center items-center cursor-pointer select-none focus-visible:outline-none">
            <img
              className="w-[4.4rem] h-[4.4rem]"
              src="/img/close2.min.png"
              alt=""
            />
          </div>
        </DialogTrigger>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAvatarCat;
