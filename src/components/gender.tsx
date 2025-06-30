/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
interface iAnswerView {
  onClick: VoidFunction;
}
import { useUserBasicInfo } from "@/store/info";
import { cn } from "@/lib/utils";

const Age = ({ onClick }: iAnswerView) => {
  const [basicInfo, setBasicInfo] = useUserBasicInfo();
  return (
    <div className="flex flex-col items-center mt-[11rem] h-[58rem]">
      <div className="text-center justify-start text-[#EA8373] text-[3rem] font-bold font-['SF_Pro_Rounded'] leading-9">
        What’s your gender?
      </div>
      <div className="h-[36rem]">
        <div className="flex gap-[1rem] mt-[6rem]">
          <div
            className={cn(
              "w-[13.5rem] h-[16.6rem] px-[1rem] py-[3.5rem] rounded-[3rem] inline-flex flex-col justify-center items-center gap-[0.8rem]",
              {
                "bg-[linear-gradient(0deg,#EA8273_0%,#ECA89E_100%)] rounded-[2rem]":
                  basicInfo.gender === 0,
                "bg-[#fff] ": basicInfo.gender !== 0,
              }
            )}
            style={{
              boxShadow:
                basicInfo.gender === 0
                  ? "0px 3px 4px 0px rgba(255, 255, 255, 0.25), 0px 4px 24px 0px #ECA89E"
                  : "",
            }}
            onClick={() => {
              setBasicInfo({ ...basicInfo, gender: 0 });
            }}
          >
            <div
              className={cn(
                "w-[7rem] h-[7rem] rounded-full flex items-center justify-center",
                {
                  "bg-[#EA8273] ": basicInfo.gender !== 0,
                  "bg-[#fff] ": basicInfo.gender === 0,
                }
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M35.75 2.5H22C21 2.5 20.25 3.25 20.25 4.25C20.25 5.25 21 6 22 6H31.25L25 12.5C22.5 10.5 19.5 9 16.25 9C8.75 9 2.5 15.5 2.5 23.25C2.5 31 8.75 37.5 16.25 37.5C23.75 37.5 30 31 30 23.25C30 20.25 29 17.25 27.5 15L34.25 8V18.5C34.25 19.5 35 20.25 36 20.25C37 20.25 37.75 19.5 37.75 18.5V4.25C37.5 3.25 36.75 2.5 35.75 2.5ZM16.25 34C10.5 34 6 29.25 6 23.25C6 17.25 10.5 12.5 16.25 12.5C22 12.5 26.5 17.25 26.5 23.25C26.5 29.25 22 34 16.25 34Z"
                  fill={basicInfo.gender === 0 ? "#EA8273" : "white"}
                />
              </svg>
            </div>
            <div
              className={cn(
                "text-center justify-start text-[1.6rem] font-bold font-['SF_Pro_Rounded'] leading-tight",
                {
                  "text-[#fff]": basicInfo.gender === 0,
                  "text-[#826662]": basicInfo.gender !== 0,
                }
              )}
            >
              Male
            </div>
          </div>

          <div
            className={cn(
              "w-[13.5rem] h-[16.6rem] px-[1rem] py-[3.5rem] rounded-[2rem] inline-flex flex-col justify-center items-center gap-[0.8rem]",
              {
                "bg-[linear-gradient(0deg,#EA8273_0%,#ECA89E_100%)] rounded-[2rem]":
                  basicInfo.gender === 1,
                "bg-[#fff] ": basicInfo.gender !== 1,
              }
            )}
            style={{
              boxShadow:
                basicInfo.gender === 1
                  ? "0px 3px 4px 0px rgba(255, 255, 255, 0.25), 0px 4px 24px 0px #ECA89E"
                  : "",
            }}
            onClick={() => {
              setBasicInfo({ ...basicInfo, gender: 1 });
            }}
          >
            {/* {basicInfo.gender === 1 ? (
            <img
              src="/img/genderbg.png"
              className="absolute -z-1 w-[16rem] h-[20.6rem]"
            ></img>
          ) : (
            <></>
          )} */}
            <div
              className={cn(
                "w-[7rem] h-[7rem] rounded-full flex items-center justify-center",
                {
                  "bg-[#EA8273] ": basicInfo.gender !== 1,
                  "bg-[#fff] ": basicInfo.gender === 1,
                }
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M30 30.625H21.875V26.675C28.225 25.75 33.125 20.325 33.125 13.75C33.125 6.525 27.25 0.625 20 0.625C12.75 0.625 6.875 6.525 6.875 13.75C6.875 20.35 11.775 25.775 18.125 26.675V30.625H10C8.975 30.625 8.125 31.475 8.125 32.5C8.125 33.525 8.975 34.375 10 34.375H18.125V37.5C18.125 38.525 18.975 39.375 20 39.375C21.025 39.375 21.875 38.525 21.875 37.5V34.375H30C31.025 34.375 31.875 33.525 31.875 32.5C31.875 31.475 31.025 30.625 30 30.625ZM10.625 13.75C10.625 8.575 14.825 4.375 20 4.375C25.175 4.375 29.375 8.575 29.375 13.75C29.375 18.925 25.175 23.125 20 23.125C14.825 23.125 10.625 18.925 10.625 13.75Z"
                  fill={basicInfo.gender === 1 ? "#EA8273" : "white"}
                />
              </svg>
            </div>
            <div
              className={cn(
                "text-center justify-start  text-[1.6rem] font-bold font-['SF_Pro_Rounded'] leading-tight",
                {
                  "text-[#fff]": basicInfo.gender === 1,
                  "text-[#826662]": basicInfo.gender !== 1,
                }
              )}
            >
              Female
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[4rem]" onClick={onClick}>
        <img
          src="/img/arrow_right.min.png"
          alt=""
          className="w-[12rem] h-[12rem]"
        />
      </div>
    </div>
  );
};

export default Age;
