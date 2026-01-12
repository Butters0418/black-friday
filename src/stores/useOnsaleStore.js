// 元件說明:限時瘋搶 store
import { create } from 'zustand';

// packages
import dayjs from 'dayjs';

// constants
import { mockOnsaleData } from '../constants';

// 固定的四個時段
const TIME_SLOTS = ['10:00', '15:00', '21:00', '10:00'];

// 根據當前時間生成四組時段資料
function generateTimeSlots() {
  const now = dayjs();
  const currentHour = now.hour();
  const currentMinute = now.minute();

  // 計算當前時間點
  const currentTime = currentHour * 60 + currentMinute;

  // 時段對應的分鐘數
  const slot1000 = 10 * 60; // 600
  const slot1500 = 15 * 60; // 900
  const slot2100 = 21 * 60; // 1260

  let slots = [];

  // 判斷當前處於哪個時段
  if (currentTime < slot1000) {
    slots = [
      { time: '10:00', status: 'now', isToday: true },
      { time: '15:00', status: 'ready', isToday: true },
      { time: '21:00', status: 'ready', isToday: true },
      { time: '10:00', status: 'tomorrow', isToday: false },
    ];
  } else if (currentTime < slot1500) {
    slots = [
      { time: '10:00', status: 'now', isToday: true },
      { time: '15:00', status: 'ready', isToday: true },
      { time: '21:00', status: 'ready', isToday: true },
      { time: '10:00', status: 'tomorrow', isToday: false },
    ];
  } else if (currentTime < slot2100) {
    slots = [
      { time: '15:00', status: 'now', isToday: true },
      { time: '21:00', status: 'ready', isToday: true },
      { time: '10:00', status: 'tomorrow', isToday: false },
      { time: '15:00', status: 'tomorrow', isToday: false },
    ];
  } else {
    slots = [
      { time: '21:00', status: 'now', isToday: true },
      { time: '10:00', status: 'tomorrow', isToday: false },
      { time: '15:00', status: 'tomorrow', isToday: false },
      { time: '21:00', status: 'tomorrow', isToday: false },
    ];
  }

  // 每個時段的時間資訊
  return slots.map((slot) => {
    const baseDate = slot.isToday ? now : now.add(1, 'day');
    const [hour, minute] = slot.time.split(':').map(Number);
    const startTime = baseDate.hour(hour).minute(minute).second(0);

    // 結束時間
    let endTime;
    if (slot.time === '10:00') {
      endTime = startTime.hour(14).minute(59).second(59);
    } else if (slot.time === '15:00') {
      endTime = startTime.hour(20).minute(59).second(59);
    } else if (slot.time === '21:00') {
      endTime = startTime.add(1, 'day').hour(9).minute(59).second(59);
    }

    const dateStr = startTime.format('YYYYMMDD');
    const timeStr = slot.time;
    const slotStr = `${dateStr}${timeStr.replace(':', '')}`;

    return {
      slot: slotStr,
      date: dateStr,
      time: timeStr,
      status: slot.status,
      startTime: startTime.format('YYYY-MM-DD HH:mm:ss'),
      endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
    };
  });
}

// 商品亂數排列: 每個波段除第 1 品固定，其餘亂數排列
function sortData(data) {
  const newData = data.map((period) => {
    const firstPd = period.products[0];
    const otherPds = period.products.slice(1).sort(() => Math.random() - 0.5);
    const sortProducts = [firstPd, ...otherPds];
    // 替換 image src 小圖
    // const newProducts = sortProducts.map((pd, index) => {
    //   return { ...pd, image: `${pd.image}?width=320` };
    // });
    const newItem = {
      ...period,
      products: sortProducts,
    };
    return newItem;
  });
  return newData;
}

const useOnsaleStore = create((set) => ({
  // 瘋搶資料
  onsaleData: [],
  // 取得瘋搶資料
  getData: async () => {
    // 模擬取得資料
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 替 mockData 生四組時段的時間資訊
    const timeSlots = generateTimeSlots();

    // 套用到 mockData
    const dataWithTimeSlots = mockOnsaleData.map((periodData, index) => {
      const timeSlot = timeSlots[index];
      return {
        ...periodData,
        slot: timeSlot.slot,
        date: timeSlot.date,
        time: timeSlot.time,
        status: timeSlot.status,
        startTime: timeSlot.startTime,
        endTime: timeSlot.endTime,
      };
    });

    // 亂數排列商品
    const sortedData = sortData(dataWithTimeSlots);

    set({ onsaleData: sortedData });
  },
}));

export default useOnsaleStore;
