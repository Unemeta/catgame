/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { ReactNode, useEffect, useRef, useState } from "react";
// import styles from "@/styles/Backpack.module.css";
import { jwtHelper } from "@/utils/jwt";
import { request } from "@/utils/request";
import { useFetchUser, useShowVocie, useCheckInDia } from "@/store";
import { toast } from "react-toastify";
import moment from "moment";
import SpeechRecognition from "@/components/SpeechRecognition";
import styles from "@/styles/Chat.module.css";
import { cn } from "@/lib/utils";
import LottieView from "@/components/lottie";
import { useRouter } from "next/router";
import CountdownTimer from "@/components/countDownReset";
import ImgView from "@/components/photeView";
import VideoPlayView from "@/components/videoPlay";
import DialogSetting from "@/components/dialog/setting";
import DialogExchange from "@/components/dialog/exchange";
import { DialogCheckIn } from "@/components/dialog/checkIn";
import VideoBackgroundChat from "@/components/VideoBackgroundChat";

let timerHistory: NodeJS.Timeout | null | undefined = null;
const ChatView = () => {
  const router = useRouter();
  const { userData, fetchUser } = useFetchUser();
  const [showVoice, setShowVoice] = useShowVocie();
  // const { scrollTop, clientHeight,scrollHieght } = useScrollTop("chatWindow");
  const [, setShowCheckIn] = useCheckInDia();

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [inputMsg, setinputMsg] = useState("");
  const [showExchange, setshowExchange] = useState(false);

  const [messageList, setmessageList] = useState<
    {
      chatId: string;
      msg: string;
      role: string;
      time: number;
      msgId: string;
      eventid: number;
    }[]
  >([]);
  const chatEndRef = useRef(null);
  const [toConnect, settoConnect] = useState(false);
  // const inputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showCatLoading, setshowCatLoading] = useState(false);

  useEffect(() => {
    fetchUser?.();
  }, []);

  useEffect(() => {
    (() => {
      if (timerHistory) {
        clearTimeout(timerHistory);
      }
      timerHistory = setTimeout(async () => {
        getHistory();
        getChatInfo();
      }, 3000);
      setTimeout(async () => {
        getChatInfo();
      }, 30 * 1000);
      setTimeout(() => {
        if (inputRef?.current) {
          inputRef.current.tabIndex = 0;
        }
      }, 2000);
    })();
    // if (typeof window !== "undefined") {
    //   import("eruda").then((eruda) => eruda.default.init());
    // }
  }, []);

  useEffect(() => {
    if (socket) {
      return;
    }
    const socketTemp = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}?token=${jwtHelper.getToken()}`
    );
    socketTemp.onopen = () => {
      console.log("Connected to the server22");
    };
    socketTemp.onmessage = (event) => {
      if (event?.type === "message" && event?.data !== "pong") {
        const msgRes = JSON.parse(event?.data);
        if (msgRes?.type === "text") {
          setchatCount(String(msgRes.chatCount));
        }
        if (
          msgRes.hasOwnProperty("message") &&
          msgRes["message"] != "Msg received"
        ) {
          //
        } else {
          return;
        }
        // getChatInfo();
        setmessageList((pre: any) => {
          const resArr = [
            ...pre,
            {
              msg: msgRes?.message,
              msgId: msgRes?.msgId,
              role: "cat",
              time: Math.floor(new Date().getTime() / 1000),
            },
          ];
          const uniqueArr = Array.from(
            new Set(resArr.map((message) => message.msgId))
          ).map((msgId) => resArr.find((message) => message.msgId === msgId));
          return uniqueArr;
        });
        setshowCatLoading(false);
        if (msgRes.hasOwnProperty("chatCount")) {
          setchatCount(String(msgRes.chatCount));
        }
      }
      // setMessages((prevMessages) => [...prevMessages, event.data]);
    };
    socketTemp.onclose = () => {
      console.log("Disconnected from the server");
      setSocket(null);
    };
    const heartbeatInterval = setInterval(() => {
      if (socketTemp.readyState === WebSocket.OPEN) {
        socketTemp.send("ping");
      }
    }, 30000);
    setSocket(socketTemp);
    return () => {
      clearInterval(heartbeatInterval);
      socketTemp.close();
      setSocket(null);
    };
  }, [toConnect]);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const sendMessage = () => {
    if (Number(chatCount) >= 20) {
      // toast.info("Insufficient ability to send message, buy more chat opportunities");
      setshowExchange(true);
      return;
    }
    if (socket) {
      if (inputMsg.length > 0) {
        inputRef.current?.blur();
        setmessageList((preMsgList: any) => {
          const chatId = `${new Date().getTime()}-${userData?.nickname}`;
          console.log(chatId);
          return [
            ...preMsgList,
            {
              chatId: chatId,
              msgId: chatId,
              msg: inputMsg,
              role: "user",
              time: Math.floor(new Date().getTime() / 1000),
            },
          ];
        });
        socket?.send(inputMsg);
        setshowCatLoading(true);
        setinputMsg("");
      } else {
        toast.info("Please enter msg");
      }
    } else {
      console.log("sk null");
      settoConnect((pre) => !pre);
    }
  };

  const sendMessageByVoice = (text: string) => {
    try {
      if (socket) {
        if (text?.length > 0) {
          setmessageList((preMsgList: any) => {
            return [
              ...preMsgList,
              {
                chatId: userData?.nickname,
                msg: text,
                role: "user",
                time: Math.floor(new Date().getTime() / 1000),
              },
            ];
          });
          socket?.send(text);
        } else {
          toast.info("Please enter msg");
        }
      } else {
        console.log("sk null");
        settoConnect((pre) => !pre);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleKeyDown = (event: any) => {
    if (event?.key === "Enter") {
      if (inputMsg.length > 0) {
        sendMessage();
        setTimeout(() => {
          handleInput(event, true);
        }, 1000);
        // event.preventDefault(); // 阻止默认换行行为
        // inputRef.current?.blur(); // 失去焦点，收起键盘
      } else {
        toast.info("Please enter msg");
      }
    }
  };
  const handleBlur = () => {
    console.log("输入完成，当前值:");
    inputRef.current?.blur(); // 失去焦点，收起键盘
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 平滑滚动
    });
  };
  const getHistory = async () => {
    try {
      const { data } = await request({
        url: `/api/cat/v1/chat/history?page=1&pageSize=500`,
        method: "get",
      });
      if (data?.msgList) {
        const resArr = [...data.msgList.reverse()];
        const uniqueArr = Array.from(
          new Set(resArr.map((message) => message.msgId))
        ).map((msgId) => resArr.find((message) => message.msgId === msgId));
        setmessageList(uniqueArr);
      }
    } catch (error: any) {
      console.error(error);
      // toast.error(error?.msg || JSON.stringify(error));
    }
  };
  const [chatCount, setchatCount] = useState("");
  const [farewellLetterStatus, setfarewellLetterStatus] = useState("");
  const getChatInfo = async () => {
    try {
      const { data } = await request({
        url: `/api/cat/v1/chat/info`,
        method: "get",
      });
      console.log(data);
      if (data.hasOwnProperty("chatCount")) {
        setchatCount(String(data.chatCount));
      }
      if (data.hasOwnProperty("farewellLetterStatus")) {
        setfarewellLetterStatus(String(data.farewellLetterStatus));
      }
    } catch (error: any) {
      console.error(error);
      // toast.error(error?.msg || JSON.stringify(error));
    }
  };
  const scrollToBottom = () => {
    if (chatEndRef.current) {
      (chatEndRef.current as any)?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };
  async function isVideoUrl(url: string) {
    try {
      const response = await fetch(url, { method: "HEAD" });
      const contentType = response.headers.get("Content-Type");
      return contentType && contentType.startsWith("video/");
    } catch (error) {
      return false;
    }
  }
  function isVideoEndUrl(url: string) {
    const videoExtensions = [
      ".mp4",
      ".avi",
      ".mov",
      ".wmv",
      ".mkv",
      ".flv",
      ".webm",
    ];
    return videoExtensions.some((extension) =>
      url.toLocaleLowerCase().endsWith(extension)
    );
  }
  function isImgEndUrl(url: string) {
    const imgEnds = [".png", ".jpg", ".jpeg"];
    return imgEnds.some((extension) =>
      url.toLocaleLowerCase().endsWith(extension)
    );
  }
  const mediaSwitch = (msg: string, msgId: string, eventid: number) => {
    if (msg.indexOf("http") > -1 || msg.indexOf("https") > -1) {
      if (isImgEndUrl(msg)) {
        return <ImgView src={msg} eventid={eventid} />;
      }
      if (isVideoEndUrl(msg)) {
        return (
          <VideoPlayView
            msg={msg}
            msg_id={msgId}
            eventid={eventid}
          ></VideoPlayView>
        );
      } else {
        return <div className="">{msg}</div>;
      }
    } else {
      return <div className="">{msg}</div>;
    }
  };

  const [value, setValue] = useState("");
  const maxRows = 5; // 最大行数
  const lineHeight = 24; // 行高，单位为 px
  const handleInput = (e: any, reset = false) => {
    // if (e.target.value.length < 30 || reset == true) {
    //   e.target.style.height = "auto"; // 重置高度以适应新内容
    //   e.target.style.height = `3.6rem`; // 设置为内容高度
    //   return;
    // }
    // const { scrollHeight } = e.target;
    // const currentRows = Math.floor(scrollHeight / lineHeight);
    // if (currentRows <= maxRows) {
    //   setValue(e.target.value);
    //   e.target.style.height = "auto"; // 重置高度以适应新内容
    //   e.target.style.height = `${scrollHeight}px`; // 设置为内容高度
    // } else {
    //   e.target.style.overflowY = "auto"; // 超过最大行数时显示滚动条
    //   e.target.style.height = `${maxRows * lineHeight}px`; // 限制高度
    //   setValue(e.target.value);
    // }
  };
  return (
    <div className={styles.DialogContent}>
      <div
        // bg-[url('/img/bg/bg_chat2.min.png')] bg-cover
        className={cn(
          " wrapHeight overflow-hidden  relative  w-[100vw] flex flex-col"
        )}
      >
        <div className="headerBackpack flex justify-between items-center  px-[2rem] pt-[1rem] pb-[1rem]">
          <div className="">
            {process.env.NEXT_PUBLIC_VERTICAL === "true" ? (
              <div className=""></div>
            ) : (
              <div
                className="flex justify-start items-center cursor-pointer select-none"
                onClick={() => {
                  router.push("/");
                }}
              >
                <img
                  src="/img/back.svg"
                  alt=""
                  className="backIcon dw25 dh25"
                />
                <span className="text-white dtext25 font-[500] dml15 backText">
                  Back
                </span>
              </div>
            )}
            <div
              className="px-[0.8rem] h-[2.4rem] flex justify-center items-center rounded-[10rem] border-white/30 border-[1px] bg-[linear-gradient(0deg,rgba(46,59,63,0.20)_0%,rgba(46,59,63,0.20)_100%),linear-gradient(180deg,rgba(146,207,236,0.60)_0%,rgba(172,224,249,0.60)_100%);]"
              onClick={() => {
                setshowExchange(true);
              }}
            >
              <img
                className="w-[2rem] h-[2rem] mr-[0.6rem]"
                src="/svg/fish.svg"
                alt=""
              />
              <span className="text-[#FFF] text-[1.4rem] font-[700]">
                {Number(userData?.fishAmount ?? 0).toLocaleString()}
              </span>
            </div>
          </div>
          {/* <div className="flex justify-end items-center ">
              {Number(chatCount) === 20 && (
                <div className="resetTimerView">
                  <div className="chatNumWrap text-white font-[500] flex justify-end items-center bg-white/10">
                    <img className="chatNumLeft" src="/img/clock.png" alt="" />
                    <div className="dpl10 dpr10 select-none">
                      <CountdownTimer></CountdownTimer>
                    </div>
                  </div>
                </div>
              )}
              <div className="h5ChatNum">
                <div className="chatNumWrap text-white font-[500] flex justify-end items-center bg-white/10">
                  <img
                    className="chatNumLeft"
                    src="/img/iconSpeak.min.png"
                    alt=""
                  />
                  <div className="dpl10 dpr10 ">
                    <span
                      className={cn("", {
                        "text-[#FF2549]": 20 - (Number(chatCount) || 0) === 0,
                      })}
                      style={{ fontFamily: "SF Pro Rounded" }}
                    >
                      {Number(chatCount) >= 0
                        ? 20 - (Number(chatCount) || 0)
                        : "-"}
                    </span>
                    <span
                      className="text-white/70 drm5"
                      style={{ fontFamily: "SF Pro Rounded" }}
                    >
                      /20
                    </span>
                  </div>
                  <PopoverChatNum></PopoverChatNum>
                </div>
              </div>
            </div> */}
          <div className="flex justify-end items-center">
            {/* 1 没发送 2 发送未读 3 发送已读 */}
            {(farewellLetterStatus == "2" || farewellLetterStatus == "3") && (
              <div
                className="relative"
                onClick={() => router.push(`/letter?id=${userData?.uuid}`)}
              >
                <div className="w-[0.8rem] h-[0.8rem] bg-[#E95658] absolute right-0 top-[-0.1rem] rounded-full"></div>
                <img
                  className="w-[2.4rem] h-[2.4rem]"
                  src="/img/emailBye.png"
                  alt=""
                />
              </div>
            )}

            <div className="w-[0.6rem]"></div>
            <DialogCheckIn
              trigger={
                <div className="px-[0.8rem] h-[2.4rem] flex justify-center items-center rounded-[10rem] border-white/30 border-[1px] bg-[linear-gradient(0deg,rgba(58,53,53,0.20)_0%,rgba(58,53,53,0.20)_100%),linear-gradient(180deg,rgba(255,152,146,0.60)_0%,rgba(255,185,181,0.60)_100%)]">
                  <img
                    className="w-[1.6rem] h-[1.6rem] mr-[0.6rem]"
                    src="/svg/check_ calendar.svg"
                    alt=""
                  />
                  <span className="text-[#FFF] text-[1.4rem] font-[700]">
                    day {userData?.day}
                  </span>
                </div>
              }
            ></DialogCheckIn>
            <div className="w-[0.6rem]"></div>
            <DialogSetting
              trigger={
                <img
                  className="w-[2.4rem] h-[2.4rem]"
                  src="/img/setting.min.png"
                  alt=""
                />
              }
            ></DialogSetting>
          </div>
        </div>
        {/* <div className=" flex flex-col chatCttH lmdWfull z-1 relative grow overflow-y-scroll"> */}
        {/* <img className=" w-full absolute z-[1]" src="/img/bg/bgChatMsgTop.min.png" alt="" /> */}
        {/* <div className="hidden chatBoxSizeHeight"></div> */}
        {/* <div
              className={cn("top-[1rem] left-0 absolute z-[111111]", {
                // "opacity-90": true,
              })}
            >
              <div className="w-[100vw] h-[5rem] bg-black/50 blur-[4rem]"></div>
            </div> */}
        <div
          className=" flex justify-end items-start dmb40 grow overflow-y-scroll relative"
          id="chatWindow"
        >
          <div
            className="chatCtt lmdWfull flex flex-col gap-[1.4rem]  dpr36"
            ref={chatEndRef}
          >
            {messageList?.map((item, index: number) => {
              if (item?.role === "user") {
                return (
                  <div className="" key={index}>
                    {index != 0 &&
                    item.time - messageList[index - 1].time < 5 * 60 ? (
                      <></>
                    ) : (
                      <div className="dtext24 font-[500] text-white dmb8 text-right msgTime flex justify-center py-[1.5rem]">
                        {moment(item.time * 1000)
                          .local()
                          .format("YYYY/MM/DD HH:mm")}
                      </div>
                    )}
                    <div className="dmaxW460 dmr25 msgTimeWrap relative flex justify-end items-center">
                      <div
                        className={cn("relative flex justify-end", {
                          // "opacity-50": index + 4 < messageList.length,
                        })}
                      >
                        <div className="send bg-[rgba(234,130,115,0.7)] flex justify-end items-start relative msgWrap">
                          <div className="msgText line-clamp-4 dtext28 font-[500] text-[#F5F2FF]  text-wrap lmdMsgSpan overflow-hidden break-words">
                            {item?.msg}
                          </div>
                        </div>
                        {/* <img
                              className=" rounded-full userIcon"
                              src="/img/avataUser.min.png"
                              alt=""
                            /> */}
                      </div>
                      <img
                        className=" rounded-full  userAvator"
                        src="/img/avataUser.min.png"
                        alt=""
                      />
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="" key={index}>
                    {index != 0 &&
                    item.time - messageList[index - 1].time < 5 * 60 ? (
                      <></>
                    ) : (
                      <div className="dtext24 font-[500] text-white  dmb8 text-right msgTime flex justify-center py-[1.5rem]">
                        {moment(item.time * 1000)
                          .local()
                          .format("YYYY/MM/DD HH:mm")}
                      </div>
                    )}
                    <div
                      className={cn("relative flex justify-start", {
                        // "opacity-70": index + 3 < messageList.length,
                      })}
                    >
                      <img
                        className=" rounded-full dmr25 robotAvator"
                        src="/img/avataCat.min.png"
                        alt=""
                      />
                      <div className="receive bg-[rgba(32,_35,_42,_0.50)] flex justify-start items-start msgWrap">
                        {/* <img
                              className=" rounded-full dmr25 robotAvator"
                              src="/img/avataCat.min.png"
                              alt=""
                            /> */}
                        <div className="dmaxW460 lmdWfull">
                          {/* <div className="dtext24 font-[500] text-[#F5F2FF]/60 dmb8 msgTime">
                                {moment(item.time * 1000)
                                  .local()
                                  .format("YYYY/MM/DD HH:mm")}
                              </div> */}
                          <div className="msgText line-clamp-4 dtext28 font-[500] text-[#F5F2FF] text-wrap whitespace-normal lmdMsgSpan break-words">
                            {mediaSwitch(item?.msg, item?.msgId, item?.eventid)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
            {showCatLoading && (
              <div className="">
                <div className="flex justify-start items-center h-[3rem] relative">
                  <img
                    className=" rounded-full dmr25 robotAvator"
                    src="/img/avataCat.min.png"
                    alt=""
                  />
                  <div className="bg-[rgba(32,_35,_42,_0.50)] px-[1rem] py-[0.7rem] rounded-[1.5rem] inline-block">
                    <div className="load-3 flex justify-start items-center">
                      <div className="line"></div>
                      <div className="line mx-[0.5rem]"></div>
                      <div className="line"></div>
                    </div>
                  </div>
                </div>
                <div className="h-[1rem]"></div>
              </div>
            )}
          </div>
        </div>
        {/* </div> */}
        {/* <div className="h-[10vh]"></div> */}
        {/* fixed bottom-0 left-0 */}
        <div className=" w-full">
          {showVoice ? (
            <SpeechRecognition
              language="zh_cn"
              onSend={(text) => sendMessageByVoice(text)}
            ></SpeechRecognition>
          ) : (
            <div className="textInput flex justify-center items-center sendSpeakerWrap relative">
              <div className="absolute top-[-3rem] right-[1rem]">
                {Number(chatCount) >= 20 ? (
                  <div className="flex justify-center items-center px-[1rem] py-[0.6rem] bg-[rgba(58,53,53,0.50)] border-white/20 border-[1px] rounded-[11rem]">
                    {/* <img
                          className="chatNumLeft"
                          src="/img/clock.png"
                          alt=""
                        /> */}
                    <span className="text-white text-[1rem] font-[500] mr-[0.4rem]">
                      Update
                    </span>
                    <div className="text-white text-[1rem] font-[800]">
                      <CountdownTimer></CountdownTimer>
                    </div>
                  </div>
                ) : (
                  <div className="px-[1rem] py-[0.6rem] bg-[rgba(58,53,53,0.50)] border-white/20 border-[1px] rounded-[11rem]">
                    <span className="text-white text-[1rem] font-[500]">
                      ChatPoints:{" "}
                      {Number(chatCount) >= 0
                        ? 20 - (Number(chatCount) || 0) >= 0
                          ? 20 - (Number(chatCount) || 0)
                          : 0
                        : "-"}
                      /20
                    </span>
                  </div>
                )}
              </div>
              <div className="" onClick={() => setShowVoice(true)}>
                <LottieView
                  src={"/lottie/v1.json"}
                  className={styles.newIcon}
                  loop={true}
                ></LottieView>
              </div>
              <div className="relative sendInputWrap flex grow rounded-[2.2rem] overflow-hidden">
                <textarea
                  tabIndex={-1}
                  ref={inputRef}
                  className="sendInput w-full bg-[#0f040f82] text-[1.4rem] text-white outline-none  font-[500] pl-[2rem] pr-[6rem] py-[0.6rem] flex justify-center items-center leading-[1.5]"
                  // type="text"
                  // rows={1}
                  onChange={(e) => setinputMsg(e.target.value)}
                  onInput={handleInput}
                  onKeyDown={(e) => {
                    handleKeyDown(e);
                  }}
                  onBlur={handleBlur}
                  value={inputMsg}
                  placeholder="What are you talking about?"
                />
                <img
                  onClick={() => {
                    sendMessage();
                  }}
                  className="w-[4.6rem] h-[2.8rem] absolute right-[0.4rem] bottom-[0.5rem]"
                  src="/img/sendMsg.min.png"
                  alt=""
                />
                {/* <div
                      className="lmdSend absolute dright80 top-[50%] dtranslateYF50 bg-[linear-gradient(0deg,_#BE6FFF_0%,_#6C8AFF_100%)] drounded20 dpx30 dpy20 text-white dtext24 font-[800] cursor-pointer select-none"
                      onClick={sendMessage}
                      onKeyDown={handleKeyDown}
                    >
                      Send
                    </div> */}
              </div>
            </div>
          )}
          <div className="h-[1rem]"></div>
        </div>
        {/* <div className="flex absolute left-[13%] top-[3%] chatEnegy">
              <ChatEnergy
                imgUrl="./img/chatPaw.min.png"
                label="Communication Energy"
                number={20}
              ></ChatEnergy>
            </div> */}
        {/* <div className={cn(styles.mask, "w-[100vw] absolute bottom-0")}></div> */}
        <DialogExchange
          id={1}
          cb={() => {
            fetchUser();
            getChatInfo();
          }}
          show={showExchange}
          setShow={setshowExchange}
        ></DialogExchange>
        <VideoBackgroundChat />
      </div>
    </div>
  );
};

export default ChatView;
