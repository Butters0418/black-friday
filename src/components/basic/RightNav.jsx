// 元件說明:右選單，手機為上選單
import { useEffect, useState, useCallback } from 'react';

// packages
import { useThrottle } from '@uidotdev/usehooks';

// stores
import { useLaLaStore1 } from '../../stores/useLaLaStore';

// custom hooks & utils
import getDataById from '../../utils/getDataById';
import useWindowWidth from '../../hooks/useWindowWidth';
import useWindowScroll from '../../hooks/useWindowScroll';

// components
import RightNavNb from './RightNavNb/RightNavNb';
import RightNavPcFull from './RightNavPcFull/RightNavPcFull';
import TopNavMb from './TopNavMb/TopNavMb';

function RightNav() {
  const { newPdData } = useLaLaStore1();
  const [pdData, setPdData] = useState([]); // 後台貼紙
  const [hashContainer, setHashContainer] = useState([]); // 所有含 data-title 屬性之 dom
  const [currentContainer, setCurrentContainer] = useState(null); // 目前作用中的 dom
  const ww = useWindowWidth();
  const scroll = useWindowScroll();
  const throttleScroll = useThrottle(scroll, 80);

  // 取得所有 data-title 作為右選單/上方錨點
  const updateHashContainer = useCallback(() => {
    const allContainer = [...document.querySelectorAll('[data-title]')];
    setHashContainer(allContainer);
  }, []);

  // dom observer
  useEffect(() => {
    let observer;
    // init
    const timerInitialUpdate = setTimeout(() => {
      updateHashContainer();
      observer = new MutationObserver(() => {
        updateHashContainer();
      });

      const config = { childList: true, subtree: true };
      observer.observe(document.body, config);

      // 僅監聽前 2 秒
      const timerDisconnect = setTimeout(() => {
        observer.disconnect();
      }, 2000);
      return () => clearTimeout(timerDisconnect);
    }, 500);

    // 清理初始化的計時器和 observer
    return () => {
      clearTimeout(timerInitialUpdate);
      if (observer) observer.disconnect();
    };
  }, []);

  // 滾動監聽作用中的區塊
  useEffect(() => {
    const targetContainer = hashContainer.find((item) => {
      return (
        item.getBoundingClientRect().top < 200 &&
        item.getBoundingClientRect().bottom > 200
      );
    });
    if (targetContainer?.id !== currentContainer) {
      setCurrentContainer(targetContainer?.id || null);
    }
  }, [throttleScroll, hashContainer]);

  // 取得貼紙 data
  useEffect(() => {
    const idData = getDataById(newPdData, 772);
    idData.length !== 0 && setPdData(idData);
  }, [newPdData]);

  return (
    <>
      {ww > 1480 ? (
        <RightNavPcFull
          hashContainer={hashContainer}
          currentContainer={currentContainer}
          sticky={pdData}
        />
      ) : ww > 766 ? (
        <RightNavNb
          hashContainer={hashContainer}
          currentContainer={currentContainer}
          sticky={pdData}
        />
      ) : (
        <TopNavMb
          hashContainer={hashContainer}
          currentContainer={currentContainer}
        />
      )}
    </>
  );
}

export default RightNav;
