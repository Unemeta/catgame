/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from "react";
import styles from "@/styles/Login.module.css"; // 确保有对应的 CSS 文件
import { cn } from "@/lib/utils";
import { request } from "@/utils/request";
import { jwtHelper } from "@/utils/jwt";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useFetchUser } from "@/store";
import { useTranslation } from "react-i18next";
import * as globalApi from "@/services/global";
// import { debounce } from "lodash";
import useDebouncelog from '@/hook/useDebounceLog'
// import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

interface ProgressLoaderProps {
  progress: number;
}

const ProgressLoader: React.FC<ProgressLoaderProps> = () => {
  const [account, setAccount] = useState("");
  const { fetchUser } = useFetchUser();
  const { i18n, t } = useTranslation();
  const router = useRouter();
  const [invalid, setInvalid] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // 延迟埋点
  const debouncedlog = useDebouncelog("account_input");
  // const debouncedSearch = useRef(
  //   debounce(() => {
  //     console.log("执行埋点:");
  //   }, 3000) // 500ms 延迟
  // ).current;

  const getStep = async () => {
    const res = await request({
      url: "/api/survey/survey/step",
      method: "get",
    });
    const { step } = res.data;
    //0 代表未填写过基础信息
    //1 代表填写过基础信息，未填写过mbti
    //2 代表填写过基础信息和mbti
    if (step === 0) {
      router.push("/info");
    }
    if (step === 1) {
      router.push("/question");
    }
    if (step === 2) {
      router.push("/chat");
    }
  };
  const login = async () => {
    if (account) {
      const advancedEmailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!advancedEmailRegex.test(account)) {
        // toast.error("Invalid email format");
        setInvalid(true);
        return;
      }
      try {
        const res = await request({
          url: "/api/user/login",
          method: "post",
          data: {
            username: account,
            source: 1,
          },
        });
        await jwtHelper.setToken(res.data.accessToken, {
          expires: new Date(res.data.accessExpire * 1000),
        });
        globalApi.eventRecord("account_login");
        // if (process.env.NEXT_PUBLIC_VERTICAL === "true") {
        //   getStep();
        // } else {
        //   router.push("/");
        // }
        const userData = await fetchUser?.();
        if (userData) {
          // 1:中文, 2:英文, 3:日文
          if (userData?.language == 1) {
            i18n.changeLanguage("zh");
            localStorage.setItem("locale", "zh");
          } else if (userData?.language == 2) {
            i18n.changeLanguage("en");
            localStorage.setItem("locale", "en");
          } else if (userData?.language == 3) {
            i18n.changeLanguage("ja");
            localStorage.setItem("locale", "ja");
          } else {
            console.log(`other locale ${userData?.language}`);
            const navLanguage = navigator.language;
            console.log(navLanguage);
            //  1:中文, 2:英文, 3:日文
            let languageNum = 2;
            if (navLanguage.startsWith("zh")) {
              languageNum = 1;
              localStorage.setItem("locale", "zh");
              i18n.changeLanguage("zh");
            } else if (navLanguage.startsWith("en")) {
              languageNum = 2;
              localStorage.setItem("locale", "en");
              i18n.changeLanguage("en");
            } else if (navLanguage.startsWith("ja")) {
              localStorage.setItem("locale", "ja");
              i18n.changeLanguage("ja");
              languageNum = 3;
            } else {
              languageNum = 2;
            }
            try {
              const { data } = await request({
                url: `/api/user/language/set?language=${languageNum}`,
                method: "get",
              });

              console.log(data);
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
              console.error(error);
              // toast.error(error?.msg || JSON.stringify(error));
            }
          }
        }
        getStep();
      } catch (error: any) {
        console.log(error);
        toast.error(error.message || JSON.stringify(error));
      }
    }
  };
  const handleKeyDown = (event: { key: string }) => {
    console.log(event.key);
    debouncedlog()
    if (event?.key === "Enter") {
      login();
    }
  };
  const handleFocus = () => {
    // 确保inputRef.current存在
    if (inputRef.current) {
      // 使用scrollIntoView，可以配置参数
      inputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center", // 可以尝试 'start', 'center', 'end' 或 'nearest'
      });
      // 另一种方法是使用scrollIntoViewIfNeeded，但这不是标准方法，兼容性较差
      // 所以还是用标准的scrollIntoView
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-[#DE8D81]">
      <img src="/img/loginlogo.png" alt="" className="w-[9rem] h-[9rem]" />
      <div
        className={cn(
          "bg-[url('/img/modelBg1.png')] bg-cover w-[31rem] h-[29rem] p-[2rem] overflow-hidden relative"
        )}
      >
        <div
          className={cn(
            "flex gap-[1rem] border-[1px] border-solid border-[#EBD8D2] h-[4.5rem] rounded-[2rem] items-center mt-[4.5rem] p-[1.4rem]",
            {
              "bg-[#FDD]": invalid,
            }
          )}
        >
          <img src="/img/mail.png" alt="" className="w-[1.8rem] h-[1.8rem]" />
          <input
            value={account}
            placeholder={t("login.enter")}
            onKeyDown={handleKeyDown}
            onChange={(e) => setAccount(e.target.value)}
            className={cn("w-[17rem]", styles.input1)}
            type="email"
            ref={inputRef}
            onFocus={handleFocus}
          />
          {account ? (
            <img
              src="/img/x-circle.png"
              alt=""
              className="w-[1.8rem] h-[1.8rem]"
              onClick={() => {
                setAccount("");
              }}
            />
          ) : (
            <></>
          )}
        </div>
        {invalid ? (
          <div className="text-[#F33] font-[SF Pro Rounded] flex items-center gap-[0.5rem]">
            <img
              src="/img/info-circle.png"
              alt=""
              className="w-[1.8rem] h-[1.8rem]"
            />
            The format is incorrect, please modify it and try again
          </div>
        ) : (
          <></>
        )}

        <div
          className={cn(
            "w-[27rem] px-[2rem] py-[1.3rem] rounded-[2rem] inline-flex justify-center items-center gap-[1rem] mt-[5rem]",
            "bg-[linear-gradient(0deg,#EA8273_0%,#ECA89E_100%)] rounded-[20px]"
          )}
          style={{
            boxShadow:
              "0px 3px 4px 0px rgba(255, 255, 255, 0.25), 0px 4px 24px 0px #ECA89E",
          }}
          onClick={login}
        >
          <div
            className={cn(
              "flex-1 text-center justify-start text-[1.6rem] font-bold font-['SF_Pro_Rounded'] leading-tight",
              "text-white"
            )}
          >
            {t("login.login")}
          </div>
        </div>
        <div className="text-[#DE8D81] font-[SF Pro Rounded] text-center bottom-[1.8rem] absolute w-[100%] px-[2rem] -translate-x-[50%] left-[50%]">
          Copyright© 2025 Meowster. <br />
          All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default ProgressLoader;
