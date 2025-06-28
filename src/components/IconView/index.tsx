import { cn } from "@/lib/utils";
import React from "react";

const svgMap = {
  eduitCatName: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M7.99998 13.3333H14M2 13.3333H3.11636C3.44248 13.3333 3.60554 13.3333 3.75899 13.2964C3.89504 13.2638 4.0251 13.2099 4.1444 13.1368C4.27895 13.0543 4.39425 12.939 4.62486 12.7084L13 4.33328C13.5523 3.781 13.5523 2.88557 13 2.33328C12.4477 1.781 11.5523 1.781 11 2.33328L2.62484 10.7084C2.39424 10.939 2.27894 11.0543 2.19648 11.1889C2.12338 11.3082 2.0695 11.4383 2.03684 11.5743C2 11.7278 2 11.8908 2 12.2169V13.3333Z"
        stroke="#8E6868"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),

  back: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M15.8337 10.0003H4.16699M4.16699 10.0003L10.0003 15.8337M4.16699 10.0003L10.0003 4.16699"
        stroke="#6C4734"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  share: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M17.3261 10.5062C17.5296 10.3318 17.6313 10.2446 17.6686 10.1409C17.7013 10.0498 17.7013 9.9502 17.6686 9.85914C17.6313 9.75539 17.5296 9.6682 17.3261 9.49383L10.2672 3.44331C9.917 3.14315 9.74191 2.99306 9.59367 2.98939C9.46483 2.98619 9.34177 3.04279 9.26035 3.14269C9.16667 3.25764 9.16667 3.48825 9.16667 3.94948V7.52886C7.38777 7.84007 5.75966 8.74146 4.54976 10.0949C3.23069 11.5704 2.50103 13.48 2.5 15.4591V15.9691C3.37445 14.9157 4.46626 14.0638 5.70063 13.4716C6.78891 12.9495 7.96535 12.6403 9.16667 12.5588V16.0505C9.16667 16.5117 9.16667 16.7424 9.26035 16.8573C9.34177 16.9572 9.46483 17.0138 9.59367 17.0106C9.74191 17.0069 9.917 16.8569 10.2672 16.5567L17.3261 10.5062Z"
        stroke="#E96959"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
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
  type?: "eduitCatName" | "back" | "share" | "add" | "sub";
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
