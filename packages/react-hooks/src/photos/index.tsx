import usePhoto from './usePhoto';

export type GraphPhoto = {
  id: string;
  name: string;
  filmIndex: string;
  image: string;
  createdAt: number;
};

export type SDKPhoto = {
  id: string;
  name: string;
  filmIndex: number;
  image: string;
  createdAt: Date;
};

export default { usePhoto };
