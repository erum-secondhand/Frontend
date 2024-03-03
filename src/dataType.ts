export type PostBookSell = {
  id: number;
  images: string[];
  title: string;
  publisher: string;
  grade: string;
  price: string;
  description: string;
  type: string;
  condition: string;
  kakaoLink: string;
  salesStatus: string;
  createAt: string;
  deleteAt: string | null;
  updateAt: string;
};

export type FetchPostCards = {
  id: number;
  imageUrls: string[];
  title: string;
  publisher: string;
  price: string;
  salesStatus: string;
};

export type BookDto = {
  id: number;
  imageUrls: string[];
  title: string;
  publisher: string;
  grade: string;
  price: string;
  description: string;
  type: string;
  condition: string;
  kakaoLink: string;
  salesStatus: string;
  createAt: string;
  deleteAt: string | null;
  updateAt: string;
};

export type FetchDetailPostCard = {
  bookDto: BookDto;
  userId: number;
};

export type SignUp = {
  id: number;
  email: string;
  password: string;
  name: string;
  studentId: string;
  major: string;
  createAt: string;
  deleteAt: string | null;
  updateAt: string;
};

export type SignIn = {
  id: number;
  message: string;
};

type UserPostCards = {
  id: number;
  imageUrls: string[];
  title: string;
  publisher: string;
  grade: string;
  price: string;
  description: string;
  type: string;
  condition: string;
  kakaoLink: string;
  salesStatus: string;
  createAt: string;
  updateAt: string;
  deleteAt: string | null;
};

export type FetchUserPostCards = {
  onSaleBooks: {
    books: UserPostCards[];
  };
  soldOutBooks: {
    books: UserPostCards[];
  };
};
