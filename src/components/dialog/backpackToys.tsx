import DialogPlay from "./play";

/* eslint-disable @next/next/no-img-element */
interface iBackpackToys {
  setIsOpen: (val: boolean) => void;
  setnavIndex: (val: number) => void;
  navIndex: number;
}
const BackpackToys = ({ setIsOpen, setnavIndex, navIndex }: iBackpackToys) => {
  return (
    <div className="contentBackpack dp40 flex justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="34"
        viewBox="0 0 24 34"
        fill="none"
        className="dmr45 dw24 dhauto cursor-pointer select-none"
        onClick={() => {
          if (navIndex >= 1) {
            setnavIndex(navIndex - 1);
          }
        }}
      >
        <path
          opacity="0.4"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18.6505 11.6505C17.8695 10.8695 16.6032 10.8695 15.8221 11.6505L11.8869 15.5858C11.1058 16.3668 11.1058 17.6332 11.8869 18.4142L15.8221 22.3495C16.6032 23.1305 17.8695 23.1305 18.6505 22.3495L22.5858 18.4142C23.3668 17.6332 23.3668 16.3668 22.5858 15.5858L18.6505 11.6505ZM18.3517 15.8844C17.7356 15.2683 16.7367 15.2683 16.1206 15.8844C15.5044 16.5005 15.5044 17.4995 16.1206 18.1156C16.7367 18.7317 17.7356 18.7317 18.3517 18.1156C18.9679 17.4995 18.9679 16.5005 18.3517 15.8844Z"
          fill="white"
        />
        <path
          d="M17 2.41421C17 1.52331 15.9229 1.07714 15.2929 1.70711L1.41421 15.5858C0.633165 16.3668 0.633166 17.6332 1.41421 18.4142L15.2929 32.2929C15.9229 32.9229 17 32.4767 17 31.5858V28.8284C17 28.298 16.7893 27.7893 16.4142 27.4142L7.41421 18.4142C6.63316 17.6332 6.63317 16.3668 7.41421 15.5858L16.4142 6.58579C16.7893 6.21071 17 5.70201 17 5.17157V2.41421Z"
          fill="white"
        />
      </svg>
      <div className="toylist flex-[4] dmr100 grid grid-cols-5 dgap40">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]?.map((item, index: number) => (
          <div
            className="rounded-[10px] overflow-hidden"
            key={index}
            style={{
              background: "linear-gradient(270deg, #FFCCED 0%, #EDD8E5 100%)",
            }}
          >
            <img className="dh150 rounded-br-[20px]" src="/img/1.jpg" alt="" />
            <div
              className="flex justify-center items-center dh45"
              style={{
                background: "linear-gradient(270deg, #FFCCED 0%, #EDD8E5 100%)",
              }}
            >
              <img
                className="dw20 h-auto dmr5"
                src="/img/LostEnergy.svg"
                alt=""
              />
              <span className="dtext22 font-[700] text-[#383158]">22</span>
            </div>
          </div>
        ))}
      </div>
      <div className="bgToysDetail flex-[3] rounded-[10px] overflow-hidden">
        <div className="bg-[#7766ED]/60 flex justify-start items-center dpl25 dh90">
          <img className="dw32 dhauto dmr20" src="/img/svg/paw.svg" alt="" />
          <span className="dtext30 font-[700] text-[#FFFDCE]">
            Shiny Cat Tree
          </span>
        </div>
        <div className="dh340 dp40 flex justify-start">
          <div className="flex-1 dpt25">
            <div className="flex justify-start items-center dmb30">
              <img
                className="dw24 h-auto dmr10"
                src="/img/svg/timer.svg"
                alt=""
              />
              <span className="text-white dtext26 font-[500]">02h:00</span>
            </div>
            <div className="flex justify-start items-center">
              <img
                className="dw34 h-auto dmr10"
                style={{ marginLeft: "-2px" }}
                src="/img/love.svg"
                alt=""
              />
              <span className="text-white dtext26 font-[500]">+1</span>
            </div>
          </div>
          <img
            className="dw260 dhauto rounded-[10px]"
            src="/img/1.jpg"
            alt=""
          />
        </div>
        <div
          className="dh280 dpl36 dpr36 dpt30 dpb34 flex flex-col"
          style={{
            background: "linear-gradient(79deg, #EFC0DE 0%, #EFD6E6 100%)",
          }}
        >
          <div className="text-[#383158] dtext26 font-[500]">
            Climb, scratch, and play freely!
          </div>
          <div className="grow"></div>
          <DialogPlay
            playEnd={()=>{
              setIsOpen(false)
            }}
            trigger={
              <div
                className="dpt28 dpb28 text-center text-[#8F1D00] dtext26 font-[800] cursor-pointer select-none"
                style={{
                  borderRadius: "10px",
                  background:
                    "linear-gradient(254deg, #FFFDCB 0%, #FFF600 144.38%)",
                  boxShadow:
                    "-3.556px 3.556px 12.444px 0px rgba(0, 0, 0, 0.10)",
                }}
                onClick={() => {
                  // setIsOpen(false);
                }}
              >
                Play
              </div>
            }
          ></DialogPlay>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="34"
        viewBox="0 0 24 34"
        fill="none"
        className="dml45 dw24 dhauto cursor-pointer select-none"
        onClick={() => {
          if (navIndex < 2) {
            setnavIndex(navIndex + 1);
          }
        }}
      >
        <path
          opacity="0.4"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.34927 11.6502C6.13032 10.8692 7.39665 10.8692 8.1777 11.6502L12.1129 15.5855C12.894 16.3665 12.894 17.6329 12.1129 18.4139L8.1777 22.3492C7.39665 23.1302 6.13032 23.1302 5.34927 22.3492L1.41403 18.4139C0.632979 17.6329 0.632979 16.3665 1.41403 15.5855L5.34927 11.6502ZM5.64807 15.8841C6.2642 15.268 7.26313 15.268 7.87925 15.8841C8.49538 16.5002 8.49538 17.4992 7.87925 18.1153C7.26313 18.7314 6.2642 18.7314 5.64807 18.1153C5.03195 17.4992 5.03195 16.5002 5.64807 15.8841Z"
          fill="white"
        />
        <path
          d="M7 2.41421C7 1.52331 8.07714 1.07714 8.70711 1.70711L22.5858 15.5858C23.3668 16.3668 23.3668 17.6332 22.5858 18.4142L8.70711 32.2929C8.07714 32.9229 7 32.4767 7 31.5858V28.8284C7 28.298 7.21071 27.7893 7.58579 27.4142L16.5858 18.4142C17.3668 17.6332 17.3668 16.3668 16.5858 15.5858L7.58579 6.58579C7.21071 6.21071 7 5.70201 7 5.17157V2.41421Z"
          fill="white"
        />
      </svg>
    </div>
  );
};
export default BackpackToys;
