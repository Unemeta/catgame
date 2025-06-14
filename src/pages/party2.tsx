/* eslint-disable @next/next/no-img-element */
const PartyView = () => {
  return (
    <div className="">
      <div className="relative">
        <img
          className="w-[100vw] h-[100vh] absolute inset-0 z-[1]"
          src="/img/bg/bg_pop_rain.min.png"
          alt=""
        />
        <div className="w-full h-[100vh] absolute inset-0 z-[2]">
          <div className="flex flex-col h-full">
            <div className="h-[3vh]"></div>
            <div className="flex justify-center items-center space-x-[0.4rem] px-[2rem]">
              <div className="bg-white rounded-[3rem] flex-1 h-[1.1vh]"></div>
              <div className="bg-white/20 rounded-[3rem] flex-1 h-[1.1vh]"></div>
              <div className="bg-white/20 rounded-[3rem] flex-1 h-[1.1vh]"></div>
            </div>
            <div className="h-[5.5vh]"></div>
            <div className="text-[#fff] text-[3rem] font-[700] text-center leading-[1] mb-[0.5rem]">
              At a party,
            </div>
            <div className="text-[#fff] text-[2rem] font-[700] text-center leading-[1]">
              you’re more likely to
            </div>
            <div className="h-[4vh]"></div>
            <div className="flex justify-center items-end">
              <div className="bg-[url('/img/cat_red.min.png')] w-[20.4rem] h-[20.4rem] bg-cover"></div>
            </div>
            <div className="h-[2.6vh]"></div>
            <div className="flex justify-center items-center mb-[2rem]">
              <div className="bg-[linear-gradient(0deg,#EA8273_0%,#ECA89E_100%)] shadow-[0px,3px,4px,0px,rgba(255,255,255,0.25),0px,4px,24px,0px,#ECA89E] border-[#FF9A8B] border-[1px] rounded-[3.1rem] px-[2rem] py-[1.2rem] flex justify-center items-center">
                <div className="w-[3.6rem] h-[3.6rem] bg-white rounded-[50%] flex justify-center items-center mr-[1rem]">
                  <span className="text-[#D25A43] text-[1.8rem] font-[700]">
                    A
                  </span>
                </div>
                <span className="text-white text-[1.8rem] font-[700] leading-[1.2]">
                  {" "}
                  Chat enthusiastically with lots <br /> of people and feel
                  energized
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="bg-white/70 rounded-[3.1rem] blur--[1rem] px-[2rem] py-[1.2rem] flex justify-center items-center">
                <div className="w-[3.6rem] h-[3.6rem] bg-[#826662] rounded-[50%] flex justify-center items-center mr-[1rem]">
                  <span className="text-white text-[1.8rem] font-[700]">B</span>
                </div>
                <span className="text-[#826662] text-[1.8rem] font-[700] leading-[1.2]">
                  Find a quiet corner to talk with <br /> close friends and soon
                  feel <br />
                  like heading home
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center grow">
              <img
                src="/img/arrow_right.min.png"
                className="w-[6.9rem] h-[6.9rem] opacity-60"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyView;
