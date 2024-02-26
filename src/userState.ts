/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';
import { SignIn } from './dataType';

type UserState = {
  isLoggedIn: boolean;
  userData: SignIn;
};

export const userState = atom<UserState>({
  key: 'userState',
  default: { isLoggedIn: false, userData: { id: 0, message: '' } },
});
