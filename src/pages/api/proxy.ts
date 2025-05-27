// pages/api/proxy/[[...url]].ts
import type { NextApiRequest, NextApiResponse } from 'next';
// import axios from 'axios';

// 配置参数
// const TIMEOUT = 5000;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  // 1. 安全验证
  const { url } = req.query;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing url parameter' });
  }
  // 3. 代理请求
   try {
    const response = await fetch(url);
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const buffer = await response.arrayBuffer();

    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(Buffer.from(buffer));
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch resource' });
  }
}