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
