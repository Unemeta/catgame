// pages/api/proxy.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import https from 'https';
import http from 'http';

export const config = {
    api: {
        responseLimit: false, // 允许大文件响应
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'Missing url parameter' });
    }
    try {
        const targetUrl = url;
        const protocol = targetUrl.startsWith('https') ? https : http;
        protocol.get(targetUrl, (fileRes) => {
            res.setHeader('Content-Type', fileRes.headers['content-type'] || 'application/octet-stream');
            res.setHeader('Content-Disposition', 'attachment; filename=video.mp4');
            res.setHeader('Access-Control-Allow-Origin', '*');
            fileRes.pipe(res); // 直接管道传输
        }).on('error', (err) => {
            console.error('Stream proxy error:', err);
            res.status(500).json({ error: 'Failed to stream video file' });
        });
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
