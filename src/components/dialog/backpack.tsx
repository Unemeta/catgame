/* eslint-disable @next/next/no-img-element */
import { ReactNode, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from ".";
import { TopItem } from "../TopItem";
import { useFetchUser } from "@/store";
import { cn } from "@/lib/utils";
import { request } from "@/utils/request";
import styles from "@/styles/Backpack.module.css";
import BackpackToys from "./backpackToys";

interface iDialogBackpack {
  trigger?: ReactNode;
}
const DialogBackpack = ({ trigger }: iDialogBackpack) => {
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useFetchUser();
  const [navIndex, setnavIndex] = useState(0);
  const navList = [
    {
      imgUrl: "/img/nav/backpackToy.svg",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="currentColor"
          className="dw55 dhauto dmr20"
        >
          <circle cx="28" cy="28" r="28" fill="currentColor" />
          <path
            d="M24.0022 10.3829C25.1714 10.1276 26.3829 10 27.6226 10C28.1579 10 28.6791 10.0284 29.1863 10.0709C29.7216 18.6089 36.6101 25.4309 45.1328 25.7996C45.2032 26.4378 45.2455 27.0902 45.2455 27.7568C45.2455 28.8915 45.1469 30.0119 44.9356 31.0898C33.5673 30.9621 24.3121 21.7859 24.0022 10.3829Z"
            fill="#39334F"
          />
          <path
            d="M44.8936 24.1832C43.4567 17.1344 37.8501 11.5889 30.7925 10.2983C31.4264 17.7584 37.4275 23.7152 44.8936 24.1832Z"
            fill="#39334F"
          />
          <path
            d="M18.2549 21.2189C17.4096 18.8503 16.9166 16.34 16.7616 13.7729C13.6625 16.2265 11.3945 19.7013 10.4647 23.6867C13.254 23.6016 15.9305 22.7506 18.2549 21.2189Z"
            fill="#39334F"
          />
          <path
            d="M22.425 10.7939C20.9741 11.2478 19.5935 11.886 18.3116 12.6802C18.537 26.0546 29.2572 36.8902 42.5273 37.2023C43.4007 35.8123 44.0909 34.2806 44.5558 32.6638C32.6241 32.3659 22.9462 22.75 22.425 10.7939Z"
            fill="#39334F"
          />
          <path
            d="M36.0048 37.8553C37.7657 38.3375 39.5829 38.6495 41.4283 38.763C39.9385 40.6558 38.0733 42.2341 35.9462 43.3861H44.4429C45.0064 43.3861 45.4854 43.8541 45.4854 44.4356C45.4854 45.0171 45.0205 45.4852 44.4429 45.4852H28.3039C28.078 45.4943 27.851 45.4992 27.623 45.4998C25.9044 45.4998 24.2562 45.2445 22.6925 44.7907C27.7779 43.4575 32.483 41.0181 36.0048 37.8553Z"
            fill="#39334F"
          />
          <path
            d="M20.016 43.7549C25.4536 42.7338 30.4545 40.4929 34.2439 37.2876C32.1308 36.5359 30.1305 35.5006 28.271 34.2241C24.1012 37.5003 19.058 38.8051 14.0149 39.0037C15.6349 41.0035 17.6916 42.6203 20.016 43.7549Z"
            fill="#39334F"
          />
          <path
            d="M10.2817 30.8773C10.0986 29.8562 10 28.8067 10 27.743C10 26.9062 10.0563 26.0836 10.1831 25.2893C13.2682 25.2468 16.2547 24.3816 18.8608 22.7364C19.5229 24.3107 20.3399 25.8141 21.3119 27.2324C18.0296 29.4449 14.2402 30.693 10.2817 30.8773Z"
            fill="#39334F"
          />
          <path
            d="M26.862 33.1891C26.0167 32.5225 25.2138 31.8134 24.4531 31.0333C23.6642 30.2391 22.9176 29.3881 22.2414 28.523C18.776 30.8773 14.7893 32.2105 10.6337 32.4516C11.1267 34.2386 11.8874 35.9122 12.8735 37.4297C17.8744 37.3872 22.6922 35.9264 26.862 33.1891Z"
            fill="#39334F"
          />
        </svg>
      ),
      title: "Toys",
    },
    {
      imgUrl: "/img/nav/backpackFurniture.svg",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="currentColor"
          className="dw55 dhauto dmr20"
        >
          <g opacity="0.7">
            <path
              d="M15.9659 48.7647C16.0652 48.7647 16.1479 48.7151 16.1976 48.6158L15.9659 48.7647ZM40.861 7.0025C36.8884 7.0025 33.8923 9.84955 28.1486 9.84955C22.4048 9.84955 18.9619 7.0025 15.2044 7.0025C13.1354 6.95284 11.3973 8.59155 11.3477 10.6606C11.3311 11.1407 11.3973 11.6041 11.5629 12.0345L14.2113 26.4353C15.6679 27.1636 16.7935 28.4216 17.3397 29.961H38.9243C39.4706 28.4216 40.5961 27.1636 42.0528 26.4518L44.7012 12.051C45.3633 10.0151 44.2543 7.84668 42.2183 7.18458C41.8045 7.05216 41.3245 6.98595 40.861 7.0025ZM18.7467 15.3616C18.1673 15.3616 17.7039 14.8981 17.7039 14.3188C17.7039 13.7394 18.1673 13.2759 18.7467 13.2759C19.326 13.2759 19.7895 13.7394 19.7895 14.3188C19.7895 14.8981 19.326 15.3616 18.7467 15.3616ZM20.8323 23.7206C20.253 23.7206 19.7895 23.2406 19.7895 22.6613C19.7895 22.0819 20.253 21.6185 20.8323 21.6185C21.4117 21.6185 21.8751 22.0819 21.8751 22.6613C21.8751 23.2406 21.4117 23.7206 20.8323 23.7206ZM28.1486 24.7138C27.5692 24.7138 27.1058 24.2503 27.1058 23.671C27.1058 23.0916 27.5692 22.6282 28.1486 22.6282C28.7279 22.6282 29.1914 23.0916 29.1914 23.671C29.1914 24.2503 28.7279 24.7138 28.1486 24.7138ZM28.1486 16.3547C27.5692 16.3547 27.1058 15.8913 27.1058 15.3119C27.1058 14.7326 27.5692 14.2691 28.1486 14.2691C28.7279 14.2691 29.1914 14.7326 29.1914 15.3119C29.2079 15.8913 28.761 16.3713 28.1817 16.4044C28.1651 16.4044 28.1486 16.4044 28.132 16.4044L28.1486 16.3547ZM35.4483 23.7206C34.8689 23.7206 34.4055 23.2572 34.4055 22.6778C34.4055 22.0985 34.8689 21.635 35.4483 21.635C36.0276 21.635 36.4911 22.0985 36.4911 22.6778C36.4911 23.2406 36.0276 23.7206 35.4483 23.7206ZM37.5339 15.3616C36.9546 15.3616 36.4911 14.8981 36.4911 14.3188C36.4911 13.7394 36.9546 13.2759 37.5339 13.2759C38.1132 13.2759 38.5767 13.7394 38.5767 14.3188C38.5767 14.8981 38.1132 15.3616 37.5339 15.3616Z"
              fill="currentColor"
            />
            <path
              d="M17.2893 44.5944C17.5707 44.5944 17.819 44.8096 17.819 45.1075C17.819 45.1903 17.8024 45.273 17.7693 45.3558L16.2465 48.6001C16.2134 48.6829 16.114 48.7491 16.0147 48.7491H14.8892C14.7567 48.7491 14.6409 48.6332 14.6409 48.5008V48.4842L15.2864 44.9751C15.3361 44.7268 15.5513 44.5447 15.8161 44.5613L17.2893 44.5944ZM41.6547 48.5008C41.6713 48.6332 41.572 48.7656 41.423 48.7656H40.314C40.2146 48.7656 40.1319 48.716 40.0822 48.6167L38.5759 45.3392C38.4435 45.0744 38.5594 44.7599 38.8077 44.644C38.8573 44.6109 38.9235 44.5944 38.9897 44.5944H40.4795C40.7278 44.5944 40.943 44.7599 41.0092 45.0082L41.6547 48.5008Z"
              fill="currentColor"
            />
            <path
              d="M46.4553 35.9369C45.4787 36.3342 44.8497 37.2777 44.8497 38.3371C44.8497 40.5717 43.1117 42.409 40.8771 42.5083H15.4192C13.1846 42.409 11.43 40.5717 11.43 38.3371C11.43 37.2943 10.801 36.3673 9.82442 35.97C7.63948 35.2252 6.48079 32.8416 7.22566 30.6567C7.73879 29.1835 9.0299 28.1075 10.5693 27.8758C10.8507 27.8427 11.1486 27.8427 11.43 27.8758C13.2177 27.8758 14.8068 29.0179 15.3695 30.7229C15.7006 31.5836 16.5448 32.1133 17.4552 32.0636H38.8411C39.7515 32.1298 40.5957 31.5836 40.9268 30.7229C41.4896 29.051 43.0621 27.9089 44.8332 27.8758C45.1146 27.8427 45.4125 27.8427 45.6939 27.8758C47.9616 28.3393 49.4183 30.5408 48.9548 32.8085C48.6734 34.1658 47.7299 35.3079 46.4553 35.8376V35.9369Z"
              fill="currentColor"
            />
            <path
              d="M46.4553 35.9369C45.4787 36.3342 44.8497 37.2777 44.8497 38.3371C44.8497 40.5717 43.1117 42.409 40.8771 42.5083H15.4192C13.1846 42.409 11.43 40.5717 11.43 38.3371C11.43 37.2943 10.801 36.3673 9.82442 35.97C7.63948 35.2252 6.48079 32.8416 7.22566 30.6567C7.73879 29.1835 9.0299 28.1075 10.5693 27.8758C10.8507 27.8427 11.1486 27.8427 11.43 27.8758C13.2177 27.8758 14.8068 29.0179 15.3695 30.7229C15.7006 31.5836 16.5448 32.1133 17.4552 32.0636H38.8411C39.7515 32.1298 40.5957 31.5836 40.9268 30.7229C41.4896 29.051 43.0621 27.9089 44.8332 27.8758C45.1146 27.8427 45.4125 27.8427 45.6939 27.8758C47.9616 28.3393 49.4183 30.5408 48.9548 32.8085C48.6734 34.1658 47.7299 35.3079 46.4553 35.8376V35.9369Z"
              fill="currentColor"
            />
          </g>
        </svg>
      ),
      title: "Furniture",
    },
    {
      imgUrl: "/img/nav/backpackTools.svg",
      svg: (
        <svg
          className="dw55 dhauto dmr20"
          xmlns="http://www.w3.org/2000/svg"
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="currentColor"
        >
          <path
            opacity="0.7"
            d="M44.6802 16.043L42.1361 16.0197V11.614C42.1361 10.179 40.9726 9.02327 39.5454 9.01551L11.5907 9C10.1635 9 9 10.1635 9 11.5985V24.0322C9 25.4672 10.1635 26.6307 11.5907 26.6307H39.5221C40.9571 26.6307 42.1128 25.4672 42.1128 24.0322V18.8664H42.7256C43.0048 18.8664 43.2298 19.0913 43.2298 19.3705V27.4374C43.2298 27.7166 43.0048 27.9416 42.7256 27.9416H24.8234C23.9547 27.9416 23.2566 28.6474 23.2566 29.5084V32.7196H22.3025C20.8676 32.7196 19.7041 33.8831 19.7041 35.3258V43.6409C19.7041 45.0758 20.8676 46.2471 22.3025 46.2471H27.0651C28.5 46.2471 29.6635 45.0758 29.6635 43.6409L29.648 35.3724C29.648 33.9374 28.4845 32.7739 27.0495 32.7739H26.0334V31.3079C26.0334 31.0287 26.2584 30.8037 26.5376 30.8037H44.6647C45.5335 30.8037 46.2316 30.0979 46.2316 29.2369V17.6176C46.2316 16.7566 45.5412 16.0507 44.6802 16.043ZM39.049 17.4469C39.049 18.1605 38.475 18.7345 37.7614 18.7345C37.0478 18.7345 36.4738 18.1605 36.4738 17.4469V15.818L13.6927 15.8025C12.9946 15.8025 12.4206 15.2363 12.4206 14.5304C12.4206 13.8246 12.9869 13.2584 13.6927 13.2584H37.7769C38.475 13.2584 39.0335 13.8168 39.0412 14.5149V17.4469H39.049Z"
            fill="currentColor"
          />
        </svg>
      ),
      title: "Tools",
    },
  ];
  const [dataMap, setDataMap] = useState(new Map());

  const reset = () => {
    const map = new Map();
    // 对应navIndex

    map.set(0, {
      can_play: true,
      countdown: 0,
      items: [],
    });
    map.set(1, {
      can_play: true,
      countdown: 0,
      items: [],
    });
    map.set(2, {
      can_play: true,
      countdown: 0,
      items: [],
    });
    setDataMap(map);
  };
  const getBack = async () => {
    const res = await request({
      url: "/api/cat/v1/user/backpack",
      method: "get",
    });

    const { toys, furniture } = res.data;
    const map = new Map();
    // 对应navIndex
    map.set(0, toys);
    map.set(1, furniture);
    // 后端暂未返回该字段
    map.set(2, {
      can_play: true,
      countdown: 0,
      items: [],
    });
    setDataMap(map);
  };

  useEffect(() => {
    if (isOpen) {
      getBack();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTitle></DialogTitle>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="p-0 w-full  h-full overflow-hidden max-w-[100%] max-h-[100%]">
        <div className={styles.backpackBg}>
          <div className="headerBackpack bgNavBackpackTop bg-white/20 flex dpl110 dpt18 dpb18 dpr110 dh90">
            <div
              className="flex justify-start items-center cursor-pointer select-none"
              onClick={() => {
                reset();
                setIsOpen(false);
              }}
            >
              <img
                className="dw48 dhauto dmr10"
                src="/img/svg/back.svg"
                alt=""
              />
              <span className="text-white dtext26 font-[500]">Back</span>
            </div>
            <div className="flex justify-center items-center grow">
              <div className=""></div>
              {navList?.map((item, index: number) => (
                <div
                  className={cn(
                    "flex justify-center items-center dpl20 dpr20 text-white/70 cursor-pointer select-none",
                    {
                      "!text-[#FFFDCE] font-[800]": index === navIndex,
                    }
                  )}
                  key={index}
                  onClick={() => {
                    setnavIndex(index);
                  }}
                >
                  {item?.svg}
                  <span className={cn("dtext26  font-[500]")}>
                    {item?.title}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-end items-center">
              <TopItem
                imgUrl="./img/gold.svg"
                label="Gold"
                number={userData?.coin || 0}
                duration={0}
                showCountUp={false}
              ></TopItem>
              <TopItem
                imgUrl="./img/LostEnergy.svg"
                label="Crystal"
                number={userData?.diamond || 0}
                showCountUp={false}
              ></TopItem>
            </div>
          </div>
          {navIndex === 0 && dataMap.get(navIndex) && (
            <BackpackToys
              setIsOpen={setIsOpen}
              setnavIndex={setnavIndex}
              navIndex={navIndex}
              tabData={dataMap.get(navIndex)}
            ></BackpackToys>
          )}
          {/* {navIndex === 1 && dataMap.get(navIndex) && (
            <BackpackToys
              setIsOpen={setIsOpen}
              setnavIndex={setnavIndex}
              navIndex={navIndex}
              tabData={dataMap.get(navIndex)}
            ></BackpackToys>
          )}
          {navIndex === 2 && dataMap.get(navIndex) && (
            <BackpackToys
              setIsOpen={setIsOpen}
              setnavIndex={setnavIndex}
              navIndex={navIndex}
              tabData={dataMap.get(navIndex)}
            ></BackpackToys>
          )} */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBackpack;
