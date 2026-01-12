// 元件說明:折價券用燈箱

// packages
import tw, { styled } from 'twin.macro';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { IoCloseOutline } from 'react-icons/io5';

// stores

// custom hooks & utils

// components

// images
import { nominifyCouponGetSuccess } from '../../assets/layout';

// style
const SMyDialog = styled(Dialog)`
  // 燈箱外層
  .MuiPaper-root {
    ${tw`rounded-lg bg-white w-[90vw]`}
    ${tw`sm:w-[500px]`}
  }
  // 燈箱 Content
  .MuiDialogContent-root {
    ${tw`flex flex-col`}
  }
  .close-btn {
    ${tw`outline-2 outline outline-[#ebebeb] w-8 h-8 p-1 hover:bg-[#e5e5e5] duration-700`}
  }
`;

// constants

function CouponModal({ modalState, handleClose }) {
  return (
    <div className="container mx-auto p-5 text-center">
      <SMyDialog open={modalState} onClose={handleClose}>
        <DialogContent className="text-center">
          <div className="text-right">
            <IconButton
              className="close-btn"
              aria-label="delete"
              size="middle"
              onClick={handleClose}
            >
              <IoCloseOutline />
            </IconButton>
          </div>
          <div className="flex flex-grow flex-col items-center justify-center">
            {/* 圖片網址中加上時間戳，讓每次開啟燈箱都加重複加載 */}
            <div className="w-2/5 sm:w-[140px]">
              <div className="aspect-1">
                <img
                  src={`${nominifyCouponGetSuccess}?time=${new Date().getTime()}`}
                  alt="coupon-get-success"
                  className="w-full"
                />
              </div>
            </div>
            <p className="text-[calc(22_/_375_*_100vw)] font-medium sm:text-[32px]">
              折價券領取成功
            </p>
          </div>
          <div className="mt-3">
            <Button variant="outlined" onClick={handleClose}>
              關閉
            </Button>
          </div>
        </DialogContent>
      </SMyDialog>
    </div>
  );
}

export default CouponModal;
