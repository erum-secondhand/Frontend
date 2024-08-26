/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../baseURL/baseURL';
import { SignIn } from '../dataType';

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);

  // 이메일 유효 검사 및 입력 이벤트 핸들러
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    // 이메일이 @tukorea.ac.kr 로 끝나는지 검사
    setIsValidEmail(e.target.value.endsWith('@tukorea.ac.kr'));
  };

  // 비밀번호 유효 검사 및 입력 이벤트 핸들러
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    // 비밀번호가 6자리가 넘는지 검사
    setIsValidPassword(e.target.value.length >= 6);
  };

  // 로그인 API 요청 함수
  const signInRequest = async () => {
    if (email && password) {
      try {
        await api.post<SignIn>(
          '/users/login',
          {
            email,
            password,
          },
          { withCredentials: true },
        );
        window.location.href = '/';
      } catch (e) {
        alert('이메일 또는 비밀번호를 잘못 입력했습니다.');
      }
    } else if (email.length <= 0) {
      alert('이메일을 입력하십시오.');
    } else if (password.length <= 0) {
      alert('비밀번호를 입력하십시오.');
    }
  };

  return (
    <div
      className="mx-auto box-content flex max-w-[1280px] flex-col items-center justify-center px-4 md:px-8 2xl:px-16"
      style={{ minHeight: 'calc(100vh - 70px)' }}
    >
      <div className="mx-auto my-auto flex flex-col items-center justify-center space-y-5 max-[767px]:w-full">
        <h1 className="text-3xl font-semibold">로그인</h1>
        <div className="relative mx-auto w-full overflow-hidden rounded-lg bg-white px-5 py-5 sm:w-[450px] sm:border sm:border-gray-300 sm:px-8">
          <div>
            <div className="flex min-h-[378px] flex-col space-y-4">
              {/* 이메일 입력 */}
              <div className="flex shrink-0 grow basis-auto flex-col">
                <div className="mb-[12px]">
                  <span>학교 이메일</span>
                </div>
                <div className="block">
                  <input
                    type="email"
                    placeholder="학교 이메일을 입력해주세요."
                    className={`!border-1 box-border min-h-12 w-full appearance-none rounded-md border border-solid ${isValidEmail ? 'border-[#DADEE5] focus:border-amber-600' : 'border-red-500 focus:border-amber-600'} bg-white px-[16px] py-[12px] text-[14px] text-gray-950 placeholder-[#9CA3AF] transition duration-200 ease-in-out focus:bg-white focus:shadow md:px-5 lg:text-sm`}
                    aria-invalid={!isValidEmail}
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {!isValidEmail && (
                    <p className="my-2 text-xs text-rose-500">
                      학교 이메일을 입력해주세요.
                    </p>
                  )}
                </div>
              </div>
              {/* 비밀번호 입력 */}
              <div className="flex shrink-0 grow basis-auto flex-col">
                <div className="mb-[12px]">
                  <span>비밀번호</span>
                </div>
                <div className="block">
                  <input
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    className={`!border-1 box-border min-h-12 w-full appearance-none rounded-md border border-solid ${isValidPassword ? 'border-[#DADEE5] focus:border-amber-600' : 'border-red-500 focus:border-amber-600'} bg-white px-[16px] py-[12px] text-[14px] text-gray-950 placeholder-[#9CA3AF] transition duration-200 ease-in-out focus:bg-white focus:shadow md:px-5 lg:text-sm`}
                    aria-invalid={!isValidPassword}
                    value={password}
                    onChange={handlePasswordChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        signInRequest();
                      }
                    }}
                  />
                  {!isValidPassword && (
                    <p className="my-2 text-xs text-rose-500">
                      6자리 이상 입력해주세요.
                    </p>
                  )}
                </div>
              </div>
              <div className="mx-auto flex items-center space-x-2 whitespace-nowrap sm:space-x-3">
                <span className="text-sm sm:text-base">회원이 아니십니까?</span>
                <span
                  className="cursor-pointer text-sm font-semibold text-green-600 hover:underline sm:text-base"
                  onClick={() => {
                    navigate('/register');
                  }}
                >
                  회원가입
                </span>
                <div className="flex h-4 w-[1px] bg-gray-400" />
                <span className="cursor-pointer text-sm font-semibold text-gray-800 hover:underline sm:text-base">
                  비밀번호 찾기
                </span>
              </div>
              {/* 로그인 버튼 */}
              <div className="w-full">
                <div className="my-6 flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-[#3dabe7] to-[#ffde01] p-[1px]">
                  <button
                    className="h-12 w-full rounded-3xl border border-transparent bg-white font-semibold md:h-14 md:text-lg"
                    type="button"
                    onClick={signInRequest}
                  >
                    로그인
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
