// 判斷是否登入
import { useEffect, useState } from 'react';
import fetchJsonp from 'fetch-jsonp';

function useIsLogin() {
  const [isLogin, setIsLogin] = useState({
    memberLogin: 0,
    memberId: null,
    isDone: false,
  });
  // [Del] 判斷是否登入
  const checkLogin = async () => {};

  const getMemberId = async () => {};

  useEffect(() => {
    (async () => {
      const loginState = await checkLogin();
      if (loginState === 1) {
        const memberId = await getMemberId();
        setIsLogin({ memberLogin: 1, memberId: memberId, isDone: true });
      } else {
        setIsLogin({ memberLogin: 0, memberId: null, isDone: true });
      }
    })();
  }, []);

  return isLogin;
}

export default useIsLogin;
