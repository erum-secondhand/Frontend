/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../baseURL/baseURL';

function PasswordResetPage() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState<number>(299);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  const [emailVerificationClicked, setEmailVerificationClicked] =
    useState<boolean>(false);
  const [isVerificationSuccessful, setIsVerificationSuccessful] =
    useState<boolean>(false);
  const [isCorrectVerificationCode, setIsCorrectVerificationCode] =
    useState<boolean>(false);

  const [isValideVericationCode, setIsValideVericationCode] =
    useState<boolean>(true);

  const [isPasswordResetSuccessful, setIsPasswordResetSuccessful] =
    useState<boolean>(false);

  const [verificationCode, setVerificationCode] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>('');

  const [isValidNewPassword, setIsValidNewPassword] = useState<boolean>(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);

  // 이메일 유효 검사 및 입력 이벤트 핸들러
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    // 이메일이 @tukorea.ac.kr 로 끝나는지 검사
    setIsValidEmail(e.target.value.endsWith('@tukorea.ac.kr'));
  };

  // 새로운 비밀번호 유효 검사 및 입력 이벤트 핸들러
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);

    // 비밀번호가 6자리가 넘는지 검사
    setIsValidNewPassword(e.target.value.length >= 6);
  };

  // 새로운 비밀번호 확인 유효 검사 및 입력 이벤트 핸들러
  const handleNewPasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewPasswordConfirm(e.target.value);

    if (newPassword !== e.target.value) {
      setIsPasswordMatch(false);
    } else if (newPassword === e.target.value) {
      setIsPasswordMatch(true);
    }
  };

  // 인증코드 유효 검사 및 입력 이벤트 핸들러
  const handleVerificationCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);

    // 인증코드가 6자리인지 검사
    setIsValideVericationCode(e.target.value.length === 6);
  };

  // 이메일 인증코드 API 요청
  const emailAuthentication = async () => {
    if (isValidEmail && email.length > 0) {
      try {
        alert('인증번호를 전송했습니다!');
        setTimerActive(true);
        setTimer(299);
        setEmailVerificationClicked(true);
        const response = await api.post<string>('auth/send', {
          email,
        });
        if (response.status === 200) {
          setIsVerificationSuccessful(true);
        }
      } catch (e) {
        alert('올바른 이메일을 입력해주세요.');
      }
    } else {
      alert('올바른 이메일을 입력해주세요.');
    }
  };

  // 이메일 검증 API 요청
  const emailVerification = async () => {
    if (verificationCode.length === 6) {
      try {
        const response = await api.post<string>('auth/verify', {
          email,
          verificationCode,
        });
        if (response.status === 200) {
          setIsCorrectVerificationCode(true);
          setEmailVerificationClicked(false);
        }
      } catch (e) {
        alert('인증번호를 다시 확인해주세요.');
      }
    }
  };

  // 비밀번호 재설정 API 요청
  const passwordReset = async () => {
    if (newPassword.length >= 6 && newPassword === newPasswordConfirm) {
      try {
        const response = await api.put<string>('users/reset-password', {
          email,
          newPassword,
        });
        if (response.status === 200) {
          alert('비밀번호가 변경되었습니다.');
          setIsPasswordResetSuccessful(true);
          navigate('/login');
        }
        console.log(response.data);
      } catch (e) {
        alert('비밀번호 변경에 실패했습니다.');
      }
    }
  };

  // 타이머 카운트다운
  useEffect(() => {
    let interval: number | null = null; // interval 타입을 number | null로 지정
    if (timerActive && timer > 0) {
      interval = window.setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setTimerActive(false);
      alert('인증 시간이 만료되었습니다.');
    }
    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [timer, timerActive]);

  // 타이머를 MM:SS 형식으로 표시
  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div
      className="mx-auto box-content flex max-w-[1280px] flex-col items-center justify-center px-4 md:px-8 2xl:px-16"
      style={{ minHeight: 'calc(100vh - 70px)' }}
    >
      <div className="mx-auto my-auto flex flex-col items-center justify-center space-y-5 max-[767px]:w-full">
        <h1 className="text-3xl font-semibold">비밀번호 재설정</h1>
        <div className="relative mx-auto w-full overflow-hidden rounded-lg bg-white px-5 py-5 sm:w-[450px] sm:border sm:border-gray-300 sm:px-8">
          <div>
            <div className="flex h-fit flex-col space-y-4 sm:min-h-[378px]">
              {/* 현재 비밀번호 입력 */}
              <div className="flex shrink-0 grow basis-auto flex-col">
                <div className="mb-[12px]">
                  <span>학교 이메일</span>
                </div>
                <div className="block">
                  <input
                    type="email"
                    placeholder="example@tukorea.ac.kr"
                    className={`!border-1 box-border min-h-12 w-full appearance-none rounded-md border border-solid ${isValidEmail ? 'border-[#DADEE5] focus:border-amber-600' : 'border-red-500 focus:border-amber-600'} bg-white px-[16px] py-[12px] text-[14px] text-gray-950 placeholder-[#9CA3AF] transition duration-200 ease-in-out focus:bg-white focus:shadow md:px-5 lg:text-sm`}
                    value={email}
                    onChange={handleEmailChange}
                    disabled={isCorrectVerificationCode}
                  />
                  {!isValidEmail && (
                    <p className="my-2 text-xs text-rose-500">
                      학교 이메일을 입력해주세요.
                    </p>
                  )}
                </div>
              </div>
              {!isCorrectVerificationCode && (
                <button
                  type="button"
                  className="mt-3 h-9 w-full rounded-md bg-gray-300 text-sm font-semibold"
                  onClick={emailAuthentication}
                >
                  {emailVerificationClicked && isVerificationSuccessful
                    ? '인증번호 재발급'
                    : '이메일 인증'}
                </button>
              )}
              {/* 인증코드 입력 */}
              {emailVerificationClicked && (
                <div className="mt-3 block">
                  <div className="relative flex items-center justify-between">
                    <input
                      type="text"
                      placeholder="인증코드"
                      className={`!border-1 box-border min-h-12 w-full appearance-none rounded-md border border-solid ${isValideVericationCode ? 'border-[#DADEE5] focus:border-amber-600' : 'border-red-500 focus:border-amber-600'} bg-white px-[16px] py-[12px] text-[14px] text-gray-950 placeholder-[#9CA3AF] transition duration-200 ease-in-out focus:bg-white focus:shadow md:px-5 lg:text-sm`}
                      aria-invalid={!isValideVericationCode}
                      value={verificationCode}
                      onChange={handleVerificationCode}
                      maxLength={6}
                    />
                    <span className="absolute right-0 my-auto mr-5 text-sm font-medium text-gray-400">
                      {formatTime()}
                    </span>
                  </div>
                  {!isValideVericationCode && (
                    <p className="my-2 text-xs text-rose-500">
                      6자리 인증코드를 입력해주세요.
                    </p>
                  )}
                  <button
                    type="button"
                    className="mt-3 h-9 w-full rounded-md bg-gray-300 text-sm font-semibold"
                    onClick={emailVerification}
                  >
                    다음
                  </button>
                </div>
              )}
              {isCorrectVerificationCode && (
                <>
                  {/* 새로운 비밀번호 입력 */}
                  <div className="flex shrink-0 grow basis-auto flex-col">
                    <div className="mb-[12px]">
                      <span>새로운 비밀번호</span>
                    </div>
                    <div className="block">
                      <input
                        type="password"
                        placeholder="새로운 비밀번호 입력"
                        className={`!border-1 box-border min-h-12 w-full appearance-none rounded-md border border-solid ${isValidNewPassword ? 'border-[#DADEE5] focus:border-amber-600' : 'border-red-500 focus:border-amber-600'} bg-white px-[16px] py-[12px] text-[14px] text-gray-950 placeholder-[#9CA3AF] transition duration-200 ease-in-out focus:bg-white focus:shadow md:px-5 lg:text-sm`}
                        aria-invalid={!isValidNewPassword}
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                      />
                      {!isValidNewPassword && (
                        <p className="my-2 text-xs text-rose-500">
                          6자리 이상 입력해주세요.
                        </p>
                      )}
                    </div>
                  </div>
                  {/* 새로운 비밀번호 확인 */}
                  <div className="flex shrink-0 grow basis-auto flex-col">
                    <div className="mb-[12px]">
                      <span>새로운 비밀번호 확인</span>
                    </div>
                    <div className="block">
                      <input
                        type="password"
                        placeholder="새로운 비밀번호 확인"
                        className={`!border-1 box-border min-h-12 w-full appearance-none rounded-md border border-solid ${isPasswordMatch ? 'border-[#DADEE5] focus:border-amber-600' : 'border-red-500 focus:border-amber-600'} bg-white px-[16px] py-[12px] text-[14px] text-gray-950 placeholder-[#9CA3AF] transition duration-200 ease-in-out focus:bg-white focus:shadow md:px-5 lg:text-sm`}
                        aria-invalid={!isPasswordMatch}
                        value={newPasswordConfirm}
                        onChange={handleNewPasswordConfirmChange}
                      />
                      {!isPasswordMatch && (
                        <p className="my-2 text-xs text-rose-500">
                          비밀번호가 일치하지 않습니다.
                        </p>
                      )}
                    </div>
                  </div>
                  {/* 비밀번호 변경 버튼 */}
                  <div className="w-full">
                    <div className="my-8 flex w-full justify-center rounded-3xl bg-gradient-to-r from-[#3dabe7] to-[#ffde01] p-[1px]">
                      <button
                        className="h-12 w-full rounded-3xl border border-transparent bg-white font-semibold md:h-14 md:text-lg"
                        type="button"
                        onClick={passwordReset}
                      >
                        비밀번호 변경
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordResetPage;
