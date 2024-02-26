/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';
import { FetchPostCards } from './dataType';

export const searchPostCardsState = atom<FetchPostCards[]>({
  key: 'searchPostCardsState',
  default: [],
});
