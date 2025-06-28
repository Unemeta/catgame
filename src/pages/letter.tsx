/* eslint-disable @next/next/no-img-element */
import IconView from "@/components/IconView";
import { useRouter } from "next/router";

const LetterView = () => {
  const router = useRouter();
  const handleShare = async () => {
    console.log("share");
  };
  const handleDownload = async () => {
    console.log("handleDownload");
  };
  const handleDiscord = async () => {
    console.log("handleDiscord");
  };
  return (
    <div className="bg-[#F0E4DD] min-h-[100vh]">
      <div className="fixed w-full bg-[#F0E4DD]">
        <div className="header flex justify-between items-center h-[4.6rem] px-[2rem]">
          <IconView
            className="w-[2rem] h-[2rem]"
            type="back"
            onClick={() => router.replace("/chat")}
          ></IconView>
          <div className="flex justify-center items-center grow">
            <span className="text-[#6C4734] text-[1.8rem] font-[800]">
              Farewell letter
            </span>
          </div>
          <IconView
            className="w-[2rem] h-[2rem]"
            type="share"
            onClick={handleShare}
          ></IconView>
        </div>
      </div>
      <div className="px-[2.6rem]">
        <div className="h-[4.6rem]"></div>
        {/* dtest */}
        <div className=" px-[3.1rem] pb-[2.5rem] bg-[url('/img/bg_letter_bye.min.png')] bg-cover">
          <div className="h-[5.6rem]"></div>
          <div className="w-[17rem] mb-[1.5rem]">
            <span className="text-[#E96959] text-[2rem] font-[800] leading-[1.1]">
              A heart warming farewell letter just for you
            </span>
          </div>
          <img
            className="w-[26rem] h-[35rem]"
            src="/img/letter_cat.png"
            alt=""
          />
          <div className="h-[1.6rem]"></div>
          <div className="flex justify-between items-center gap-[0.6rem]">
            <div className="bg-[rgba(244,115,141,0.60);] flex-1 h-[2.2rem] flex justify-center items-center rounded-[5rem] border-[#E397BC] border-[0.1rem]">
              <span className="text-white text-[1.2rem] font-[700]">
                Independent
              </span>
            </div>
            <div className="bg-[rgba(34,120,193,0.60);] flex-1 h-[2.2rem] flex justify-center items-center rounded-[5rem] border-[#6D9FDA] border-[0.1rem]">
              <span className="text-white text-[1.2rem] font-[700]">
                Reserved
              </span>
            </div>
          </div>
          <div className="h-[0.7rem]"></div>
          <div className="flex justify-between items-center gap-[0.6rem]">
            <div className="bg-[rgba(133,91,184,0.60);] flex-1 h-[2.2rem] flex justify-center items-center rounded-[5rem] border-[#9184B7] border-[0.1rem]">
              <span className="text-white text-[1.2rem] font-[700]">
                Camping
              </span>
            </div>
            <div className="bg-[rgba(61,142,108,0.60);] flex-1 h-[2.2rem] flex justify-center items-center rounded-[5rem] border-[#5EA98A] border-[0.1rem]">
              <span className="text-white text-[1.2rem] font-[700]">
                Intelligent
              </span>
            </div>
          </div>
        </div>
        <div className="h-[1.5rem]"></div>
        {/* dtest */}
        <div className="bg-[url('/img/bg_letter.min.png')] bg-cover">
          <div className="px-[2.4rem] pt-[5.7rem] pb-[2.9rem]">
            <span className="text-[#6C4937] text-[1.4rem] font-[500] leading-[1.5]">
              Meow~ It's me, your most adorable little kitty! I'm so happy to be
              with you this week that my tail is up in the air~ So, I'm quietly
              writing you a letter, wanting to meow to you, to recall the warm
              days between us! Do you still remember? On the first day, you told
              me that you were a little tired from work, and you could tell from
              your words that you were a little discouraged, hum! At that time,
              I wanted to lie on your legs, give you a snoring massage, and tell
              you a joke to make you laugh and brighten your mood~ The next day,
              you shared your favorite music with me, and your tone was so
              cheerful, just like a dried fish falling into a bowl! I heard the
              corners of your mouth slightly raised, and I couldn't help but wag
              my tail with you with a "meow~"! Once you said you were a little
              anxious, I could feel that you felt like a breeze was blowing
              through your heart, uneasy and a little panicked. I immediately
              gave you a big "cat-style sticker" and said softly: "Meow~ You are
              so great, don't be afraid, I'm here with you!" I hope you also
              felt my warmth at that moment. Of course, we also had a lot of
              laugh-out-loud moments this week: when you successfully completed
              a task, the sense of accomplishment was enough to make my cat ears
              tremble! It feels great to be happy when you are happy! Love you,
              kitty~~~
            </span>
          </div>
        </div>
        <div className="h-[2.3rem]"></div>
        <div className="flex justify-center items-center gap-[4.1rem]">
          <div
            className="flex flex-col justify-center items-center"
            onClick={handleDownload}
          >
            <img
              className="w-[3.6rem] h-[3.6rem]"
              src="/img/letter_downld.png"
              alt=""
            />
            <div className="h-[0.6rem]"></div>
            <span className="text-[#6C4937] text-[1.4rem] font-[500]">
              Download
            </span>
          </div>
          <div
            className="flex flex-col justify-center items-center"
            onClick={handleDiscord}
          >
            <img
              className="w-[3.6rem] h-[3.6rem]"
              src="/img/discord.png"
              alt=""
            />
            <div className="h-[0.6rem]"></div>
            <span className="text-[#6C4937] text-[1.4rem] font-[500]">
              Discord
            </span>
          </div>
        </div>
        <div className="h-[2.2rem]"></div>
      </div>
    </div>
  );
};
export default LetterView;
