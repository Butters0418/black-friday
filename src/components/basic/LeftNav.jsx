// 左選單 : PC 為 LeftNavPc，手機為 FooterNav
import { useEffect, useState } from 'react';

// stores
import { useLaLaStore1 } from '../../stores/useLaLaStore';

// custom hooks & utils
import useWindowWidth from '../../hooks/useWindowWidth';
import getDataById from '../../utils/getDataById';

// components
import LeftNavPc from './LeftNavPc/LeftNavPc';
import FooterNavMb from './FooterNavMb/FooterNavMb';

function LeftNav() {
  const { newNavData, newPdData } = useLaLaStore1(); // 拉拉熊資料
  const [moreActive, setMoreActive] = useState([]); // 選單額外活動
  const ww = useWindowWidth();

  useEffect(() => {
    const idData = getDataById(newPdData, 684);
    idData.length !== 0 && setMoreActive(idData);
  }, [newPdData]);
  return (
    <>
      {ww > 766 ? (
        <LeftNavPc newNavData={newNavData} moreActive={moreActive} />
      ) : (
        <FooterNavMb newNavData={newNavData} moreActive={moreActive} />
      )}
    </>
  );
}

export default LeftNav;
