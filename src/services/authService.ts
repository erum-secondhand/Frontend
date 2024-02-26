import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { userState } from '../userState';

const useCheckLoginStatus = () => {
  const setUser = useSetRecoilState(userState);

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users/status', {
        withCredentials: true,
      });
      // 로그인 상태일 때 사용자 정보를 Recoil 상태에 저장
      console.log(response.data);
      setUser({ isLoggedIn: true, userData: response.data });
    } catch (error) {
      // 로그인 상태가 아닐 때 Recoil 상태를 기본값으로 초기화
      setUser({ isLoggedIn: false, userData: { id: 0, message: '' } });
    }
  };

  return checkLoginStatus;
};

export default useCheckLoginStatus;
