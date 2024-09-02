import { FetchPostCards } from '../dataType';
import { UserState } from '../userState';

export interface EmailAuthenticationResponse {
  message: string;
}

export interface EmailVerificationResponse {
  message: string;
}

export interface PasswordResetResponse {
  status: number;
  code: string;
  data: string;
}

export interface FetchPostCardsResponse {
  data: FetchPostCards[];
  page: number;
  pageSize: number;
  total: number;
}

export interface CheckLoginStatusResponse {
  status: number;
  code: string;
  data: UserState;
}

export interface LogOutResponse {
  status: number;
  code: string;
  data: string;
}
