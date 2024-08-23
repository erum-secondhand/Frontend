/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCheckLoginStatus from '../services/authService';

function PasswordResetPage() {
  const isLoggedIn = useCheckLoginStatus(); // 로그인 상태 확인

  const navigate = useNavigate();

  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>('');

  const [isValidNewPassword, setIsValidNewPassword] = useState<boolean>(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);
  const [isCurrentPasswordSame, setIsCurrentPasswordSame] =
    useState<boolean>(true);

  // 현재 비밀번호  입력 이벤트 핸들러
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // 새로운 비밀번호 유효 검사 및 입력 이벤트 핸들러
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);

    // 비밀번호가 6자리가 넘는지 검사
    setIsValidNewPassword(e.target.value.length >= 6);

    // 새로운 비밀번호와 새로운 비밀번호 확인이 일치하는지 검사
    if (password === e.target.value) {
      setIsCurrentPasswordSame(true);
    } else {
      setIsCurrentPasswordSame(false);
    }
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

  // 로그인 상태 확인
  useEffect(() => {
    if (isLoggedIn !== null) {
      if (isLoggedIn) {
        window.scrollTo(0, 0);
      } else {
        alert('로그인을 해주세요.');
        navigate('/login');
      }
    }
  }, [isLoggedIn]);

  return (
    <div
      className="mx-auto box-content flex max-w-[1280px] flex-col items-center justify-center px-4 md:px-8 2xl:px-16"
      style={{ minHeight: 'calc(100vh - 70px)' }}
    >
      <div className="mx-auto my-auto flex flex-col items-center justify-center space-y-5 max-[767px]:w-full">
        <h1 className="text-3xl font-semibold">비밀번호 재설정</h1>
        <div className="relative mx-auto w-full overflow-hidden rounded-lg bg-white px-5 py-5 sm:w-[450px] sm:border sm:border-gray-300 sm:px-8">
          <div>
            <div className="flex min-h-[378px] flex-col space-y-4">
              {/* 현재 비밀번호 입력 */}
              <div className="flex shrink-0 grow basis-auto flex-col">
                <div className="mb-[12px]">
                  <span>현재 비밀번호</span>
                </div>
                <div className="block">
                  <input
                    type="password"
                    placeholder="현재 비밀번호 입력"
                    className="!border-1 box-border min-h-12 w-full appearance-none rounded-md border border-solid border-[#DADEE5] bg-white px-[16px] py-[12px] text-[14px] text-gray-950 placeholder-[#9CA3AF] transition duration-200 ease-in-out focus:border-amber-600 focus:bg-white focus:shadow md:px-5 lg:text-sm"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>
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
                  {isValidNewPassword &&
                    isCurrentPasswordSame &&
                    newPassword.length > 0 && (
                      <p className="my-2 text-xs text-rose-500">
                        현재 비밀번호와 다른 비밀번호를 입력해주세요.
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
                  >
                    비밀번호 변경
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

export default PasswordResetPage;
