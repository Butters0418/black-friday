// 元件說明:手機底部選單
import { useState, useRef } from 'react';

// packages
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { IoIosCloseCircleOutline } from 'react-icons/io';

// images
import { footerMenu, footerGoTop } from '../../../assets/base';

// style
import {
  SNavContainer,
  SNavBtn,
  SNavIcon,
  SBoard,
  SBtnClose,
  SListContainer,
  SListUl,
} from './style';

// register useGSAP
gsap.registerPlugin(useGSAP);

function FooterNavMb({ newNavData, moreActive }) {
  const [isBoardOpen, setIsBoardOpen] = useState(false); // 面版是否開啟
  const container = useRef(null); // gsap scope
  const tl = useRef(null); // 面版收合 timeline

  // 面版收合
  function toggleTimeline() {
    setIsBoardOpen((prev) => !prev);
    tl.current.reversed(!tl.current.reversed());
  }

  // 面版動畫
  useGSAP(
    () => {
      tl.current = gsap
        .timeline()
        .to('.list__container', { duration: 0.2, y: 0 }, 0.12)
        .to('.list__ul', { duration: 0.3, y: 0, opacity: 1 }, 0.2)
        .progress(0)
        .reverse();
    },
    { scope: container },
  );

  return (
    <SNavContainer isOpen={isBoardOpen} ref={container}>
      {/* 按鈕區 */}
      <div className="footer__container">
        <div className="flex h-full justify-evenly">
          {/* 額外活動 */}
          {moreActive.length !== 0 &&
            moreActive.map((item, index) => (
              <SNavBtn as="a" href={item.url} key={index}>
                <SNavIcon>
                  <img
                    src={item.imgSrc}
                    alt={item.productName}
                    className="rounded-full"
                  />
                  <span>{item.productName}</span>
                </SNavIcon>
              </SNavBtn>
            ))}

          {/* 分會場按鈕 */}
          <SNavBtn type="button" onClick={toggleTimeline}>
            <SNavIcon>
              <img src={footerMenu} alt="分會場" />
              <span>分會場</span>
            </SNavIcon>
          </SNavBtn>

          {/* 回上方按鈕 */}
          <SNavBtn
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <SNavIcon>
              <img src={footerGoTop} alt="back to top" />
              <span>TOP</span>
            </SNavIcon>
          </SNavBtn>
        </div>
      </div>

      {/* 收合面版 分會場 */}
      <SBoard>
        <SListContainer className="list__container">
          {/* 關閉按鈕 */}
          <SBtnClose onClick={toggleTimeline}>
            <IoIosCloseCircleOutline className="h-8 w-8" />
            <span>CLOSE</span>
          </SBtnClose>
          {/* 分會場列表 */}
          <SListUl className="list__ul">
            {newNavData.otherLink.map((item, index) => {
              return (
                <li key={index}>
                  <a href={item.url}>{item.text}</a>
                </li>
              );
            })}
          </SListUl>
        </SListContainer>
      </SBoard>
    </SNavContainer>
  );
}

export default FooterNavMb;
