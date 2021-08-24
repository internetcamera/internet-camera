export type Film = {
  id: string;
  filmAddress: string;
  creator: Wallet;
  name: string;
  description: string;
  symbol: string;
  used: string;
  totalSupply: string;
  startTime: number;
  expireTime: number;
  photos: Photo[];
  wallets: WalletFilm[];
  tokenURI: string;
  factoryModel?: string;
  createdAt: number;
};

export type Photo = {
  id: string;
  tokenId: string;
  creator: Wallet;
  owner: Wallet;
  name: string;
  description: string;
  image: string;
  tokenURI: string;
  width: number;
  height: number;
  film: Film;
  filmIndex: number;
  createdAt: number;
};

export type TransferEvent = {
  id: string;
  type: 'FILM' | 'PHOTO';
  photo?: Photo;
  film?: Film;
  amount?: string;
  from: Wallet;
  to: Wallet;
  txHash: string;
  createdAt: number;
};

export type Wallet = {
  id: string;
  address: string;
  films: Film[];
  photosCreated: Photo[];
  photosOwned: Photo[];
  createdAt: number;
};

export type WalletFilm = {
  id: string;
  wallet: Wallet;
  film: Film;
  amount: string;
};
