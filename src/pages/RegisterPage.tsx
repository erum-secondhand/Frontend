/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../baseURL/baseURL';
import { SignUp } from '../dataType';

function RegisterPage() {
  const navigate = useNavigate();

  const [timer, setTimer] = useState<number>(299);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [emailVerificationClicked, setEmailVerificationClicked] =
    useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [studentId, setStudentId] = useState<string>('');
  const [selectedMajor, setSelectedMajor] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');

  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
  const [isValidStudentId, setIsValidStudentId] = useState<boolean>(true);
  const [isValideVericationCode, setIsValideVericationCode] =
    useState<boolean>(true);

  const [isVerificationSuccessful, setIsVerificationSuccessful] =
    useState<boolean>(false);

  // 이름 입력 이벤트 핸들러
  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setUserName(value);
  };

  // 학번 유효 검사 및 입력 이벤트 핸들러
  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentId(e.target.value);

    // 학번이 10자리 및 20으로 시작하는지 검사
    setIsValidStudentId(
      e.target.value.startsWith('20') && e.target.value.length === 10,
    );
  };

  // 전공 선택 입력 이벤트 핸들러
  const handleMajorClick = (major: string) => {
    // 이미 선택된 학년을 클릭하면 선택 취소
    if (selectedMajor === major) {
      setSelectedMajor('');
    } else {
      setSelectedMajor(major);
    }
  };

  // 이메일 유효 검사 및 입력 이벤트 핸들러
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    // 이메일이 @tukorea.ac.kr 로 끝나는지 검사
    setIsValidEmail(e.target.value.endsWith('@tukorea.ac.kr'));
  };

  // 인증코드 유효 검사 및 입력 이벤트 핸들러
  const handleVerificationCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);

    // 인증코드가 6자리인지 검사
    setIsValideVericationCode(e.target.value.length === 6);
  };

  // 비밀번호 유효 검사 및 입력 이벤트 핸들러
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    // 비밀번호가 6자리가 넘는지 검사
    setIsValidPassword(e.target.value.length >= 6);
  };

  // 이메일 인증코드 API 요청
  const emailAuthentication = async () => {
    if (isValidEmail && email.length > 0) {
      try {
        alert('인증번호를 전송했습니다!');
        setTimerActive(true);
        setTimer(299);
        setEmailVerificationClicked(true);
        const response = await api.post<string>('users/verify', {
          email,
        });
        console.log(response.data);
        if (response.status === 200) {
          setIsVerificationSuccessful(true);
        }
      } catch (e) {
        console.log(e);
        alert('올바른 이메일을 입력해주세요.');
      }
    } else {
      alert('올바른 이메일을 입력해주세요.');
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

  // 회원가입 API 요청
  const signUp = async () => {
    if (
      email &&
      password &&
      userName &&
      studentId &&
      selectedMajor &&
      verificationCode
    ) {
      try {
        const response = await api.post<SignUp>('/users/register', {
          email,
          password,
          name: userName,
          studentId,
          major: selectedMajor,
          verificationCode,
        });
        console.log(response.data);
        if (response.status === 201) {
          navigate('/login');
        }
      } catch (e: any) {
        console.log(e);
        if (e.response && e.response.status === 409) {
          alert('이미 존재하는 계정입니다.');
        } else if (e.response && e.response.status === 400) {
          alert('인증번호가 일치하지 않습니다.');
        } else {
          alert('에러 : 학생회에게 문의해주세요.');
        }
      }
    } else {
      alert('모든 칸을 입력해주세요.');
    }
  };

  return (
    <div className="mx-auto box-content flex min-h-[100vh] max-w-[1280px] flex-col items-center justify-center px-4 md:px-8 2xl:px-16">
      <div className="mx-auto my-auto mt-4 flex flex-col items-center justify-center space-y-5 max-[767px]:w-full">
        <h1 className="text-3xl font-semibold">회원가입</h1>
        <div className="relative mx-auto w-full overflow-hidden rounded-lg bg-white px-5 py-5 sm:w-[450px] sm:border sm:border-gray-300 sm:px-8">
          <div>
            <div className="flex min-h-[578px] flex-col space-y-4">
              {/* 이름 입력 */}
              <div className="flex shrink-0 grow basis-auto flex-col">
                <div className="mb-[12px]">
                  <span>이름</span>
                </div>
                <div className="block">
                  <input
                    type="text"
                    placeholder="이름을 입력해주세요."
                    className="!border-1 box-border min-h-12 w-full appearance-none rounded-md border border-solid border-[#DADEE5] bg-white px-[16px] py-[12px] text-[14px] text-gray-950 placeholder-[#9CA3AF] transition duration-200 ease-in-out focus:border-amber-600 focus:bg-white focus:shadow md:px-5 lg:text-sm"
                    value={userName}
                    onChange={handleUserNameChange}
                  />
                </div>
              </div>
              {/* 학번 입력 */}
              <div className="flex shrink-0 grow basis-auto flex-col">
                <div className="mb-[12px]">
                  <span>학번</span>
                </div>
                <div className="block">
                  <input
                    type="string"
                    placeholder="학번을 입력해주세요."
                    className={`!border-1 box-border min-h-12 w-full appearance-none rounded-md border border-solid ${isValidStudentId ? 'border-[#DADEE5] focus:border-amber-600' : 'border-red-500 focus:border-amber-600'} bg-white px-[16px] py-[12px] text-[14px] text-gray-950 placeholder-[#9CA3AF] transition duration-200 ease-in-out focus:bg-white focus:shadow md:px-5 lg:text-sm`}
                    aria-invalid={!isValidStudentId}
                    value={studentId}
                    onChange={handleStudentIdChange}
                  />
                  {!isValidStudentId && (
                    <p className="my-2 text-xs text-rose-500">
                      학번을 정확히 입력해주세요.
                    </p>
                  )}
                </div>
              </div>
              {/* 전공 선택 */}
              <div className="flex shrink-0 grow basis-auto flex-col">
                <div className="mb-[12px]">
                  <span>전공</span>
                </div>
                <div className="flex h-14 w-full overflow-hidden rounded-md border border-solid border-gray-300 text-[13px] font-medium">
                  {['컴퓨터공학전공', '소프트웨어전공'].map(
                    (major, index, array) => (
                      <button
                        key={index}
                        className={`w-1/2 py-3 md:text-sm ${selectedMajor === major ? 'bg-gray-200' : ''} ${index !== array.length - 1 ? 'border-r border-gray-300' : ''}`}
                        type="button"
                        onClick={() => handleMajorClick(major)}
                      >
                        {major}
                      </button>
                    ),
                  )}
                </div>
              </div>
              {/* 이메일 입력 */}
              <div className="flex shrink-0 grow basis-auto flex-col">
                <div className="mb-[12px]">
                  <span>학교 이메일</span>
                </div>
                <div className="block">
                  <input
                    type="email"
                    placeholder="example@tukorea.ac.kr"
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
                <button
                  type="button"
                  className="mt-3 h-9 w-full rounded-md bg-gray-300 text-sm font-semibold"
                  onClick={emailAuthentication}
                >
                  {emailVerificationClicked && isVerificationSuccessful
                    ? '인증번호 재발급'
                    : '이메일 인증'}
                </button>
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
                  </div>
                )}
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
                  />
                  {!isValidPassword && (
                    <p className="my-2 text-xs text-rose-500">
                      6자리 이상 입력해주세요.
                    </p>
                  )}
                </div>
              </div>
              {/* 회원가입 제출 버튼 */}
              <div className="w-full">
                <div className="my-8 flex w-full justify-center rounded-3xl bg-gradient-to-r from-[#3dabe7] to-[#ffde01] p-[1px]">
                  <button
                    className="h-12 w-full rounded-3xl border border-transparent bg-white font-semibold md:h-14 md:text-lg"
                    type="button"
                    onClick={() => {
                      signUp();
                    }}
                  >
                    회원가입
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

export default RegisterPage;
