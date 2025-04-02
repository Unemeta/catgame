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

