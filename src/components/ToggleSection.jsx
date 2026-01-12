// 元件說明: 判斷拉拉熊 id 有資料才開啟的區塊 (可輸入多筆 id)
// ex: <ToggleSection sectionId={[31,42]}>Foo</ToggleSection>
import { useEffect, useState } from 'react';

// stores
import { useLaLaStore1 } from '../stores/useLaLaStore';

// custom hooks & utils
import getDataById from '../utils/getDataById';

function ToggleSection({ sectionId, children }) {
  const { newPdData } = useLaLaStore1();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (sectionId.length !== 0) {
      const pdData = getDataById(newPdData, ...sectionId);
      setData(pdData);
    }
  }, [sectionId, newPdData]);

  // 是否上線
  // false: 無資料區塊照樣打開
  // true: 無資料區塊直接關閉
  const isOnline = import.meta.env.VITE_ISONLINE === 'true';

  if (!isOnline || (data && data.length > 0)) {
    return <>{children}</>;
  }
  return null;
}

export default ToggleSection;
