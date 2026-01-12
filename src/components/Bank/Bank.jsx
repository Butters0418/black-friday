// react 相關
import { useState, useEffect, forwardRef } from 'react';

// stores
import { useLaLaStore1 } from '../../stores/useLaLaStore';

// custom hooks & utils
import getDataById from '../../utils/getDataById';
import formatPriceText from '../../utils/formatPriceText';

const Bank = forwardRef((_, ref) => {
  const newPdData = useLaLaStore1((state) => state.newPdData);
  const [bankData, setBankData] = useState([]);
  const [bankData2, setBankData2] = useState([]);
  const [mainProductData, setMainProductData] = useState([]);

  useEffect(() => {
    const bankIdData = getDataById(newPdData, 31);
    bankIdData.length !== 0 && setBankData(bankIdData);

    const bank2IdData = getDataById(newPdData, 42);
    bank2IdData.length !== 0 && setBankData2(bank2IdData);

    const mainProductIdData = getDataById(newPdData, 53);
    mainProductIdData.length !== 0 && setMainProductData(mainProductIdData);
  }, [newPdData]);
  return (
    <section
      className="pb-5 sm:pb-10 md:pb-20"
      ref={ref}
      id="bank"
      data-title="銀行優惠"
    >
      {/* bank 1 */}
      {bankData.length > 0 && (
        <div className="container-bank mx-auto grid grid-cols-4">
          {bankData.map((item) => (
            <a
              key={item.id}
              href={item.url}
              className="col-span-2 block lg:col-span-1"
            >
              <img src={item.imgSrc} alt={item.productName} />
            </a>
          ))}
        </div>
      )}

      {/* bank 2 */}
      {bankData2.length > 0 && (
        <div className="container-bank mx-auto grid grid-cols-3">
          {bankData2
            .filter((_, index) => index % 2 === 0)
            .map((item, pairIndex) => {
              const pcImageIndex = pairIndex * 2;
              const mbImageIndex = pcImageIndex + 1;
              return (
                <a key={item.id} href={item.url} className="col-span-1 block">
                  <picture>
                    <source
                      srcSet={bankData2[pcImageIndex].imgSrc}
                      media="(min-width: 992px)"
                    />
                    <img
                      src={bankData2[mbImageIndex]?.imgSrc}
                      alt={bankData2[mbImageIndex]?.productName}
                    />
                  </picture>
                </a>
              );
            })}
        </div>
      )}

      {/* main products 8 */}
      {mainProductData.length > 0 && (
        <div className="container-mainPd mx-auto grid grid-cols-4">
          {mainProductData.map((product) => (
            <a
              key={product.id}
              href={product.url}
              className="col-span-2 block lg:col-span-1"
            >
              <img src={product.imgSrc} alt={product.productName} />
              <div className="mainPd-text">
                <div className="mainPd-info">
                  <p className="mainPd-name">{product.productName}</p>
                  <p className="mainPd-title">{product.productTitle}</p>
                </div>
                <p
                  className="mainPd-price"
                  dangerouslySetInnerHTML={{
                    __html: formatPriceText(product.discountPrice),
                  }}
                />
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
});

export default Bank;
