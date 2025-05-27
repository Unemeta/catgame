/* eslint-disable @next/next/no-img-element */
import { PhotoProvider, PhotoView } from "react-photo-view";
// import { saveAs } from "file-saver";
import * as globalApi from "@/services/global";
import { downloadMedia } from "@/utils/save";
const eventType = globalApi.eventType;
interface iPhotoView {
  src: string;
  eventid: number;
}
const ImgView = ({ src, eventid }: iPhotoView) => {
  const handleDownload = () => {
    console.log("图片", src);
    // saveAs(src, "downloaded-image.jpg");
    downloadMedia(src, "downloaded-image.jpg");
    globalApi.eventRecord(eventid, eventType.EventTypeSaveImage);
    console.log("图片已下载");
  };
  const handleZoomCb = () => {
    console.log("图片放大", eventid);
    globalApi.eventRecord(eventid, eventType.EventTypeZoomIn);
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
                  stroke-linejoin="round"
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
                  stroke-linejoin="round"
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
            // style={{ objectFit: "cover" }}
            alt=""
          />
        </div>
      </PhotoView>
    </PhotoProvider>
  );
};
export default ImgView;
