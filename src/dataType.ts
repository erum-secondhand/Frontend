export type PostBookSell = {
  id: number;
  images: string[];
  title: string;
  publisher: string;
  grade: string;
  price: string;
  description: string;
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

export type FetchDetailPostCard = {
  id: number;
  imageUrls: string[];
  title: string;
  publisher: string;
  grade: string;
  price: string;
  description: string;
  condition: string;
  kakaoLink: string;
  salesStatus: string;
  createAt: string;
  deleteAt: string | null;
  updateAt: string;
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
  condition: string;
  kakaoLink: string;
  salesStatus: string;
  createAt: string;
  updateAt: string;
  deleteAt: string | null;
};

export type FetchUserPostCards = {
  onSalebooks: {
    books: UserPostCards[];
  };
  soldOutBooks: {
    books: UserPostCards[];
  };
};
