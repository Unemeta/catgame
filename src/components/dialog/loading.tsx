import { Dialog, DialogContent, DialogTitle } from ".";
import DialogTitleView from "./dialogTitle";

/* eslint-disable @next/next/no-img-element */
interface iDialogLoading {
  title?: string;
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
}
const DialogLoading = ({ isOpen, setIsOpen }: iDialogLoading) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(val) => {
        setIsOpen(val);
      }}
    >
      <DialogContent className="p-0 dw1066 h-auto max-w-[100vw]">
        <DialogTitle></DialogTitle>
        <div className="flex justify-center items-center">
          <svg
            className="spinner"
            width="65px"
            height="65px"
            viewBox="0 0 66 66"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="path"
              fill="none"
              stroke-width="6"
              stroke-linecap="round"
              cx="33"
              cy="33"
              r="30"
            ></circle>
          </svg>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DialogLoading;
