import { ReactNode } from "react";

export interface Tabs {
    [key: string]: TabItem; // 声明索引签名
}
export interface iDialogShop {
    trigger?: ReactNode;
    navIndex?: number;
    setNavIndex?: (index: number) => void;
    title: string;
    tabs: Tabs;
}
export interface TabItem {
    unlocked: boolean;
    goods: [];
    // 其他可能的属性...
}
export interface good {
    affection: number;
    coin: number;
    diamond: number;
    expire: number;
    id: number;
    unlocked: boolean;
    countdown: number
}
export interface backpackInfo {
    can_play: boolean;
    countdown: number;
    items: Array<good>
}