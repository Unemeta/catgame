/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
interface iAnswerView {
  onClick: VoidFunction;
}
import { useUserBasicInfo } from "@/store/info";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const Gender = ({ onClick }: iAnswerView) => {
  const [basicInfo, setBasicInfo] = useUserBasicInfo();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center mt-[11rem] h-[58rem]">
      <div className="text-center justify-start text-[#EA8373] text-[2.4rem] font-[700] font-['SF_Pro_Rounded'] leading-9">
        {t("info.wgender")}
      </div>
      <div className="h-[36rem]">
        <div className="flex gap-[3rem] mt-[3rem] flex-wrap justify-center">
          <div
            className={cn(
              "w-[13.5rem] h-[16.6rem] px-[1rem] py-[3.5rem] rounded-[2rem] inline-flex flex-col justify-center items-center gap-[0.8rem]",
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
              {t("info.male")}
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
              {t("info.female")}
            </div>
          </div>



          <div
            className={cn(
              "w-[13.5rem] h-[16.6rem] px-[1rem] py-[3.5rem] rounded-[2rem] inline-flex flex-col justify-center items-center gap-[0.8rem]",
              {
                "bg-[linear-gradient(0deg,#EA8273_0%,#ECA89E_100%)] rounded-[2rem]":
                  basicInfo.gender === 2,
                "bg-[#fff] ": basicInfo.gender !== 2,
              }
            )}
            style={{
              boxShadow:
                basicInfo.gender === 2
                  ? "0px 3px 4px 0px rgba(255, 255, 255, 0.25), 0px 4px 24px 0px #ECA89E"
                  : "",
            }}
            onClick={() => {
              setBasicInfo({ ...basicInfo, gender: 2 });
            }}
          >
            <div
              className={cn(
                "w-[7rem] h-[7rem] rounded-full flex items-center justify-center",
                {
                  "bg-[#EA8273] ": basicInfo.gender !== 2,
                  "bg-[#fff] ": basicInfo.gender === 2,
                }
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="32" viewBox="0 0 20 32" fill="none">
                <path d="M9.90039 0C10.6735 8.56145e-05 11.2998 0.627245 11.2998 1.40039V4.20801L13.9121 2.7002C14.5816 2.31364 15.4385 2.54346 15.8252 3.21289C16.2113 3.88239 15.9819 4.73848 15.3125 5.125L13.0625 6.42285L15.4463 7.7998C16.1159 8.1864 16.3456 9.04328 15.959 9.71289C15.5723 10.382 14.7163 10.611 14.0469 10.2246L11.2998 8.63867V12.0869C16.2084 12.7242 20 16.9178 20 22C20 27.5228 15.5228 32 10 32C4.47715 32 0 27.5228 0 22C0 16.987 3.68878 12.8361 8.5 12.1123V9.05762L5.61328 10.7246C4.94382 11.1108 4.08679 10.8822 3.7002 10.2129C3.31385 9.54344 3.54366 8.68647 4.21289 8.2998L7.46191 6.42285L4.34668 4.625C3.67765 4.23832 3.44879 3.38225 3.83496 2.71289C4.22148 2.04341 5.07752 1.81391 5.74707 2.2002L8.5 3.78906V1.40039C8.5 0.627366 9.12743 0.000283004 9.90039 0ZM10 15C6.13401 15 3 18.134 3 22C3 25.866 6.13401 29 10 29C13.866 29 17 25.866 17 22C17 18.134 13.866 15 10 15Z" fill={basicInfo.gender === 2 ? "#EA8273" : "white"} />
              </svg>
            </div>
            <div
              className={cn(
                "text-center justify-start  text-[1.6rem] font-bold font-['SF_Pro_Rounded'] leading-tight",
                {
                  "text-[#fff]": basicInfo.gender === 2,
                  "text-[#826662]": basicInfo.gender !== 2,
                }
              )}
            >
              {/* {t("info.female")} */}
              Non-binary
            </div>
          </div>
          <div
            className={cn(
              "w-[13.5rem] h-[16.6rem] px-[1rem] py-[3.5rem] rounded-[2rem] inline-flex flex-col justify-center items-center gap-[0.8rem]",
              {
                "bg-[linear-gradient(0deg,#EA8273_0%,#ECA89E_100%)] rounded-[2rem]":
                  basicInfo.gender === 3,
                "bg-[#fff] ": basicInfo.gender !== 3,
              }
            )}
            style={{
              boxShadow:
                basicInfo.gender === 3
                  ? "0px 3px 4px 0px rgba(255, 255, 255, 0.25), 0px 4px 24px 0px #ECA89E"
                  : "",
            }}
            onClick={() => {
              setBasicInfo({ ...basicInfo, gender: 3 });
            }}
          >
            <div
              className={cn(
                "w-[7rem] h-[7rem] rounded-full flex items-center justify-center",
                {
                  "bg-[#EA8273] ": basicInfo.gender !== 3,
                  "bg-[#fff] ": basicInfo.gender === 3,
                }
              )}
            >

              <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
                <path d="M14.5 5C20.8513 5 26 10.1487 26 16.5C26 22.8513 20.8513 28 14.5 28C8.14873 28 3 22.8513 3 16.5C3 10.1487 8.14873 5 14.5 5ZM14.5 7.875C9.73654 7.875 5.875 11.7365 5.875 16.5C5.875 21.2635 9.73654 25.125 14.5 25.125C19.2635 25.125 23.125 21.2635 23.125 16.5C23.125 11.7365 19.2635 7.875 14.5 7.875ZM15.4014 19.4287C15.638 19.192 16.0221 19.192 16.2588 19.4287C16.4951 19.6653 16.495 20.0485 16.2588 20.2852L15.5439 20.999L16.2588 21.7139C16.4953 21.9505 16.4953 22.3347 16.2588 22.5713C16.0222 22.8079 15.638 22.8078 15.4014 22.5713L14.6865 21.8564L13.9727 22.5713C13.736 22.8075 13.3528 22.8076 13.1162 22.5713C12.8795 22.3346 12.8795 21.9505 13.1162 21.7139L13.8301 20.999L13.1162 20.2852C12.8796 20.0485 12.8796 19.6654 13.1162 19.4287C13.3529 19.1921 13.736 19.1921 13.9727 19.4287L14.6865 20.1426L15.4014 19.4287ZM10.4746 14.2002C11.4272 14.2002 12.2001 14.9722 12.2002 15.9248C12.2002 16.8775 11.4273 17.6504 10.4746 17.6504C9.5221 17.6502 8.75 16.8774 8.75 15.9248C8.75011 14.9723 9.52216 14.2004 10.4746 14.2002ZM18.5254 14.2002C19.4778 14.2004 20.2499 14.9723 20.25 15.9248C20.25 16.8774 19.4779 17.6502 18.5254 17.6504C17.5727 17.6504 16.7998 16.8775 16.7998 15.9248C16.7999 14.9722 17.5728 14.2002 18.5254 14.2002Z" fill={basicInfo.gender === 3 ? "#EA8273" : "white"} />
              </svg>
            </div>
            <div
              className={cn(
                "text-center justify-start  text-[1.6rem] font-bold font-['SF_Pro_Rounded'] leading-tight",
                {
                  "text-[#fff]": basicInfo.gender === 3,
                  "text-[#826662]": basicInfo.gender !== 3,
                }
              )}
            >
              {/* {t("info.female")} */}
              {/* Not to say */}
              {/* 不愿透露 */}
              ノンバイナリー
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[3rem]" onClick={onClick}>
        <img
          src="/img/arrow_right.min.png"
          alt=""
          className="w-[10rem] h-[10rem]"
        />
      </div>
    </div>
  );
};

export default Gender;
