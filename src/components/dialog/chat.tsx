/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { ReactNode, useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from ".";
// import styles from "@/styles/Backpack.module.css";
import { jwtHelper } from "@/utils/jwt";
import { request } from "@/utils/request";
import { useFetchUser, useShowVocie } from "@/store";
import { toast } from "react-toastify";
import moment from "moment";
import { TopItem } from "../TopItem";
import { ChatEnergy } from "../chatEnergy";
import SpeechRecognition from "@/components/SpeechRecognition";
import VideoBackground from "../VideoBackground";
import styles from "@/styles/Chat.module.css";
import { cn } from "@/lib/utils";
import LottieView from "@/components/lottie";

interface iDialogChatView {
  trigger?: ReactNode;
}
let timerHistory: NodeJS.Timeout | null | undefined = null;
const DialogChatView = ({ trigger }: iDialogChatView) => {
  const [isOpen, setIsOpen] = useState(false);
  const { userData, fetchUser } = useFetchUser();
  const [showVoice, setShowVoice] = useShowVocie();

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [inputMsg, setinputMsg] = useState("");
  const [messageList, setmessageList] = useState<
    { chatId: string; msg: string; role: string; time: number }[]
  >([]);
  const chatEndRef = useRef(null);
  const [toConnect, settoConnect] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    (() => {
      if (timerHistory) {
        clearTimeout(timerHistory);
      }
      timerHistory = setTimeout(async () => {
        getHistory();
        getChatInfo();
      }, 3000);
      setTimeout(() => {
        if (inputRef?.current) {
          inputRef.current.tabIndex = 0;
        }
      }, 2000);
    })();
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
        getChatInfo();
        setmessageList((pre) => {
          return [
            ...pre,
            {
              chatId: userData?.nickname,
              msg: event?.data,
              role: "cat",
              time: Math.floor(new Date().getTime() / 1000),
            },
          ];
        });
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
    if (socket) {
      if (inputMsg?.length > 0) {
        setmessageList((preMsgList) => {
          return [
            ...preMsgList,
            {
              chatId: userData?.nickname,
              msg: inputMsg,
              role: "user",
              time: Math.floor(new Date().getTime() / 1000),
            },
          ];
        });
        socket?.send(inputMsg);
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
          setmessageList((preMsgList) => {
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
      sendMessage();
    }
  };
  const getHistory = async () => {
    try {
      const { data } = await request({
        url: `/api/cat/v1/chat/history?page=1&pageSize=1000`,
        method: "get",
      });
      if (data?.msgList) {
        setmessageList([...data.msgList.reverse()]);
      }
    } catch (error: any) {
      console.error(error);
      // toast.error(error?.msg || JSON.stringify(error));
    }
  };
  const [chatCount, setchatCount] = useState("");
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
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTitle></DialogTitle>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className={styles.DialogContent}>
        <div className={styles.contentBgChat}>
          <div className="relative h-[100vh] w-[100vw]">
            <div className="headerBackpack flex justify-between items-center dpl50 dpt18 dpb18 dpr110 dh90">
              <div
                className="flex justify-start items-center cursor-pointer select-none"
                onClick={() => {
                  setIsOpen(false);
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
                      {20 - (Number(chatCount) || 0)}
                    </span>
                    <span
                      className="text-white/70 drm5"
                      style={{ fontFamily: "SF Pro Rounded" }}
                    >
                      /20
                    </span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="chatNumRight"
                  >
                    <g clip-path="url(#clip0_2028_5852)">
                      <path
                        d="M6.05967 6C6.21641 5.55445 6.52578 5.17874 6.93298 4.93942C7.34018 4.70011 7.81894 4.61263 8.28446 4.69248C8.74998 4.77233 9.17222 5.01435 9.47639 5.37569C9.78057 5.73702 9.94705 6.19435 9.94634 6.66667C9.94634 8 7.94634 8.66667 7.94634 8.66667M7.99967 11.3333H8.00634M14.6663 8C14.6663 11.6819 11.6816 14.6667 7.99967 14.6667C4.31778 14.6667 1.33301 11.6819 1.33301 8C1.33301 4.3181 4.31778 1.33334 7.99967 1.33334C11.6816 1.33334 14.6663 4.3181 14.6663 8Z"
                        stroke="#FFF41A"
                        stroke-opacity="0.7"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2028_5852">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col chatCttH lmdWfull z-1 relative">
              <div className="hidden chatBoxSizeHeight"></div>
              <div className="flex justify-end items-start dmb40 grow overflow-y-scroll">
                <div
                  className="chatCtt lmdWfull flex flex-col dgap20 overflow-y-scroll dpr36"
                  ref={chatEndRef}
                >
                  {messageList?.map((item, index: number) => {
                    if (item?.role === "user") {
                      return (
                        <div className="relative" key={index}>
                          <div className="send bg-[rgba(36,225,55,.9)] flex justify-between items-start relative msgWrap">
                            <div className="dmaxW460 dmr25 msgTimeWrap">
                              <div className="dtext24 font-[500] text-[#F5F2FF]/60 dmb8 text-right msgTime">
                                {moment(item.time * 1000).format(
                                  "YYYY/MM/DD hh:mm"
                                )}
                              </div>
                              <div className="dtext28 font-[500] text-[#F5F2FF]  text-wrap lmdMsgSpan overflow-hidden">
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
                      );
                    } else {
                      return (
                        <div className="relative" key={index}>
                          <img
                            className=" rounded-full dmr25 robotAvator"
                            src="/img/avataCat.min.png"
                            alt=""
                          />
                          <div className="receive bg-[rgba(90,_35,_92,_0.30)] flex justify-start items-start msgWrap">
                            {/* <img
                              className=" rounded-full dmr25 robotAvator"
                              src="/img/avataCat.min.png"
                              alt=""
                            /> */}
                            <div className="dmaxW460 lmdWfull">
                              <div className="dtext24 font-[500] text-[#F5F2FF]/60 dmb8 msgTime">
                                {moment(item.time * 1000).format(
                                  "YYYY/MM/DD hh:mm"
                                )}
                              </div>
                              <div className="dtext28 font-[500] text-[#F5F2FF] text-wrap whitespace-normal lmdMsgSpan">
                                {item?.msg}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="lmdSizebox hidden"></div>
              {showVoice ? (
                <SpeechRecognition
                  language="zh_cn"
                  onSend={(text) => sendMessageByVoice(text)}
                ></SpeechRecognition>
              ) : (
                <div className="textInput flex justify-center items-center sendSpeakerWrap">
                  <div className="relative sendInputWrap flex ">
                    <input
                      tabIndex={-1}
                      ref={inputRef}
                      className="sendInput drounded160 dw780 bg-[#0f040f82] dpl15 outline-none  font-[800]"
                      type="text"
                      onChange={(e) => setinputMsg(e.target.value)}
                      onKeyDown={handleKeyDown}
                      value={inputMsg}
                      placeholder="What are you talking about?"
                    />
                    {/* <div
                      className="lmdSend absolute dright80 top-[50%] dtranslateYF50 bg-[linear-gradient(0deg,_#BE6FFF_0%,_#6C8AFF_100%)] drounded20 dpx30 dpy20 text-white dtext24 font-[800] cursor-pointer select-none"
                      onClick={sendMessage}
                      onKeyDown={handleKeyDown}
                    >
                      Send
                    </div> */}
                  </div>
                  <div onClick={() => setShowVoice(true)}>
                    <LottieView
                      src={"/lottie/v1.json"}
                      className={styles.newIcon}
                      loop={true}
                    ></LottieView>
                  </div>
                </div>
              )}

              <div className="lmdSizebox hidden"></div>
            </div>
            {/* <div className="flex absolute left-[13%] top-[3%] chatEnegy">
              <ChatEnergy
                imgUrl="./img/chatPaw.min.png"
                label="Communication Energy"
                number={20}
              ></ChatEnergy>
            </div> */}
            <div
              className={cn(styles.mask, "w-[100vw] absolute bottom-0")}
            ></div>
          </div>
          {/* <VideoBackground /> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogChatView;
