import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type ShareUtilParams = Partial<Record<string, string>>;

export const shareUtil = {
  getFacebookShareUrl: ({ url }: ShareUtilParams) =>
    `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  getTwitterShareUrl: ({ url, text }: ShareUtilParams) =>
    `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
  getGooglePlusShareUrl: ({ url, text }: ShareUtilParams) =>
    `https://plus.google.com/share?url=${url}&text=${text}`,
  /** FIXME 暂未提供 */
  getDiscordShareUrl: ({ url, text }: ShareUtilParams) =>
    `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
};


export const ddLocaleIndex = () => {
  const lanuageStr = localStorage.getItem("locale");
  if (lanuageStr == "zh") {
    return 0;
  } else if (lanuageStr == "en") {
    return 1;
  } else if (lanuageStr == "ja") {
    return 2;
  } else {
    return 1;
  }
};