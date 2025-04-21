/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { ReactNode, useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from ".";
import styles from "@/styles/Backpack.module.css";
import { jwtHelper } from "@/utils/jwt";
import { request } from "@/utils/request";
import { useFetchUser } from "@/store";
import { toast } from "react-toastify";
import moment from "moment";
interface iDialogChatView {
  trigger?: ReactNode;
}
let timerHistory: NodeJS.Timeout | null | undefined = null;
const DialogChatView = ({ trigger }: iDialogChatView) => {
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useFetchUser();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [inputMsg, setinputMsg] = useState("");
  const [messageList, setmessageList] = useState<
    { chatId: string; msg: string; role: string; time: number }[]
  >([]);
  const chatEndRef = useRef(null);
  const [toConnect, settoConnect] = useState(false);

  useEffect(() => {
    (() => {
      if (timerHistory) {
        clearTimeout(timerHistory);
      }
      timerHistory = setTimeout(async () => {
        getHistory();
      }, 3000);
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
      console.log('sk null')
      settoConnect((pre) => !pre);
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
      toast.error(error?.msg || JSON.stringify(error));
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
          <div className="flex flex-col chatCttH">
            <div className="flex justify-end items-start dmb40 grow overflow-y-scroll">
              <div
                className="chatCtt flex flex-col dgap20 overflow-y-scroll dpr36"
                ref={chatEndRef}
              >
                {messageList?.map((item, index: number) => {
                  if (item?.role === "user") {
                    return (
                      <div
                        key={index}
                        className="send dp24 drounded30 bg-[rgba(90,_35,_92,_0.30)] flex justify-between items-start overflow-hidden"
                      >
                        <div className="dmaxW460 lmd:max-w-[400px] dmr25 w-full">
                          <div className="dtext24 font-[500] text-[#F5F2FF]/60 dmb8 text-right">
                            {moment(item.time * 1000).format(
                              "YYYY/MM/DD hh:mm"
                            )}
                          </div>
                          <div className="dtext28 font-[500] text-[#F5F2FF]  text-wrap">
                            {item?.msg}
                          </div>
                        </div>
                        <img
                          className="dw65 dh65 rounded-full "
                          src="/img/1.jpg"
                          alt=""
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={index}
                        className="receive dp24 drounded30 bg-[rgba(90,_35,_92,_0.30)] flex justify-start items-start overflow-hidden"
                      >
                        <img
                          className="dw65 dh65 rounded-full dmr25"
                          src="/img/1.jpg"
                          alt=""
                        />
                        <div className="dmaxW460 lmd:max-w-[400px]">
                          <div className="dtext24 font-[500] text-[#F5F2FF]/60 dmb8">
                            {moment(item.time * 1000).format(
                              "YYYY/MM/DD hh:mm"
                            )}
                          </div>
                          <div className="dtext28 font-[500] text-[#F5F2FF] text-wrap whitespace-normal">
                            {item?.msg}
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="textInput flex justify-center items-center h-[100px] dpb80">
              <div className="relative">
                <input
                  className="drounded160 dborderW4 border-[#FFF] dw780 dh100 bg-white/70 dmr30  dpl15 dpr155 outline-none text-[#522192] dtest24 font-[800]"
                  type="text"
                  onChange={(e) => setinputMsg(e.target.value)}
                  onKeyDown={handleKeyDown}
                  value={inputMsg}
                />
                <div
                  className="absolute dright80 top-[50%] dtranslateYF50 bg-[linear-gradient(0deg,_#BE6FFF_0%,_#6C8AFF_100%)] drounded20 dpx30 dpy20 text-white dtext24 font-[800] cursor-pointer select-none"
                  onClick={sendMessage}
                  onKeyDown={handleKeyDown}
                >
                  Send
                </div>
              </div>
              <img className="dw120 dh120" src="/img/speak.min.png" alt="" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogChatView;
