import { cn } from "@/lib/utils";
import React from "react";

const svgMap = {
  add: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
    >
      <g filter="url(#filter0_d_3099_2257)">
        <circle cx="19" cy="19" r="12" fill="currentColor" />
      </g>
      <rect
        x="12.6001"
        y="17.8"
        width="12.8"
        height="2.4"
        rx="1.2"
        fill="white"
      />
      <rect
        x="20.2002"
        y="12.6001"
        width="12.8"
        height="2.4"
        rx="1.2"
        transform="rotate(90 20.2002 12.6001)"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_d_3099_2257"
          x="0.804444"
          y="0.804444"
          width="36.3911"
          height="36.3911"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3.09778" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.619961 0 0 0 0 0.566933 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3099_2257"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3099_2257"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  ),
  sub: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
    >
      <g filter="url(#filter0_d_3099_9192)">
        <circle cx="19" cy="19" r="12" fill="currentColor" />
      </g>
      <rect
        x="12.6001"
        y="17.8"
        width="12.8"
        height="2.4"
        rx="1.2"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_d_3099_9192"
          x="0.804444"
          y="0.804444"
          width="36.3911"
          height="36.3911"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3.09778" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.619961 0 0 0 0 0.566933 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3099_9192"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3099_9192"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  ),
};

export interface iconProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  type?:
    | "add"
    | "sub"
}

const IconView = (props: iconProps) => {
  const { className, type = "default", ...others } = props;

  const cls = className ? cn({}, className) : "";
  const style: React.CSSProperties = { ...props.style };
  if (type in svgMap) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const svg = svgMap[type];
    return React.cloneElement(svg, {
      ...others,
      className: cls,
      style,
    });
  }

  return <i />;
};

export default IconView;
