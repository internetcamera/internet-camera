import { useRef } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import InternetCamera from '../InternetCamera';
import { Photo } from '../types';

const useWalletPhotosForAddress = (
  address: string,
  graphURL?: string,
  swrOptions?: Partial<SWRConfiguration>
) => {
  const camera = useRef(new InternetCamera({ graphURL }));

  const {
    data: photos,
    error,
    mutate
  } = useSWR<{
    photosCreated: Photo[];
    photosOwned: Photo[];
  }>(
    [address, 'icdk-react-use-wallet-photos-for-address'],
    address => camera.current.getWalletPhotosForAddress(address),
    { revalidateOnMount: true, ...swrOptions }
  );

  return { photos, error, refresh: mutate };
};

export default useWalletPhotosForAddress;
