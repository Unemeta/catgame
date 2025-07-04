/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from ".";
import { useCheckInDia, useFetchUser } from "@/store";
import { cn } from "@/lib/utils";
import { request } from "@/utils/request";
import LottieView from "@/components/lottie";
import { FadeComponent } from "@/components/FadeComponent";
interface iDialogCheckIn {
  trigger?: ReactNode;
}
export const SignToast = () => {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 1000,
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: "100vw",
      }}
    >
      <div
        className="w-[100%] px-[6rem] py-[1rem] outline-1 outline-offset-[-1px] outline-stone-400/0 inline-flex flex-col justify-center items-center gap-2 z-100 top-[40%]"
        style={{
          background:
            "linear-gradient(90deg, rgba(108, 73, 55, 0.00) 0%, #6C4937 49.52%, rgba(108, 73, 55, 0.00) 100%)",
        }}
      >
        <div className="relative opacity-90 overflow-hidden">
          <img
            src="/img/check-circle-broken.png"
            alt=""
            className="w-[1.8rem] h-[1.8rem]"
          />
        </div>
        <div className="self-stretch text-center justify-start text-white text-[1.4rem] font-bold font-['SF_Pro_Rounded'] leading-none">
          Sign in successfully
        </div>
      </div>
    </div>
  );
};
export const DialogCheckIn = ({ trigger }: iDialogCheckIn) => {
  const [showCheckIn, setShowCheckIn] = useCheckInDia();
  const { fetchUser } = useFetchUser();
  const [isVisible, setIsVisible] = useState(true);
  // 当动画播放完成时调用的函数
  const handleAnimationComplete = () => {
    setIsVisible(false); // 播放完成后隐藏
  };

  //   const [loading, setLoading] = useState(false);
  const [checkdays, setCheckdays] = useState([
    {
      day: 1,
      checked: false,
    },
    {
      day: 2,
      checked: false,
    },
    {
      day: 3,
      checked: false,
    },
    {
      day: 4,
      checked: false,
    },
    {
      day: 5,
      checked: false,
    },
    {
      day: 6,
      checked: false,
    },
    {
      day: 7,
      checked: false,
    },
  ]);
  const [showToast, setShowToast] = useState(false);

  const checkIn = async () => {
    try {
      const res = await request({
        url: "/api/cat/v1/user/checkin",
        method: "post",
      });
      console.log(res);
      const { checkinNums, isCheckin } = res.data;
      setCheckdays(
        checkdays.map((item) => {
          if (item.day <= checkinNums) {
            return {
              ...item,
              checked: true,
            };
          }
          return item;
        })
      );
      if (isCheckin) {
        // 自动签到展示
        setShowCheckIn(true);
        setShowToast(true);
        fetchUser();
        setTimeout(() => {
          setShowToast(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
    // setLoading(false);
  };
  useEffect(() => {
    checkIn();
  }, []);
  return (
    <>
      <Dialog open={showCheckIn} onOpenChange={setShowCheckIn}>
        <DialogTrigger className="outline-none">{trigger}</DialogTrigger>
        <DialogContent className="outline-none">
          <DialogTitle></DialogTitle>

          {showToast && <SignToast></SignToast>}
          <div className="w-[30rem] h-[35rem] relative outline-none">
            <div
              className="self-stretch rounded-[3rem] inline-flex flex-col justify-start items-center gap-4 overflow-hidden w-full bg-[linear-gradient(187deg,#B48471_-9.74%,rgba(212,204,195,0.60)_72.93%)] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.55)] border-[#FFFFF7] border-[0.2rem]"
              // style={{
              //   background:
              //     "linear-gradient(187deg, #B48471 -9.74%, rgba(212, 204, 195, 0.60) 72.93%)",
              //   border: "2px solid #FFFFF7;",
              // }}
            >
              {/* 标题 */}
              <div
                className="text-center justify-start text-yellow-900 text-[1.8rem] font-extrabold font-['SF_Pro_Rounded'] leading-snug p-[1rem] rounded-tl-[3rem] rounded-tr-[3rem] w-full"
                style={{
                  background:
                    "linear-gradient(180deg, #E3BFA5 0%, #DDB293 100%",
                }}
              >
                Daily Check-in
              </div>

              <div className="self-stretch px-[2rem] flex flex-col justify-start items-center gap-2.5">
                <div className="self-stretch text-white text-[1.2rem] leading-none [text-shadow:_0px_0px_8px_rgb(255_255_255_/_0.45)] text-center">
                  Please visit every day to get better rewards.
                </div>
                <div className="self-stretch inline-flex justify-start items-start gap-1.5">
                  {/* 左边的猫图 */}
                  <img
                    className="w-[8.5rem] self-stretch rounded-[1rem]  outline-1 outline-stone-400/80"
                    src="/img/catexample.png"
                  />
                  <div className="flex-1 flex justify-around items-start gap-[0.5rem] flex-wrap">
                    {checkdays.map((item) => {
                      return (
                        <div
                          className={cn(
                            "p-[0.8rem] relative bg-white/30 rounded-[10px] outline-1 outline-offset-[-1px] outline-white/20 inline-flex flex-col justify-start items-center gap-px w-[31%]",
                            {
                              "w-[100%] flex-row justify-around":
                                item.day === 7,
                            }
                          )}
                          key={item.day}
                          onClick={checkIn}
                        >
                          <div className="relative">
                            <div
                              className={cn("relative w-[4rem]", {
                                "opacity-50": item.checked,
                              })}
                            >
                              <img className="" src="/img/fishitem.png" />
                            </div>
                            <div
                              className={cn(
                                "self-stretch text-center justify-start text-stone-600 text-[1.4rem] font-semibold font-['SF_Pro_Rounded'] leading-3 mt-[0.3rem]",
                                {
                                  "opacity-50": item.checked,
                                }
                              )}
                            >
                              x20
                            </div>

                            {isVisible && item.checked ? (
                              <>
                                {/* <LottieView
                                  src={"/lottie/fishclick.json"}
                                  loop={false}
                                  className="absolute top-0"
                                ></LottieView> */}
                                <LottieView
                                  src={"/lottie/fishpoint.json"}
                                  loop={false}
                                  className="absolute top-0"
                                  onEvent={(event: string) => {
                                    if (event === "complete") {
                                      handleAnimationComplete();
                                    }
                                  }}
                                ></LottieView>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>

                          {item.day === 7 && (
                            <div>
                              <div
                                className={cn("relative w-[4rem]", {
                                  "opacity-50": item.checked,
                                })}
                              >
                                <img className="" src="/img/fishitem.png" />
                              </div>
                              <div
                                className={cn(
                                  "self-stretch text-center justify-start text-stone-600 text-[1.4rem] font-semibold font-['SF_Pro_Rounded'] leading-3 mt-[0.3rem]",
                                  {
                                    "opacity-50": item.checked,
                                  }
                                )}
                              >
                                x20
                              </div>
                            </div>
                          )}
                          {item.checked ? (
                            <img
                              src="/img/footcheck.png"
                              alt=""
                              className="w-[2.7rem] h-[2.7rem] left-[-0.4rem] top-[-0.4rem] absolute animate__bounceIn"
                            />
                          ) : (
                            <FadeComponent show={!item.checked}>
                              <div className="px-[0.5rem] py-[0.3rem] left-[-0.4rem] top-[-0.4rem] absolute bg-white rounded-[2rem] outline-1 outline-white inline-flex justify-center items-center gap-2.5">
                                <div className="justify-start text-red-400 text-[1.2rem] font-['SF_Pro_Rounded'] leading-3">
                                  Day {item.day}
                                </div>
                              </div>
                            </FadeComponent>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="h-[4rem]"></div>
              {/* <div className="flex justify-center items-center">
                <div
                  className={cn(
                    "self-stretch pb-4 flex flex-col justify-start items-center gap-2.5",
                    {
                      "opacity-50": loading,
                    }
                  )}
                  onClick={() => {
                    setShowCheckIn(false);
                  }}
                >
                  <div className="w-[13.2rem] h-[3.8rem] px-5 py-3 bg-white rounded-[31.74px] shadow-[0px_4px_24px_0px_rgba(214,90,63,0.60)] shadow-[0px_3px_14px_0px_rgba(255,255,255,0.45)] inline-flex justify-center items-center gap-2">
                    {loading && (
                      <img
                        src="/img/loading.png"
                        alt=""
                        className="w-[1.8rem]"
                      />
                    )}
                    <div className="text-center justify-start text-[#E96856] text-[1.6rem] font-extrabold font-['SF_Pro_Rounded'] leading-tight">
                      Confirm
                    </div>
                  </div>
                </div>
              </div> */}
            </div>

            <div className="flex absolute top-[2rem] right-[2.5rem] translate-x-[100%] translate-y-[-80%]">
              <DialogTrigger className="outline-none">
                <div className="flex justify-center items-center cursor-pointer select-none">
                  <img
                    className="w-[4rem] h-auto"
                    src="/img/close.png"
                    alt=""
                  />
                </div>
              </DialogTrigger>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
