// react 相關
import { useState, useEffect } from 'react';

// swiper 相關
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

// stores
import { useLaLaStore1 } from '../../stores/useLaLaStore';

// custom hooks & utils
import getDataById from '../../utils/getDataById';
import formatPriceText from '../../utils/formatPriceText';

// assets
import { commonArrowR } from '../../assets/layout';

function SubSlider() {
  const newPdData = useLaLaStore1((state) => state.newPdData);
  const [sliderGroup1, setSliderGroup1] = useState([]);
  const [sliderGroup2, setSliderGroup2] = useState([]);
  const [sliderGroup3, setSliderGroup3] = useState([]);
  const [sliderGroup4, setSliderGroup4] = useState([]);

  // pagination 大標
  const bulletText = [
    '幫寶<br>適1',
    '博士<br>倫1',
    '幫寶<br>適2',
    '博士<br>倫2',
  ];

  useEffect(() => {
    const group1Data = getDataById(newPdData, 64);
    group1Data.length !== 0 && setSliderGroup1(group1Data);

    const group2Data = getDataById(newPdData, 220);
    group2Data.length !== 0 && setSliderGroup2(group2Data);

    const group3Data = getDataById(newPdData, 231);
    group3Data.length !== 0 && setSliderGroup3(group3Data);

    const group4Data = getDataById(newPdData, 242);
    group4Data.length !== 0 && setSliderGroup4(group4Data);
  }, [newPdData]);

  const renderSlide = (slideData) => {
    if (slideData.length === 0) return null;

    const pcBanner = slideData[0];
    const mbBanner = slideData[1];
    const products = slideData.slice(2);

    return (
      <>
        {/* first banner */}
        <a className="pd-first block" href={pcBanner?.url}>
          <picture>
            <source srcSet={pcBanner?.imgSrc} media="(min-width: 992px)" />
            <img src={mbBanner?.imgSrc} alt={pcBanner?.productName} />
          </picture>
        </a>
        {/* other pds */}
        <div className="pd-container grid grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="col-pd col-span-2 xl:col-span-1">
              <a href={product.url} className="block">
                <p className="pd-title">{product.productTitle}</p>
                <img src={product.imgSrc} alt={product.productName} />
                <h4>{product.productName}</h4>
                {product.marketPrice && (
                  <p className="pd-marketPrice">${product.marketPrice}</p>
                )}

                <h5 className="pd-discountPrice">
                  <span className="sale">SALE</span>

                  <p
                    dangerouslySetInnerHTML={{
                      __html: formatPriceText(product.discountPrice),
                    }}
                  />
                </h5>
              </a>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <section id="subSlider" data-title="強打熱賣">
      <div className="subSlider-container mx-auto">
        <div className="swiper-pagination" slot="container-start"></div>
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          pagination={{
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: (index, className) => {
              return `<div class="${className}"><img src="${commonArrowR}" />${bulletText[index]}</div>`;
            },
          }}
          className="subSlider-swiper"
        >
          {sliderGroup1.length > 0 && (
            <SwiperSlide>{renderSlide(sliderGroup1)}</SwiperSlide>
          )}
          {sliderGroup2.length > 0 && (
            <SwiperSlide>{renderSlide(sliderGroup2)}</SwiperSlide>
          )}
          {sliderGroup3.length > 0 && (
            <SwiperSlide>{renderSlide(sliderGroup3)}</SwiperSlide>
          )}
          {sliderGroup4.length > 0 && (
            <SwiperSlide>{renderSlide(sliderGroup4)}</SwiperSlide>
          )}
        </Swiper>
      </div>
    </section>
  );
}

export default SubSlider;
