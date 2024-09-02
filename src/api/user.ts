import { FetchPostCards } from '../dataType';

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
