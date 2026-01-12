// packages
import { useEffect, useState, useRef } from 'react';

// stores
import { useLaLaStore1 } from './stores/useLaLaStore';

// custom hooks & utils
import scrollToElement from './utils/scrollToElement';

// components
import Header from './components/basic/Header.jsx';
import Footer from './components/basic/Footer.jsx';
import LeftNav from './components/basic/LeftNav.jsx';
import RightNav from './components/basic/RightNav.jsx';
import Banner from './components/Banner/Banner.jsx';
import Bank from './components/Bank/Bank.jsx';
import SubSlider from './components/SubSlider/SubSlider.jsx';
import Theme1 from './components/ThemeProducts/Theme1.jsx';
import Theme2 from './components/ThemeProducts/Theme2.jsx';
import Theme3 from './components/ThemeProducts/Theme3.jsx';
import Theme4 from './components/ThemeProducts/Theme4.jsx';
import Loading from './components/Loading.jsx';

// styles
import './styles/all.scss';

function App() {
  const hasLeftNav = true; // 是否需要左選單?
  const getLalaData1 = useLaLaStore1((state) => state.getData); // 執行呼叫拉拉熊 1 資料方法
  const bankRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // 取得拉拉熊 1 資料
  useEffect(() => {
    getLalaData1();
  }, []);

  // 判斷是否有網址 #id 錨點
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 30;

    const scrollHandler = () => {
      const anchor = window.location.hash.split('#')[1];
      if (!anchor) {
        return;
      } else {
        scrollToElement(anchor, 'instant');
      }

      if (retryCount < maxRetries) {
        retryCount++;
        requestAnimationFrame(scrollHandler);
      } else {
        console.warn('錨點 id 有誤');
      }
    };

    scrollHandler();
  }, []);
  return (
    <div className="wrap">
      <Loading isLoading={isLoading} setIsLoading={setIsLoading} />
      <Header />
      {hasLeftNav && <LeftNav />}
      <RightNav />
      <div className="main">
        {/* ============ Main ============ */}
        <Banner bankRef={bankRef} isLoading={isLoading} />
        <Bank ref={bankRef} />
        <SubSlider />
        <div id="theme1" data-title="質感日常">
          <Theme1 />
        </div>
        <div id="theme2" data-title="媽咪好幫手">
          <Theme2 />
        </div>
        <div id="theme3" data-title="育兒精選">
          <Theme3 />
        </div>
        <div id="theme4" data-title="孩子玩具箱">
          <Theme4 />
        </div>
      </div>
      {/* ============ End Main ============ */}
      <Footer hasLeftNav={hasLeftNav} />
    </div>
  );
}
export default App;
