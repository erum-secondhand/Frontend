import { FetchPostCards } from './dataType';
import { atom } from 'recoil';

export const searchPostCardsState = atom<FetchPostCards[]>({
  key: 'searchPostCardsState',
  default: [],
});
