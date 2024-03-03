/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';

export type UserState = {
  isLoggedIn: boolean;
  user: {
    email: string;
    id: number;
    major: string;
    name: string;
    password: string;
    studentId: string;
  };
};

export const userState = atom<UserState>({
  key: 'userState',
  default: {
    isLoggedIn: false,
    user: {
      email: '',
      id: 0,
      major: '',
      name: '',
      password: '',
      studentId: '',
    },
  },
});
