// /* eslint-disable no-console */
// /* eslint-disable no-alert */
// import { useEffect, useState } from 'react';
// import { useRecoilValue } from 'recoil';
// import { useNavigate } from 'react-router-dom';
// import { userState } from '../userState';
// import PostCard from '../components/PostCard';
// import api from '../baseURL/baseURL';

// function MyPage() {
//   const navigate = useNavigate();

//   const [userPostCardData, setUserPostCardData] = useState<
//     FetchUserPostCards[]
//   >;

//   const userStateValue = useRecoilValue(userState);

//   // 사용자가 등록한 서적 조회 API 요청
//   const fetchUserPostCards = async () => {
//     try {
//       const response = await api.get<FetchUserPostCards[]>('엔드포인트');
//       console.log(response.data);
//       setUserPostCardData(response.data);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   useEffect(() => {
//     if (userStateValue.isLoggedIn) {
//       fetchUserPostCards();
//       window.scrollTo(0, 0);
//     } else {
//       alert('로그인을 해주세요.');
//       navigate('/login');
//     }
//   });

//   return (
//     <section className="mx-auto mt-5 flex w-full flex-col items-start sm:w-[599px]">
//       <div className="flex w-full items-center gap-9 bg-gray-200 px-5 py-9">
//         <div className="flex flex-col items-start space-y-4 font-Pretendard text-xl">
//           <span className="">이름</span>
//           <span className="">학번</span>
//           <span className="">전공</span>
//           <span className="">이메일</span>
//         </div>
//         <div className="flex flex-col items-start space-y-4 font-Pretendard text-xl">
//           <span className="">{userStateValue.user.name}</span>
//           <span className="">{userStateValue.user.studentId}</span>
//           <span className="">{userStateValue.user.major}</span>
//           <span className="">{userStateValue.user.email}</span>
//         </div>
//       </div>
//       {/* 판매중인 서적 */}
//       <div className="flex w-full">
//         <span className="mx-auto my-7 font-Pretendard text-2xl font-semibold md:text-3xl">
//           판매중인 서적
//         </span>
//         {/* 판매중인 포스트카드 */}
//         <div className="mx-auto my-0 mt-2 flex w-full flex-wrap justify-between text-left md:w-[730px]">
//           {userPostCardData.map((post) => (
//             <PostCard
//               key={post.id}
//               id={post.id}
//               imageUrls={post.imageUrls}
//               title={post.title}
//               publisher={post.publisher}
//               price={post.price}
//             />
//           ))}
//         </div>
//       </div>
//       {/* 판매완료 서적 */}
//       <div className="flex w-full">
//         <span className="mx-auto my-7 font-Pretendard text-2xl font-semibold md:text-3xl">
//           판매완료
//         </span>
//         {/* 판매완료 포스트카드 */}
//         <div className="mx-auto my-0 mt-2 flex w-full flex-wrap justify-between text-left md:w-[730px]">
//           {userPostCardData.map((post) => (
//             <PostCard
//               key={post.id}
//               id={post.id}
//               imageUrls={post.imageUrls}
//               title={post.title}
//               publisher={post.publisher}
//               price={post.price}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default MyPage;
