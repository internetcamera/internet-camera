import { useRef } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import InternetCamera from '../InternetCamera';

const useWalletFilmForAddress = (
  address: string,
  graphURL?: string,
  swrOptions?: Partial<SWRConfiguration>
) => {
  const camera = useRef(new InternetCamera({ graphURL }));

  const {
    data: filmHoldings,
    error,
    mutate
  } = useSWR<
    {
      amount: string;
      film: { filmAddress: string; name: string; symbol: string };
    }[]
  >(
    [address, 'icdk-react-use-wallet-film-for-address'],
    address => camera.current.getWalletFilmForAddress(address),
    { revalidateOnMount: true, ...swrOptions }
  );

  return { filmHoldings, error, refresh: mutate };
};

export default useWalletFilmForAddress;
