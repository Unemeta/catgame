/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
interface iAnswerView {
  onClick: VoidFunction;
}
import { cn } from "@/lib/utils";
import { useUserBasicInfo } from "@/store/info";

const oldList: number[] = [];
for (let i = 16; i < 101; i++) {
  oldList.push(i);
}
const Age = ({ onClick }: iAnswerView) => {
  const [basicInfo, setBasicInfo] = useUserBasicInfo();
  return (
    <div className="flex flex-col justify-center items-center mt-[18rem]">
      <div className="text-center justify-start text-[#EA8373] text-[3rem] font-bold font-['SF_Pro_Rounded'] leading-9">
        How old are you?
      </div>

      <div className="relative mt-[6rem] w-[33rem] h-[26rem] overflow-auto py-[1rem]">
        {oldList.map((item) => {
          return (
            <div
              key={item}
              className={cn(
                "w-[33rem] px-[2rem] py-[1.2rem] rounded-[5rem] inline-flex justify-center items-center gap-[1rem] mb-[2rem]",
                {
                  "bg-white": item !== basicInfo.age,
                  // "bg-[url(/img/agebg.png)] bg-cover":
                  //   item === basicInfo.age,
                  // "bg-gradient-to-l from-[#EA8273] to-[#ECA89E] ":
                  //   item === basicInfo.age,
                }
              )}
              onClick={() => {
                setBasicInfo({ ...basicInfo, age: item });
              }}
            >
              {item === basicInfo.age ? (
                <img src="/img/agebg.svg" className="absolute -z-1"></img>
              ) : (
                <></>
              )}

              <div
                className={cn(
                  "flex-1 text-center justify-start text-[#826662] text-[2rem] font-bold font-['SF_Pro_Rounded'] leading-tight",
                  {
                    "text-[#826662]": item !== basicInfo.age,
                    "text-[#FFFAFA]": item === basicInfo.age,
                  }
                )}
              >
                {item}
              </div>
            </div>
          );
        })}
        {/* <div
          className="w-[33rem] px-[2rem] py-[1.2rem] bg-white rounded-[5rem] inline-flex justify-center items-center gap-[1rem] mb-[2rem]"
          onClick={() => {
            setOld(1);
          }}
        >
          <div className="flex-1 text-center justify-start text-[#826662] text-[2rem] font-bold font-['SF_Pro_Rounded'] leading-tight">
            1
          </div>
        </div>
        {/* <div className="w-[33rem] px-[2rem] py-[1.2rem] bg-gradient-to-l from-[#EA8273] to-[#ECA89E] rounded-[5rem] inline-flex justify-center items-center gap-[1rem] mb-[2rem] shadow-[0_4px_24px_0_rgba(236,168,158,1.00)] shadow-[0_3px_4px_0_rgba(255,255,255,0.25)] border border-[#FF9A8B]">
          <div className="flex-1 text-center justify-start text-[#FFFAFA] text-[2rem] font-bold font-['SF_Pro_Rounded'] leading-tight">
            5
          </div>
        </div> */}
      </div>

      <div className="mt-[9.6rem]">
        {basicInfo.age ? (
          <img
            src="/img/arrow_right.min.png"
            alt=""
            className="w-[12rem] h-[12rem]"
            onClick={onClick}
          />
        ) : (
         <img
            src="/img/arrow_rightdis.min.png"
            alt=""
            className="w-[12rem] h-[12rem]"
          />
        )}
      </div>
    </div>
  );
};

export default Age;
