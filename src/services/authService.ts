/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import api from '../baseURL/baseURL';
import { UserState, userState } from '../userState';
import { CheckLoginStatusResponse } from '../api/user';

const defaultUserState: UserState = {
  isLoggedIn: false,
  email: '',
  id: 0,
  major: '',
  name: '',
  studentId: '',
};

const useCheckLoginStatus = () => {
  const setUser = useSetRecoilState<UserState>(userState);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // 로그인 상태 확인하는 함수
  const checkLoginStatus = async () => {
    try {
      const response = await api.get<CheckLoginStatusResponse>(
        '/users/status',
        {
          withCredentials: true,
        },
      );
      if (response.data.status === 200) {
        // 로그인 상태일 때 사용자 정보를 Recoil 상태에 저장
        setUser({
          isLoggedIn: response.data.data.isLoggedIn,
          email: response.data.data.email,
          id: response.data.data.id,
          major: response.data.data.major,
          name: response.data.data.name,
          studentId: response.data.data.studentId,
        });
        setIsLoggedIn(response.data.data.isLoggedIn);
      } else {
        // 로그인 상태가 아닐 때 Recoil 상태를 기본값으로 초기화
        setUser(defaultUserState);
        setIsLoggedIn(false);
      }
    } catch (error) {
      // 로그인 상태가 아닐 때 Recoil 상태를 기본값으로 초기화
      setUser(defaultUserState);
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
