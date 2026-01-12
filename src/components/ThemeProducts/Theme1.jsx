// react 相關
import { useState, useEffect, useRef } from 'react';

// swiper 相關
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';

// gsap
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// stores
import { useLaLaStore1 } from '../../stores/useLaLaStore';

// custom hooks & utils
import useWindowWidth from '../../hooks/useWindowWidth';
import getDataById from '../../utils/getDataById';
import formatPriceText from '../../utils/formatPriceText';

// register useGSAP
gsap.registerPlugin(useGSAP);

// assets
import {
  bgThemeBgText,
  theme1BgItem1,
  theme1BgItem2,
  theme1Logo1,
  theme1Logo2,
  theme1Logo3,
  theme1Logo4,
  theme1Logo5,
  theme1Logo6,
  theme1Logo7,
  theme1Logo8,
  theme1Logo9,
  theme1Logo10,
  commonArrowR,
} from '../../assets/layout';

function Theme1() {
  const newPdData = useLaLaStore1((state) => state.newPdData);
  const [themeData, setThemeData] = useState([]);
  const windowWidth = useWindowWidth();
  const container = useRef(null);

  useEffect(() => {
    const idData = getDataById(newPdData, 88);
    idData.length !== 0 && setThemeData(idData);
  }, [newPdData]);

  // 跑馬燈動畫
  useGSAP(
    () => {
      if (windowWidth > 992) {
        gsap.to('.theme-marquee p', {
          yPercent: 50,
          ease: 'none',
          duration: 26,
          repeat: -1,
        });
      }
    },
    { scope: container, dependencies: [windowWidth] },
  );

  const logoImages = [
    theme1Logo1,
    theme1Logo2,
    theme1Logo3,
    theme1Logo4,
    theme1Logo5,
    theme1Logo6,
    theme1Logo7,
    theme1Logo8,
    theme1Logo9,
    theme1Logo10,
  ];

  return (
    <section className="theme theme1 theme-style-left" ref={container}>
      {/* 背景 */}
      <img className="theme-bg bg-1" src={theme1BgItem1} alt="black friday" />
      <img className="theme-bg bg-2" src={theme1BgItem2} alt="black friday" />

      {/* 跑馬燈 */}
      <div className="theme-marquee">
        <p>
          <span>
            <img src={bgThemeBgText} alt="black friday" />
          </span>
          <span>
            <img src={bgThemeBgText} alt="black friday" />
          </span>
        </p>
      </div>

      {themeData.length > 0 && (
        <div className="theme-container">
          {/* title */}
          <h3 className="theme-title">質感日常好物</h3>

          {/* 主要商品 */}
          {themeData[0] && (
            <div className="theme-main">
              <a href={themeData[0].url} className="topPd grid grid-cols-12">
                <div className="topPd-img col-span-6 lg:col-span-5">
                  <img
                    src={themeData[0].imgSrc}
                    alt={themeData[0].productName}
                  />
                </div>
                <div className="topPd-text col-span-6 lg:col-span-7">
                  <p className="topPd-title">{themeData[0].productTitle}</p>
                  <p className="topPd-name">{themeData[0].productName}</p>
                  <p
                    className="pd-discountPrice"
                    dangerouslySetInnerHTML={{
                      __html: `<span class="sale">SALE</span>${formatPriceText(
                        themeData[0].discountPrice,
                      )}`,
                    }}
                  />
                  <p className="topPd-more">
                    <img src={commonArrowR} alt="more" />
                    more
                  </p>
                </div>
              </a>
            </div>
          )}

          {/* 其他商品 1 */}
          <div className="other-pd grid grid-cols-4">
            {themeData.slice(1, 5).map((product) => (
              <div key={product.id} className="pd col-span-2 lg:col-span-1">
                <a href={product.url} className="block">
                  <img
                    className="pd-img"
                    src={product.imgSrc}
                    alt={product.productName}
                  />
                  <p className="pd-title">{product.productTitle}</p>
                  <h4>{product.productName}</h4>
                  {product.marketPrice && (
                    <p className="pd-marketPrice">${product.marketPrice}</p>
                  )}
                  <p
                    className="pd-discountPrice"
                    dangerouslySetInnerHTML={{
                      __html: `<span class="sale">SALE</span>${formatPriceText(
                        product.discountPrice,
                      )}`,
                    }}
                  />
                </a>
              </div>
            ))}
          </div>

          {/* 其他商品 2 */}
          <div className="other-pd other-pd-second grid grid-cols-4">
            {themeData.slice(5, 9).map((product) => (
              <div key={product.id} className="pd col-span-2 lg:col-span-1">
                <a href={product.url} className="block">
                  <img
                    className="pd-img"
                    src={product.imgSrc}
                    alt={product.productName}
                  />
                  <p className="pd-title">{product.productTitle}</p>
                  <h4>{product.productName}</h4>
                  {product.marketPrice && (
                    <p className="pd-marketPrice">${product.marketPrice}</p>
                  )}
                  <p
                    className="pd-discountPrice"
                    dangerouslySetInnerHTML={{
                      __html: `<span class="sale">SALE</span>${formatPriceText(
                        product.discountPrice,
                      )}`,
                    }}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* logo 輪播 */}
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          768: {
            spaceBetween: 30,
          },
          1367: {
            spaceBetween: 40,
          },
        }}
        className="theme-swiper"
      >
        {logoImages.map((logo, index) => (
          <SwiperSlide key={index}>
            <a href="" className="block">
              <img src={logo} alt={`logo ${index + 1}`} />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ribbon */}
      <div className="ribbon"></div>
    </section>
  );
}

export default Theme1;
