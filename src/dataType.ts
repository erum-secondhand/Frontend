export type PostBookSell = {
  images: File[];
  title: string;
  publisher: string;
  grade: string;
  price: string;
  description: string;
  condition: string;
  kakaoLink: string;
};

export type FetchPostCards = {
  id: number;
  imageUrls: string[];
  title: string;
  publisher: string;
  price: string;
};

export type FetchDetailPostCard = {
  createdAt: Date;
  updateAt: Date;
  deletedAt: Date;
  id: number;
  imageUrls: string[];
  title: string;
  publisher: string;
  grade: string;
  price: string;
  description: string;
  condition: string;
  kakaoLink: string;
};
