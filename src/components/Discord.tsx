/* eslint-disable @next/next/no-img-element */

import { cn } from "@/lib/utils";

interface iDiscord {
  text?: string;
  textColor?: string;
}
export default function Discord({ text, textColor }: iDiscord) {
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
      <span
        className={cn(
          "text-[1.4rem] font-[500]",
          textColor ?? "text-[#6C4937]"
        )}
      >
        {text ?? "Discord"}
      </span>
    </div>
  );
}
