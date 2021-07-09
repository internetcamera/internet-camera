import { useRef } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import InternetCamera from '../InternetCamera';
import { Photo } from '../types';

const usePhoto = (
  tokenId: string,
  graphURL?: string,
  swrOptions?: Partial<SWRConfiguration>
) => {
  const camera = useRef(new InternetCamera({ graphURL }));
  const {
    data: photo,
    error,
    mutate
  } = useSWR<Photo>(
    [tokenId, 'icdk-react-use-photo'],
    tokenId => camera.current.getPhoto(tokenId),
    { revalidateOnMount: true, ...swrOptions }
  );
  return { photo, error, refresh: mutate };
};

export default usePhoto;
