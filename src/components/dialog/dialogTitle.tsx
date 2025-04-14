/* eslint-disable @next/next/no-img-element */
interface iDialogTitleView {
  title?: string;
}
const DialogTitleView = ({ title }: iDialogTitleView) => {
  return (
    <div className="absolute top-0 right-0 w-full  dpt10">
      <div className="flex justify-center items-cente">
        <img className="w-[1.1vw] h-auto" src="/img/svg/paw.svg" alt="" />
        <span className="dml20 dmr20 text-white dtext40 font-[800] leading-none">
          {title}
        </span>
        <img className="w-[1.1vw] h-auto" src="/img/svg/paw.svg" alt="" />
      </div>
    </div>
  );
};
export default DialogTitleView;
