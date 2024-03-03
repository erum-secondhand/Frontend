/* eslint-disable no-console */
import { useSetRecoilState } from 'recoil';
import api from '../baseURL/baseURL';
import { UserState, userState } from '../userState';

const useCheckLoginStatus = () => {
  const setUser = useSetRecoilState(userState);

  const checkLoginStatus = async () => {
    try {
      const response = await api.get<UserState>('/users/status', {
        withCredentials: true,
      });
      // 로그인 상태일 때 사용자 정보를 Recoil 상태에 저장
      console.log(response.data);
      setUser({
        isLoggedIn: response.data.isLoggedIn,
        user: response.data.user,
      });
    } catch (error) {
      // 로그인 상태가 아닐 때 Recoil 상태를 기본값으로 초기화
      setUser({
        isLoggedIn: false,
        user: {
          email: '',
          id: 0,
          major: '',
          name: '',
          password: '',
          studentId: '',
        },
      });
    }
  };

  return checkLoginStatus;
};

export default useCheckLoginStatus;
