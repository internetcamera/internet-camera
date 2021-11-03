import { useWallet } from '@gimmixorg/use-wallet';
import useSWR from 'swr';
import { InternetCameraFilmFactory } from '@internetcamera/sdk';
import { providers } from 'ethers';
import { formatEther } from '@ethersproject/units';

const useFilmFactoryTokenBalance = () => {
  const { account } = useWallet();
  const { data, error } = useSWR(
    account ? [account, 'use-film-factory-token-balance'] : null,
    async (account: string) => {
      const filmFactory = new InternetCameraFilmFactory({
        jsonRpcProvider: new providers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_RPC_URL
        ),
        chainID: Number(process.env.NEXT_PUBLIC_CHAIN_ID)
      });
      return await filmFactory.getFilmFactoryTokenBalanceOf(account);
    }
  );
  return {
    filmFactoryTokenBalance: data ? parseFloat(formatEther(data)) : 0,
    error
  };
};

export default useFilmFactoryTokenBalance;
