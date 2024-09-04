/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';

export type UserState = {
  isLoggedIn: boolean;
  email: string;
  id: number;
  major: string;
  name: string;
  studentId: string;
};

export const userState = atom<UserState>({
  key: 'userState',
  default: {
    isLoggedIn: false,
    email: '',
    id: 0,
    major: '',
    name: '',
    studentId: '',
  },
});
