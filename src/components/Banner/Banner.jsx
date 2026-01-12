// react
import { useState, useRef, useCallback } from 'react';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';

// gsap
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import useWindowWidth from '../../hooks/useWindowWidth';

// images
import {
  commonBannerRibbon,
  kvSliderkv1Slider11,
  kvSliderkv1Slider11M,
  kvSliderkv1Slider12,
  kvSliderkv1Slider12M,
  kvSliderkv2Slider21,
  kvSliderkv2Slider21M,
  kvSliderkv2Slider22,
  kvSliderkv2Slider22M,
  kvSliderkv2Slider23,
  kvSliderkv2Slider23M,
  kvSliderkv3Slider31,
  kvSliderkv3Slider31M,
  kvSliderkv3Slider32,
  kvSliderkv3Slider32M,
  kvSliderkv3Slider33,
  kvSliderkv3Slider33M,
  kvSliderkv4Slider41,
  kvSliderkv4Slider41M,
  kvSliderkv4Slider42,
  kvSliderkv4Slider42M,
  kvSliderkv4Slider43,
  kvSliderkv4Slider43M,
  kvSliderkv5Slider51,
  kvSliderkv5Slider51M,
  kvSliderkv5Slider52,
  kvSliderkv5Slider52M,
  kvSliderkv5Slider53,
  kvSliderkv5Slider53M,
  kvSliderPlacePc,
  kvSliderPlaceMb,
} from '../../assets/layout';

// register useGSAP
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

// 輪播資料
const sliderData = [
  {
    id: 0,
    url: '',
    images: [
      { desktop: kvSliderkv1Slider11, mobile: kvSliderkv1Slider11M },
      { desktop: kvSliderkv1Slider12, mobile: kvSliderkv1Slider12M },
    ],
  },
  {
    id: 1,
    url: '',
    images: [
      { desktop: kvSliderkv2Slider21, mobile: kvSliderkv2Slider21M },
      { desktop: kvSliderkv2Slider22, mobile: kvSliderkv2Slider22M },
      { desktop: kvSliderkv2Slider23, mobile: kvSliderkv2Slider23M },
    ],
  },
  {
    id: 2,
    url: '',
    images: [
      { desktop: kvSliderkv3Slider31, mobile: kvSliderkv3Slider31M },
      { desktop: kvSliderkv3Slider32, mobile: kvSliderkv3Slider32M },
      { desktop: kvSliderkv3Slider33, mobile: kvSliderkv3Slider33M },
    ],
  },
  {
    id: 3,
    url: '',
    images: [
      { desktop: kvSliderkv4Slider41, mobile: kvSliderkv4Slider41M },
      { desktop: kvSliderkv4Slider42, mobile: kvSliderkv4Slider42M },
      { desktop: kvSliderkv4Slider43, mobile: kvSliderkv4Slider43M },
    ],
  },
  {
    id: 4,
    url: '',
    images: [
      { desktop: kvSliderkv5Slider51, mobile: kvSliderkv5Slider51M },
      { desktop: kvSliderkv5Slider52, mobile: kvSliderkv5Slider52M },
      { desktop: kvSliderkv5Slider53, mobile: kvSliderkv5Slider53M },
    ],
  },
];

function Banner({ bankRef, isLoading }) {
  const [swiperInit, setSwiperInit] = useState(false);
  const bannerRef = useRef(null);
  const swiperRef = useRef(null);
  const ww = useWindowWidth();
  const saleTextAnimateProps =
    ww > 767
      ? {
          yPercent: 100,
          rotationX: 95,
          stagger: 0.15,
        }
      : {};

  // transitionstart 動畫
  const animateActiveSlide = useCallback((swiper) => {
    // 當前 slider, swiper8 小心 loop 模式下 index 可能會亂掉
    const activeSlideEl = swiper.slides[swiper.activeIndex];
    if (!activeSlideEl) return;

    // slider 中所有圖片
    const imgs = activeSlideEl.querySelectorAll('.slider-img');
    if (!imgs.length) return;

    // 停動畫，保留樣式
    gsap.killTweensOf(imgs);

    gsap.set(imgs, { opacity: 1 });

    const tl = gsap.timeline();
    tl.from(
      imgs,
      {
        duration: 1.5,
        opacity: 0,
        x: 150,
        stagger: 0.2,
        skewX: 8,
        ease: 'power4.out',
      },
      0.2,
    );
  }, []);

  // transitionend 清除 圖片 gsap style
  const clearImgsProps = useCallback(() => {
    if (!bannerRef.current) return;
    const allImgs = bannerRef.current.querySelectorAll('.slider-img');
    gsap.set(allImgs, { clearProps: 'all' });
  }, []);

  // banner animate
  useGSAP(
    () => {
      // 等 isLoading: false 才執行
      if (isLoading) return;

      const tl = gsap.timeline({ delay: 0.5 });
      tl.from('.main-text-sale svg', {
        duration: 0.9,
        opacity: 0,
        filter: 'blur(5px)',
        stagger: 0,
        ease: 'back.out(1.2)',
        ...saleTextAnimateProps,
        onStart: () => {
          setTimeout(() => {
            setSwiperInit(true);
            gsap.to('.banner-marquee p', {
              xPercent: '-25',
              ease: 'none',
              duration: 10,
              repeat: -1,
            });
          }, 200);
        },
        onComplete: () => {
          gsap.to('.main-text-sale', {
            scrollTrigger: {
              trigger: bankRef.current,
              scrub: 1,
              start: 'top 40%',
              end: 'top 10%',
            },
            opacity: 0,
            yPercent: -50,
          });
          gsap.to('.main-text-limited', {
            scrollTrigger: {
              trigger: bankRef.current,
              scrub: 1,
              start: 'top 40%',
              end: 'top 10%',
            },
            opacity: 0,
            yPercent: -100,
            filter: 'blur(5px)',
          });
        },
      });
      tl.from(
        '.main-text-limited svg',
        {
          duration: 'random(1,2.5)',
          opacity: 0,
          x: 'random(-300, 300)',
          y: 'random(-200, 500)',
          z: 'random(-500, 500)',
          scale: 'random(1,5)',
          rotationY: 'random(-540,540)',
          ease: 'power3.out',
        },
        0.4,
      );
    },
    { scope: bannerRef, dependencies: [isLoading] },
  );

  return (
    <div ref={bannerRef}>
      {/* 跑馬燈 */}
      <div className="banner-marquee marquee1">
        <p>
          <span>
            <img src={commonBannerRibbon} alt="black friday" />
          </span>
          <span>
            <img src={commonBannerRibbon} alt="black friday" />
          </span>
        </p>
      </div>
      <div className="banner-marquee marquee2">
        <p>
          <span>
            <img src={commonBannerRibbon} alt="black friday" />
          </span>
          <span>
            <img src={commonBannerRibbon} alt="black friday" />
          </span>
        </p>
      </div>

      {/* 背景字 */}
      <div className="main-text">
        {/* limited */}
        <div className="main-text-limited">
          {/* l */}
          <svg
            id="limited-1"
            width="20"
            height="34"
            viewBox="0 0 20 34"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.757202 0.950684H5.05533V30.248H19.2766V33.807H0.757202V0.950684Z" />
          </svg>
          {/* i */}
          <svg
            id="limited-2"
            width="6"
            height="34"
            viewBox="0 0 6 34"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.23232 0.950684V33.807H0.934204V0.950684H5.23232Z" />
          </svg>
          {/* m */}
          <svg
            id="limited-3"
            width="35"
            height="34"
            viewBox="0 0 35 34"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M29.6619 19.379C29.4167 14.795 29.1211 9.28576 29.1643 5.19296H29.0129C27.8735 9.04375 26.496 13.1437 24.8157 17.6778L18.9383 33.6219H15.6786L10.2915 17.9696C8.71218 13.3359 7.37801 9.09358 6.4405 5.19296H6.33955C6.23859 9.28576 5.99338 14.795 5.6977 19.7206L4.81069 33.8141H0.707275L3.02942 0.950684H8.51025L14.193 16.845C15.5776 20.888 16.7099 24.4967 17.5536 27.9133H17.7051C18.5416 24.5964 19.7315 20.9876 21.2099 16.845L27.1379 0.950684H32.6187L34.6956 33.8141H30.4985L29.6619 19.3861V19.379Z" />
          </svg>
          {/* i */}
          <svg
            id="limited-4"
            width="6"
            height="34"
            viewBox="0 0 6 34"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.23232 0.950684V33.807H0.934204V0.950684H5.23232Z" />
          </svg>
          {/* t */}
          <svg
            id="limited-5"
            width="25"
            height="34"
            viewBox="0 0 25 34"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.2804 4.55947H0.155273V0.950684H24.8046V4.55947H14.629V33.807H10.2804V4.55947Z" />
          </svg>
          {/* e */}
          <svg
            id="limited-6"
            width="20"
            height="34"
            viewBox="0 0 20 34"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.0666 18.4038H5.12182V30.248H19.545V33.807H0.82373V0.950684H18.8022V4.50964H5.12182V14.8947H18.0666V18.4038Z" />
          </svg>
          {/* d */}
          <svg
            id="limited-7"
            width="28"
            height="35"
            viewBox="0 0 28 35"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.218018 1.38492C2.83584 0.993434 5.95129 0.701599 9.35517 0.701599C15.5283 0.701599 19.9274 2.11806 22.8409 4.7944C25.8048 7.47785 27.5356 11.2788 27.5356 16.5959C27.5356 21.913 25.8553 26.3474 22.7471 29.3726C19.6317 32.4475 14.4971 34.0989 8.02826 34.0989C4.96332 34.0989 2.39593 33.9494 0.225236 33.7074V1.38492H0.218018ZM4.5162 30.4403C5.60516 30.6324 7.18444 30.6823 8.86475 30.6823C18.0524 30.6823 23.0428 25.6143 23.0428 16.7383C23.0933 8.98685 18.6438 4.06126 9.55712 4.06126C7.33594 4.06126 5.65564 4.25344 4.5162 4.50257V30.4474V30.4403Z" />
          </svg>
        </div>

        {/* sale黑五 */}
        <div className="main-text-sale">
          {/* s */}
          <svg
            id="sale-1"
            width="110"
            height="173"
            viewBox="0 0 110 173"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.22081 136.4C17.1585 142.07 32.2873 147.039 47.9929 147.039C67.6547 147.039 78.6605 137.892 78.6605 124.237C78.6605 111.625 70.1199 104.195 48.7704 96.5214C20.9012 86.7332 3.10217 71.9292 3.10217 47.9949C3.10217 20.6341 26.2076 0.0408325 62.8054 0.0408325C81.0915 0.0408325 94.4601 3.89032 103.244 8.29522L95.87 32.9088C89.7689 29.7472 78.0111 24.9791 62.1689 24.9791C42.6053 24.9791 34.3082 35.2843 34.3082 45.1024C34.3082 57.9155 44.0665 63.9397 66.5823 72.4461C95.8871 83.5289 109.978 98.0851 109.978 122.092C109.978 148.962 89.5382 172.268 46.0062 172.268C28.1516 172.268 9.62621 167.243 0.401978 161.655L7.22081 136.396V136.4Z" />
          </svg>
          {/* a */}
          <svg
            id="sale-2"
            width="149"
            height="168"
            viewBox="0 0 149 168"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M46.2647 120.459L31.8751 167.67H0.0153809L54.1516 0.642761H93.3984L148.21 167.67H115.124L99.8584 120.459H46.269H46.2647ZM94.7656 97.3968L81.4697 56.2445C78.2312 45.8923 75.4456 34.5319 72.8949 24.842H72.3395C69.8914 34.6387 67.3065 46.2042 64.3286 56.1377L51.3019 97.3968H94.7656Z" />
          </svg>
          {/* l */}
          <svg
            id="sale-3"
            width="101"
            height="168"
            viewBox="0 0 101 168"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.36499 0.642761H31.1993V142.07H100.571V167.67H0.36499V0.642761V0.642761Z" />
          </svg>
          {/* e */}
          <svg
            id="sale-4"
            width="103"
            height="168"
            viewBox="0 0 103 168"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M94.9041 93.5729H31.33V142.569H102.415V167.67H0.5V0.642761H98.6981V25.7434H31.3343V68.6859H94.9084V93.5729H94.9041Z" />
          </svg>
          {/* 黑 */}
          <svg
            id="sale-5"
            width="175"
            height="173"
            viewBox="0 0 175 173"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M174.948 118.257V128.674H0.443974V118.257H72.9988V99.0955H6.21179V88.6792H72.9988V70.0769H22.7675C19.5418 70.0769 16.8417 68.9917 14.6755 66.8213C12.5051 64.6509 11.42 61.955 11.42 58.7293V11.8476C11.42 8.62194 12.5051 5.92602 14.6755 3.75561C16.846 1.5852 19.5418 0.5 22.7675 0.5H152.996C156.218 0.5 158.918 1.5852 161.088 3.75561C163.259 5.92602 164.344 8.62621 164.344 11.8476V58.7293C164.344 61.955 163.259 64.6552 161.088 66.8213C158.918 68.9917 156.218 70.0769 152.996 70.0769H102.393V88.6792H169.552V99.0955H102.393V118.257H174.948ZM13.2784 139.278H42.673L29.8342 172.206H0.439697L13.2742 139.278H13.2784ZM72.9988 59.6521V10.9077H43.6043C42.8609 10.9077 42.2073 11.1854 41.6519 11.7451C41.0922 12.3048 40.8144 12.9542 40.8144 13.6976V56.858C40.8144 57.6014 41.0922 58.255 41.6519 58.8105C42.2116 59.3701 42.8609 59.6479 43.6043 59.6479H72.9988V59.6521ZM70.2089 53.1409H51.2307L43.7881 17.2352H62.7663L70.2089 53.1409ZM78.2069 139.278L89.3709 172.206H59.9764L48.8124 139.278H78.2069V139.278ZM120.996 139.278L132.159 172.206H102.765L91.6011 139.278H120.996V139.278ZM134.949 13.7019C134.949 12.9585 134.672 12.3048 134.112 11.7494C133.552 11.1897 132.903 10.912 132.159 10.912H102.393V59.6564H132.159C132.903 59.6564 133.557 59.3787 134.112 58.819C134.672 58.2593 134.949 57.6099 134.949 56.8665V13.7062V13.7019ZM105.743 53.1409L113.186 17.2352H132.164L124.721 53.1409H105.747H105.743ZM163.788 139.278L174.952 172.206H145.558L134.394 139.278H163.788V139.278Z" />
          </svg>
          {/* 五 */}
          <svg
            id="sale-6"
            width="176"
            height="169"
            viewBox="0 0 176 169"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M175.402 158.119V168.535H0.897949V158.119H41.0804L53.7312 76.6347H10.1991V66.2184H55.406L63.9637 10.9628H6.4778V0.546509H169.822V10.9628H93.3582L84.8005 66.2184H151.959C155.181 66.2184 157.881 67.3036 160.051 69.474C162.222 71.6444 163.307 74.3446 163.307 77.566V158.123H175.398L175.402 158.119ZM70.4749 158.119H133.912V79.4246C133.912 78.6812 133.635 78.0275 133.075 77.4721C132.515 76.9124 131.866 76.6347 131.122 76.6347H83.1256L70.4749 158.119V158.119Z" />
          </svg>
        </div>
      </div>

      {/* banner 輪播 */}
      <section className="banner">
        {swiperInit ? (
          <Swiper
            modules={[Autoplay, EffectFade]}
            slidesPerView="auto"
            speed={200}
            spaceBetween={20}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChangeTransitionStart={(swiper) => {
              animateActiveSlide(swiper);
            }}
            onSlideChangeTransitionEnd={() => {
              clearImgsProps();
            }}
          >
            {sliderData.map((slider) => (
              <SwiperSlide key={slider.id}>
                <a className="swiper-link block" href="">
                  {slider.images.map((img, index) => (
                    <picture
                      className={`slider-img block slider-img-${index + 1}`}
                      key={index}
                    >
                      <source srcSet={img.desktop} media="(min-width: 992px)" />
                      <img srcSet={img.mobile} />
                    </picture>
                  ))}
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <picture>
            <source srcSet={kvSliderPlacePc} media="(min-width: 992px)" />
            <img srcSet={kvSliderPlaceMb} />
          </picture>
        )}
      </section>
    </div>
  );
}

export default Banner;
