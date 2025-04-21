/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import CountUp from "react-countup";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ChatEnergy({
  imgUrl,
  number,
  label,
  showCountUp = true,
  ...props
}: any) {
  return (
    <div
      className="flex justify-start items-center dpx20 dpy10 shadow-[0px_0px_30px_0px_rgba(255,_255,_255,_0.40)_inset] bg-[#ffffff1a] border-[1px] border-[#fdfbff26] drounded75 select-none"
    >
      <img src={imgUrl} alt="" className="dw38 dh38 dmr10" />
      <div>
        {showCountUp ? (
          <CountUp
            end={number}
            decimal=","
            className="dtext33 font-[800] text-white"
            preserveValue
            {...props}
          />
        ) : (
          <span className="dtext33 font-[800] text-white">
            {Number(number)?.toLocaleString()}
          </span>
        )}
        <div className="dtext18 font-[600] text-white">{label}</div>
      </div>
    </div>
  );
}
