/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import api from '../baseURL/baseURL';
import { UserState, userState } from '../userState';

const useCheckLoginStatus = () => {
  const setUser = useSetRecoilState<UserState>(userState);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // 로그인 상태 확인하는 함수
  const checkLoginStatus = async () => {
    try {
      const response = await api.get<UserState>('/users/status', {
        withCredentials: true,
      });
      // 로그인 상태일 때 사용자 정보를 Recoil 상태에 저장
      setUser({
        isLoggedIn: response.data.isLoggedIn,
        user: response.data.user,
      });
      setIsLoggedIn(response.data.isLoggedIn);
    } catch (error) {
      // 로그인 상태가 아닐 때 Recoil 상태를 기본값으로 초기화
      setUser({
        isLoggedIn: false,
        user: {
          email: '',
          id: 0,
          major: '',
          name: '',
          studentId: '',
        },
      });
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 로그인 상태 확인
    checkLoginStatus();
  }, []);

  return isLoggedIn;
};

export default useCheckLoginStatus;
