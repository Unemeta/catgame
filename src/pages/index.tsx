import Head from "next/head";
import styles from '@/styles/home.module.css';
import VideoBackground from "@/components/VideoBackground";
import TopItem from "@/components/TopItem";
import Avatar from "@/components/Avatar"
import FloatingBubbles from "@/components/FloatingBubbles";

export default function Home() {
  return (
    <>
      <Head>
        <title>My Next.js App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.top}>
        <Avatar></Avatar>
        <TopItem imgUrl="./img/love.svg" label="Affection" number="43"></TopItem>
        <TopItem imgUrl="./img/catfoot.svg" label="Days" number="5"></TopItem>
        <TopItem imgUrl="./img/gold.svg" label="Gold" number="23465"></TopItem>
        <TopItem imgUrl="./img/LostEnergy.svg" label="Crystal" number="243"></TopItem>
        <FloatingBubbles></FloatingBubbles>
        <VideoBackground />
      </div>

      {/* <div>
        <h1>欢迎使用 Next.js + TypeScript</h1>
        <p>这是一个支持移动端适配的 WebApp！</p>
      </div> */}
    </>
  );
}
