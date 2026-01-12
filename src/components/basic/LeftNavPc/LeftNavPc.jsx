// 元件說明: PC 左選單
import { useEffect, useState, memo } from 'react';

// packages
import { IoIosArrowForward } from 'react-icons/io';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// custom hooks & utils
import useWindowWidth from '../../../hooks/useWindowWidth';
import useWindowScroll from '../../../hooks/useWindowScroll';

// images
import { placeImg } from '../../../assets/base';
// import { nominifyLeftnavBg } from '../../../assets/layout';

// style
import {
  SNavContainer,
  SButton,
  SListContainer,
  SSticker,
  SListWrap,
  STopList,
  SMainList,
  SSubList,
} from './style';

const leftNavBg = 'leftNav-bg.svg';

function LeftNavPc({ newNavData, moreActive }) {
  const [isOpen, setIsOpen] = useState(true); // 左選開關
  const [isScrollTop, setIsScrollTop] = useState(false); // 是否上滑
  const ww = useWindowWidth();
  const scroll = useWindowScroll();

  // resize handler
  useEffect(() => {
    if (ww > 1480) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [ww]);

  // scroll handler
  useEffect(() => {
    if (scroll > 40) {
      setIsScrollTop(true);
    } else {
      setIsScrollTop(false);
    }
  }, [scroll]);

  return (
    <SNavContainer isOpen={isOpen} isScrollTop={isScrollTop}>
      <SButton
        isOpen={isOpen}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        aria-label="left-nav toggle button"
      >
        <IoIosArrowForward
          className={`h-7 w-7 text-white ${isOpen && 'rotate-180'}`}
        />
      </SButton>
      <SListContainer isOpen={isOpen}>
        {/* 貼紙 */}
        <SSticker href={newNavData.stickerImg.url}>
          <img
            src={
              newNavData.stickerImg.imgSrc
                ? newNavData.stickerImg.imgSrc
                : placeImg
            }
            className="h-[120px] w-[120px]"
            alt="主會場"
          />
        </SSticker>

        {/* 選單 */}
        <SListWrap
          style={{
            backgroundImage: `url(./${leftNavBg})`,
          }}
        >
          {/* 額外活動 */}
          <STopList>
            {moreActive.length === 0 ? (
              <Skeleton
                count={2}
                className="h-[32px] w-full opacity-50"
                containerClassName="w-full"
                baseColor="#fff"
                highlightColor="#fff"
              />
            ) : (
              moreActive.map((item, index) => (
                <a key={index} href={item.url}>
                  {item.productName}
                </a>
              ))
            )}
          </STopList>
          {/* 分會場 */}
          <SMainList>
            {newNavData.otherLink.length === 0 ? (
              <>
                {Array.from({ length: 14 }).map((_, index) => (
                  <li key={index}>
                    <Skeleton
                      className="h-[24px] w-full opacity-50"
                      baseColor="#ff718c"
                      highlightColor="#ff718c"
                    />
                  </li>
                ))}
              </>
            ) : (
              newNavData.otherLink
                .filter((item, index, arr) => {
                  return index <= arr.length - 4;
                })
                .map((item, index) => {
                  return (
                    <li key={index}>
                      <a href={item.url}>{item.text}</a>
                    </li>
                  );
                })
            )}
          </SMainList>

          {/* 品牌區 */}
          <SSubList>
            {newNavData.otherLink.length === 0 ? (
              <>
                {Array.from({ length: 3 }).map((_, index) => (
                  <li key={index}>
                    <Skeleton
                      className="h-[24px] w-full opacity-50"
                      baseColor="#ff718c"
                      highlightColor="#ff718c"
                    />
                  </li>
                ))}
              </>
            ) : (
              newNavData.otherLink
                .filter((item, index, arr) => {
                  return index > arr.length - 4;
                })
                .map((item, index) => {
                  return (
                    <li key={index}>
                      <a href={item.url}>{item.text}</a>
                    </li>
                  );
                })
            )}
          </SSubList>
        </SListWrap>
      </SListContainer>
    </SNavContainer>
  );
}

export default memo(LeftNavPc);
