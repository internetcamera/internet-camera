import { providers } from 'ethers';

const getJSONRPCProvider = (chainId: number) => {
  switch (chainId) {
    case 50:
      return new providers.JsonRpcProvider('http://127.0.0.1:8545');
    case 80001:
      return new providers.JsonRpcProvider(
        `https://polygon-mumbai.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`
      );
    default:
      throw 'Invalid chain Id';
  }
};

export default getJSONRPCProvider;
