/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFetchUser } from "@/store";
import { request } from "@/utils/request";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

/* eslint-disable @next/next/no-img-element */
const UploadView = () => {
  const [image, setImage] = useState(null);
  const router = useRouter();
  const { userData } = useFetchUser();

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // 设置图片预览的 src
      };
      reader.readAsDataURL(file); // 读取文件为 Data URL
      upload(file);
    }
  };

  const upload = async (file: any) => {
    const formDataToken = new FormData();
    formDataToken.append("file", file);
    try {
      const result: any = await request({
        url: "/api/user/avatar",
        method: "post",
        data: formDataToken,
      });
      console.log(result);
      if (result?.data?.url) {
        toast.success("Upload avatar completed");
      } else {
        setImage(null);
        toast.error("Upload avatar error");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="bg-[#25211F] w-[100vw] h-[100vh] flex flex-col">
      <div className="fixed top-0 left-0 w-full h-[3.6rem] px-[2rem] flex justify-between items-center">
        <img
          className="w-[2rem] h-[2rem]"
          src="/img/arrow-left.png"
          alt=""
          onClick={() => {
            router.push("/chat");
          }}
        />
        <span className="text-white text-[1.8rem] font-[800]">查看头像</span>
        <span>　</span>
      </div>
      <div className="grow flex justify-center items-center">
        {image ? (
          <img
            className="w-[20rem] h-[20rem] rounded-[20rem]"
            src={image}
            alt="图片预览"
          />
        ) : (
          <img
            className="w-[20rem] h-[20rem] rounded-[20rem]"
            // src="/img/bg/bgChat.min.png"
            src={userData?.avatar ?? "/img/avataUser.min.png"}
            alt=""
          />
        )}
      </div>
      <div className="flex justify-center items-center pb-[5.6rem]">
        <div className="flex flex-col">
          <label htmlFor="fileInput">
            <div className="bg-white/10 w-[21.8rem] h-[6.6rem] flex flex-col justify-center items-center rounded-[7rem] border-[1px] border-white/5">
              <img
                className="w-[1.8rem] h-[1.8rem]"
                src="/img/uploadTopSvg.png"
                alt=""
              />
              <div className="h-[0.6rem]"></div>
              <div className="text-white text-[1.4rem] font-[500]">
                Upload a new avatar
              </div>
            </div>
          </label>
          <input
            onChange={handleImageChange}
            className="opacity-0"
            type="file"
            id="fileInput"
            accept="image/*"
          />
        </div>
      </div>
    </div>
  );
};
export default UploadView;
