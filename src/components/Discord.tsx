/* eslint-disable @next/next/no-img-element */

export default function Discord() {
  const handleDiscord = async () => {
    window.open("https://discord.com/invite/YzztkC6ENe", "_blank");
  };
  return (
    <div
      className="flex flex-col justify-center items-center"
      onClick={handleDiscord}
    >
      <img className="w-[3.6rem] h-[3.6rem]" src="/img/discord.png" alt="" />
      <div className="h-[0.6rem]"></div>
      <span className="text-[#6C4937] text-[1.4rem] font-[500]">Discord</span>
    </div>
  );
}
