import Head from "next/head";
// import styles from '@/styles/Home.module.css';
import VideoBackground from "@/components/VideoBackground";

export default function Home() {
  return (
    <>
      <Head>
        <title>My Next.js App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <VideoBackground />

      {/* <div>
        <h1>欢迎使用 Next.js + TypeScript</h1>
        <p>这是一个支持移动端适配的 WebApp！</p>
      </div> */}
    </>
  );
}
