/* eslint-disable @next/next/no-img-element */
import { PhotoProvider, PhotoView } from "react-photo-view";
// import { saveAs } from "file-saver";
import * as globalApi from "@/services/global";
import { downloadMedia } from "@/utils/save";
interface iPhotoView {
  src: string;
  eventid: number;
  type: string;
}
const ImgView = ({ src, eventid, type }: iPhotoView) => {
  const handleDownload = () => {
    console.log("图片", src);
    // saveAs(src, "downloaded-image.jpg");
    downloadMedia(src, "downloaded-image.jpg");
    if (type === "fixed_event") {
      globalApi.eventRecord("fixed_save_img", src);
    }
    if (type === "ai_event") {
      globalApi.eventRecord("ai_save_img", src);
    }
    if (type === "farewell_letter") {
      globalApi.eventRecord("farewell_save_img", src);
    }
    console.log("图片已下载");
  };
  const handleZoomCb = () => {
    console.log("图片放大", eventid);

    if (type === "fixed_event") {
      globalApi.eventRecord("fiexed_zoom_in", src);
    }
    if (type === "ai_event") {
      globalApi.eventRecord("ai_zoom_in", src);
    }
    if (type === "farewell_letter") {
      globalApi.eventRecord("farewell_zoom_in", src);
    }
  };
  return (
    <PhotoProvider
      //   speed={() => 800}
      //   easing={(type) =>
      //     type === 2
      //       ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
      //       : "cubic-bezier(0.34, 1.56, 0.64, 1)"
      //   }
      toolbarRender={({ onClose }) => {
        return (
          <>
            <div className="flex justify-between items-center w-[100vw] toolbarRender relative">
              <svg
                className="imgClose"
                onClick={() => onClose()}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <svg
                className="imgDownload"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                onClick={handleDownload}
              >
                <path
                  d="M3 21L21 21M6 11L12 17M12 17L18 11M12 17L12 3"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </>
        );
      }}
    >
      <PhotoView key={src} src={src}>
        <div className="" onClick={handleZoomCb}>
          <img
            className="chatMedia"
            src={src}
            style={{ objectFit: "contain" }}
            alt=""
          />
          {/*  */}
          {type === "farewell_letter" && (
            <div className="">
              <div className="mt-[0.6rem]">
                $
                {
                  "A heartwarming confession letter just for you is waiting! Click me to see Meow Meow's little thoughts 🐾"
                }
              </div>
              {/* <img className="w-full h-[1px] my-[0.6rem]" src="/svg/letter_line.svg" alt="" /> */}
              <img
                className="w-full h-[1px] my-[0.6rem]"
                src="/img/letter_line.png"
                alt=""
              />
              {/* <div className="border-[0.5px] border-[#E96856] border-dashed my-[0.6rem]"></div> */}
              <div className="flex justify-center items-center">
                <span className="text-[#E96856] text-[1.2rem] font-[500]">
                  ${"NOW GO >"}
                </span>
              </div>
            </div>
          )}
        </div>
      </PhotoView>
    </PhotoProvider>
  );
};
export default ImgView;
