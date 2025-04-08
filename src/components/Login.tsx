import React, { useEffect } from "react";
// import { request } from "@/utils/request";
// import { jwtHelper } from "@/utils/jwt";
import { useFetchUser } from "@/store";
export default function Login() {
  const { fetchUser } = useFetchUser();
  // const login = async () => {
  //   if (jwtHelper.getToken()) {
  //     fetchUser();
  //     return false;
  //   }
  //   const res = await request({
  //     url: "/cat/v1/user/login",
  //     method: "post",
  //     data: {
  //       username: "test",
  //       password: "test",
  //     },
  //   });
  //   await jwtHelper.setToken(res.data.accessToken, {
  //     expires: new Date(res.data.accessExpire * 1000),
  //   });
  //   fetchUser();
  // };
  useEffect(() => {
    fetchUser();
  }, []);
  return <></>;
}
