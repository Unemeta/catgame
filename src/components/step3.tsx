import { useRouter } from "next/router";

const Step3View = () => {
  const router = useRouter();
  return (
    <div className="w-full h-full absolute inset-0 z-[2] ">
      <div className="h-[6vh]"></div>
      <div className="text-[#fff] text-[3rem] font-[700] text-center leading-[1] mb-[0.5rem]">
        Hello, YOYO.
      </div>
      <div className="text-[#fff] text-[2rem] font-[700] text-center leading-[1]">
        This is your Aloof Cats.
      </div>
      <div className="h-[4.3vh]"></div>
      <div className="px-[3rem]">
        <div className="px-[2.8vh] py-[2.8vh] relative h-[61vh] bg-[url('/img/bg/bg_card_cat.min.png')] bg-cover">
          <div className="">
            <div className="px-[1rem] py-2 text-white text-[1.6rem] font-[700] bg-[#F4738D99] rounded-[5rem] border-[#E397BC] border-w-[0.1rem] inline-block">
              Independent
            </div>
          </div>
          <div className="">
            <div className="px-[1rem] py-2 text-white text-[1.6rem] font-[700] bg-[#2278C199] rounded-[5rem] border-[#6D9FDA] border-w-[0.1rem] inline-block my-[0.6rem]">
              Reserved
            </div>
          </div>
          <div className="">
            <div className="px-[1rem] py-2 text-white text-[1.6rem] font-[700] bg-[#4A5F7799] rounded-[5rem] border-[#95A1C1] border-w-[0.1rem] inline-block">
              Intelligent
            </div>
          </div>
          <div className="h-[24rem]"></div>
          <div className="absolute left-[6.9rem] top-[5.8rem]">
            <img
              src="/img/bg_cat.min.png"
              className="w-[20rem] h-[28.5rem]"
              alt=""
            />
          </div>
          <div className="absolute bottom-0 left-0 w-full">
            <div className="flex justify-center items-center mb-[2rem]">
              <div className="bg-[url('/img/bg/bg_aloof_cat.min.png')] bg-cover bg-no-repeat text-white text-[2.8rem] font-[700] h-[5.3rem] px-[5rem] flex justify-center items-center">
                Aloof Cats
              </div>
            </div>
            <div className="text-[#826662] text-[1.4rem] font-[500] flex justify-center items-center px-[3rem] text-center pb-[2.2rem]">
              They have a natural aura, prefer their <br /> space, but once they
              trust you, they’ll <br /> quietly stay by your side for the long{" "}
              <br /> run.
            </div>
          </div>
        </div>
      </div>
      <div className="h-[6.3vh]"></div>
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center rounded-[3.1rem] bg-[#FFF] shadow-[0px,3px,14px,0px,rgba(255,255,255,0.45)] h-[7vh] w-[74vw]">
          <svg
            className="w-[2rem] h-[1.8rem]"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
          >
            <path
              d="M13.5765 0C14.6723 0 15.5607 1.14452 15.5607 2.55667C15.5607 3.96841 14.6723 5.11334 13.5765 5.11334C12.4805 5.11334 11.5922 3.96838 11.5922 2.55667C11.5923 1.14454 12.4807 0 13.5765 0ZM6.80495 0C7.90095 0 8.78936 1.14452 8.78936 2.55667C8.78936 3.96841 7.901 5.11334 6.80495 5.11334C5.70951 5.11334 4.8213 3.96838 4.8213 2.55667C4.8213 1.14454 5.70951 0 6.80495 0ZM1.9842 9.27011C0.888213 9.27011 0 8.12561 0 6.71354C0 5.30141 0.888213 4.1568 1.9842 4.1568C3.08 4.1568 3.96836 5.30139 3.96836 6.71354C3.96836 8.12564 3.08 9.27011 1.9842 9.27011ZM15.4724 17.6433C14.4258 18.256 13.0272 18.0525 11.7196 17.2384C10.9053 16.8941 9.55324 16.5438 8.15655 17.1427C7.89916 17.3125 7.63828 17.4593 7.37632 17.5804C6.26248 18.0967 5.13432 18.1581 4.25444 17.6433C2.49084 16.6104 2.39307 13.6525 4.03614 11.036C4.46741 10.3492 4.97556 9.75416 5.52296 9.26874L5.5279 9.26447L5.52925 9.26267L5.53158 9.2613L5.5329 9.26003C6.35301 8.53523 7.25974 8.05578 8.12424 7.88264C9.21215 7.56035 10.5649 7.44957 12.0353 7.99347C13.3531 8.4044 14.7181 9.48649 15.6908 11.0359C17.3338 13.6525 17.236 16.6105 15.4724 17.6433ZM18.0158 9.26881C16.9203 9.26881 16.0316 8.12422 16.0316 6.71212C16.0316 5.30002 16.9203 4.15555 18.0158 4.15555C19.1116 4.15555 20 5.30004 20 6.71217C20 8.12429 19.1116 9.26881 18.0158 9.26881Z"
              fill="#E96856"
            />
          </svg>
          <span
            className="px-[1rem] text-[#E96856] text-[2rem] font-[700]"
            onClick={() => {
              router.push("/chat");
            }}
          >
            Meet your cat
          </span>
          <svg
            className="w-[2.8rem] h-[2.8rem]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              d="M10.5 21L17.5 14L10.5 7"
              stroke="#E96856"
              stroke-width="4"
              stroke-linecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Step3View;
