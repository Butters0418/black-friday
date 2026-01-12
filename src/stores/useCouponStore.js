// 元件說明:折價券 store
import { create } from 'zustand';

// fake data
import { mockCouponTopData, mockCouponBotData } from '../constants';

const useCouponStore = create((set, get) => ({
  couponLargeData: [],
  couponSmallData: [],

  getData: async () => {
    // 模擬取得資料
    await new Promise((resolve) => setTimeout(resolve, 500));
    set({
      couponLargeData: mockCouponTopData,
      couponSmallData: mockCouponBotData,
    });
  },

  // 2. 領取單張折價券
  clickCoupon: (couponId) => {
    const updatedLarge = get().couponLargeData.map((item) =>
      item.couponLalaPddata.discountPrice === couponId
        ? { ...item, couponClickState: true }
        : item,
    );

    const updatedSmall = get().couponSmallData.map((item) =>
      item.couponLalaPddata.discountPrice === couponId
        ? { ...item, couponClickState: true }
        : item,
    );

    set({
      couponLargeData: updatedLarge,
      couponSmallData: updatedSmall,
    });
  },

  // 3. 一次領全部
  clickAllCoupon: () => {
    const setAllTrue = (array) =>
      array.map((item) => ({ ...item, couponClickState: true }));

    set({
      couponLargeData: setAllTrue(get().couponLargeData),
      couponSmallData: setAllTrue(get().couponSmallData),
    });
  },
}));

export default useCouponStore;
