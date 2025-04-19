/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import styles from "@/styles/Login.module.css"; // 确保有对应的 CSS 文件
import { cn } from "@/lib/utils";
import { request } from "@/utils/request";
import { jwtHelper } from "@/utils/jwt";
import { useRouter } from "next/router";

interface ProgressLoaderProps {
  progress: number;
}

const ProgressLoader: React.FC<ProgressLoaderProps> = () => {
  const [account, setAccount] = useState("");
  const router = useRouter();
  const login = async () => {
    console.log("login", account);
    if (account) {
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
      router.push("/");
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-[url('/img/loadBg.png')] bg-cover">
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
          onChange={(e) => setAccount(e.target.value)}
        />
        <div
          className={cn("bg-[url('/img/bg/btnbg.jpg')] bg-cover cursor-pointer select-none", styles.btn)}
          onClick={login}
        >
          Log in
        </div>
      </div>
    </div>
  );
};

export default ProgressLoader;
