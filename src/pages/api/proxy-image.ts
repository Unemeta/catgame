// pages/api/proxy-image.ts
import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { url } = req.query; // 获取图片 URL（需编码）
    try {
        const response = await fetch(url as string);
        const arrayBuffer = await response.arrayBuffer(); // 改用 arrayBuffer()
        const buffer = Buffer.from(arrayBuffer); // 转换为 Buffer
        res.setHeader("Content-Type", response.headers.get("Content-Type") || "image/png");
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ error });
    }
}