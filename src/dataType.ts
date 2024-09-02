export type ChatMessage = {
  chatRoomId: number;
  personId: number;
  content: string;
};

export type FetchChatMessage = {
  chatRoom: {
    createAt: string;
    deleteAt: string | null;
    id: number;
    updateAt: string;
  };
  content: string;
  createAt: string;
  deleteAt: string | null;
  id: number;
  person: SignUp;
  updateAt: string;
};

export type ChatRoomResponse = {
  chatRoom: ChatRoom;
  messages: FetchChatMessage[];
};

export type ChatRoom = {
  id: number;
  createAt: string;
  updateAt: string;
  deleteAt: string | null;
  book: {
    id: number;
    createAt: string;
    updateAt: string;
    deleteAt: string | null;
    imageUrls: string;
    title: string;
    publisher: string;
    grade: string;
    price: string;
    description: string;
    type: string;
    condition: string;
    kakaoLink: string;
    salesStatus: string;
    userId: number;
  };
  seller: SignUp;
  buyer: SignUp;
};

export type FetchChatCards = {
  id: number;
  buyerId: number;
  buyerName: string;
  sellerId: number;
  sellerName: string;
  bookId: number;
  updatedAt: string;
  recentMessage: string;
};

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
