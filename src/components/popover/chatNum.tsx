/* eslint-disable @next/next/no-img-element */
// import { useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from ".";

const PopoverChatNum = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="chatNumRight"
        >
          <g clip-path="url(#clip0_2028_5852)">
            <path
              d="M6.05967 6C6.21641 5.55445 6.52578 5.17874 6.93298 4.93942C7.34018 4.70011 7.81894 4.61263 8.28446 4.69248C8.74998 4.77233 9.17222 5.01435 9.47639 5.37569C9.78057 5.73702 9.94705 6.19435 9.94634 6.66667C9.94634 8 7.94634 8.66667 7.94634 8.66667M7.99967 11.3333H8.00634M14.6663 8C14.6663 11.6819 11.6816 14.6667 7.99967 14.6667C4.31778 14.6667 1.33301 11.6819 1.33301 8C1.33301 4.3181 4.31778 1.33334 7.99967 1.33334C11.6816 1.33334 14.6663 4.3181 14.6663 8Z"
              stroke="#FFF41A"
              stroke-opacity="0.7"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2028_5852">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </PopoverTrigger>
      <PopoverContent>
        <img
          className="chatNumTipText"
          src="/img/bg/tooltipChatInfo.min.png"
          alt=""
        />
      </PopoverContent>
    </Popover>
  );
};
export default PopoverChatNum;
