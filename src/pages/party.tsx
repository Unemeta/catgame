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
        <div className="w-full h-full absolute inset-0 z-[2] ">
          <div className="h-[54px]"></div>
          <div className="text-[#fff] text-[30px] font-[700] mb-2 text-center">
            Hello, YOYO.
          </div>
          <div className="text-[#fff] text-[20px] font-[700] text-center">
            This is your Aloof Cats.
          </div>
          <div className="h-[37px]"></div>
          <div className="px-5 py-6 relative">
            <div className="">
              <div className="px-[10px] py-2 text-white text-[16px] font-[700] bg-[#F4738D99] rounded-[50px] border-[#E397BC] border-w-[1px] inline-block">
                Independent
              </div>
            </div>
            <div className="">
              <div className="px-[10px] py-2 text-white text-[16px] font-[700] bg-[#2278C199] rounded-[50px] border-[#6D9FDA] border-w-[1px] inline-block my-[6px]">
                Reserved
              </div>
            </div>
            <div className="">
              <div className="px-[10px] py-2 text-white text-[16px] font-[700] bg-[#4A5F7799] rounded-[50px] border-[#95A1C1] border-w-[1px] inline-block">
                Intelligent
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full">
              <div className="bg-[url('/img/bg/bg_aloof_cat.min.png')] text-center text-white text-[28px] font-[700] py-3">
                Aloof Cats
              </div>
              <div className="text-[#826662] text-[16px] font-[500] h-[150px] flex justify-center items-center">
                They have a natural aura, prefer their space, but once they
                trust you, they’ll quietly stay by your side for the long run.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyView;
