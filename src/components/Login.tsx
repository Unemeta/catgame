import React, { useEffect } from "react";
import { request } from "@/utils/request";
import { jwtHelper } from "@/utils/jwt";
export default function Login() {
  const login = async () => {
    debugger
    if (jwtHelper.getToken()) {
      debugger
      return false;
    }
    const res = await request({
      url: "/cat/v1/user/user/login",
      method: "post",
      data: {
        username: "test",
        password: "test",
      },
    });
    await jwtHelper.setToken(res.data.accessToken, {
      expires: new Date(res.data.accessExpire),
    });
    debugger
  };
  useEffect(() => {
    login();
  }, []);
  return <></>;
}
