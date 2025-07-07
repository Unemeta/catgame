/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import styles from "@/styles/Login.module.css"; // 确保有对应的 CSS 文件
import { cn } from "@/lib/utils";
import { request } from "@/utils/request";
import { jwtHelper } from "@/utils/jwt";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useFetchUser } from "@/store";
import { useTranslation } from "react-i18next";

interface ProgressLoaderProps {
  progress: number;
}

const ProgressLoader: React.FC<ProgressLoaderProps> = () => {
  const [account, setAccount] = useState("");
  const { fetchUser } = useFetchUser();
  const { i18n } = useTranslation();
  const router = useRouter();

  const getStep = async () => {
    const res = await request({
      url: "/api/cat/v1/survey/survey/step",
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
        toast.error("Invalid email format");
        return;
      }
      try {
        const res = await request({
          url: "/api/cat/v1/user/login",
          method: "post",
          data: {
            username: account,
            password: account,
          },
        });
        await jwtHelper.setToken(res.data.accessToken, {
          expires: new Date(res.data.accessExpire * 1000),
        });
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
            } else if (navLanguage.startsWith("en")) {
              languageNum = 2;
            } else if (navLanguage.startsWith("ja")) {
              languageNum = 3;
            }else{
              languageNum = 2;
            }
            try {
              const { data } = await request({
                url: `/api/cat/v1/user/language/set?language=${languageNum}`,
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
    if (event?.key === "Enter") {
      login();
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-[url('/img/loadBg.png')] bg-cover bg-center">
      <div
        className={cn(
          "bg-[url('/img/bg/modelBg.jpg')] bg-cover",
          styles.loginModel
        )}
      >
        <div className={styles.title}>
          <img src="/img/titlefoot.svg" alt="" />
          <span>Account Login</span>
          <img src="/img/titlefoot.svg" alt="" />
        </div>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter the account"
          onKeyDown={handleKeyDown}
          onChange={(e) => setAccount(e.target.value)}
        />
        <div
          className={cn(
            "bg-[url('/img/bg/btnbg.jpg')] bg-cover cursor-pointer select-none",
            styles.btn
          )}
          onClick={login}
        >
          Log in
        </div>
      </div>
    </div>
  );
};

export default ProgressLoader;
