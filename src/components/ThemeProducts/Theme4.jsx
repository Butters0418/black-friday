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
  theme4BgItem1,
  theme4BgItem2,
  theme4Logo1,
  theme4Logo2,
  theme4Logo3,
  theme4Logo4,
  theme4Logo5,
  theme4Logo6,
  theme4Logo7,
  theme4Logo8,
  theme4Logo9,
  theme4Logo10,
  commonArrowR,
} from '../../assets/layout';

function Theme4() {
  const newPdData = useLaLaStore1((state) => state.newPdData);
  const [themeData, setThemeData] = useState([]);
  const windowWidth = useWindowWidth();
  const container = useRef(null);

  useEffect(() => {
    const idData = getDataById(newPdData, 121);
    idData.length !== 0 && setThemeData(idData);
  }, [newPdData]);

  // 跑馬燈動畫
  useGSAP(
    () => {
      if (windowWidth > 992) {
        gsap.to('.theme-marquee p', {
          yPercent: -50,
          ease: 'none',
          duration: 26,
          repeat: -1,
        });
      }
    },
    { scope: container, dependencies: [windowWidth] },
  );

  const logoImages = [
    theme4Logo1,
    theme4Logo2,
    theme4Logo3,
    theme4Logo4,
    theme4Logo5,
    theme4Logo6,
    theme4Logo7,
    theme4Logo8,
    theme4Logo9,
    theme4Logo10,
  ];

  return (
    <section className="theme theme4 theme-style-right" ref={container}>
      {/* 背景 */}
      <img className="theme-bg bg-1" src={theme4BgItem1} alt="black friday" />
      <img className="theme-bg bg-2" src={theme4BgItem2} alt="black friday" />

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
          <h3 className="theme-title">孩子玩具箱</h3>

          {/* 主要商品 */}
          {themeData[0] && (
            <div className="theme-main">
              <a href={themeData[0].url} className="topPd grid grid-cols-12">
                <div className="topPd-img col-span-6 lg:order-2 lg:col-span-5">
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
          reverseDirection: true,
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

export default Theme4;
