// 元件說明:拉拉熊 store
import { create } from 'zustand';

// custom hooks & utils
import filterData from '../utils/filterData';

// fake data
import { mockLeftNavData, mockPdData } from '../constants';

function createLaLaStore(activityId) {
  return create((set) => ({
    newPdData: [],
    newNavData: {
      stickerImg: { url: '', imgSrc: '' },
      mainActiveUrl: '',
      otherLink: [],
    },
    getData: async () => {
      // [Del] API url
      // [Del] 內網時光機 path
      // 模擬取得資料
      await new Promise((resolve) => setTimeout(resolve, 500));

      set({
        newNavData: mockLeftNavData,
        newPdData: mockPdData,
      });
    },
  }));
}

export const useLaLaStore1 = createLaLaStore(import.meta.env.VITE_ACTIVE_ID);
