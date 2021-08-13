import { BigNumberish } from '@ethersproject/bignumber';
import { JsonRpcProvider } from '@ethersproject/providers';
import {
  TrustedForwarder__factory,
  InternetCamera__factory,
  InternetCameraFilmFactory__factory,
  ClaimableFilm__factory
} from '@internetcamera/contracts';
import InternetCameraAddresses from './addresses';

export const getDataToSignForEIP712 = async (request: any, chainId: number) => {
  const forwarderAddress = InternetCameraAddresses[chainId].forwarder;
  const dataToSign = {
    domain: {
      name: 'Internet Camera',
      version: '0.0.1',
      verifyingContract: forwarderAddress
    },
    types: {
      ForwardRequest: [
        { name: 'from', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'gas', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'data', type: 'bytes' }
      ]
    },
    primaryType: 'ForwardRequest',
    message: request
  };
  return dataToSign;
};

export const getPostPhotoTypedData = async (
  filmAddress: string,
  metadataHash: string,
  account: string,
  chainID: number,
  jsonRpcProvider: JsonRpcProvider
) => {
  const camera = InternetCamera__factory.connect(
    InternetCameraAddresses[chainID].camera,
    jsonRpcProvider
  );
  const { data } = await camera.populateTransaction['postPhoto'](
    filmAddress,
    metadataHash
  );
  const gasLimit = await camera.estimateGas['postPhoto'](
    filmAddress,
    metadataHash,
    { from: account }
  );
  const gasLimitNum = Number(gasLimit.toNumber().toString());
  const forwarder = TrustedForwarder__factory.connect(
    InternetCameraAddresses[chainID].forwarder,
    jsonRpcProvider
  );
  const nonce = await forwarder.getNonce(account);
  const request = {
    from: account,
    to: InternetCameraAddresses[chainID].camera,
    value: 0,
    gas: gasLimitNum,
    nonce: nonce.toNumber(),
    data
  };
  const dataToSign = await getDataToSignForEIP712(request, chainID);
  return dataToSign;
};

export const getDeployPersonalFilmTypedData = async (
  name: string,
  symbol: string,
  tokenURI: string,
  totalSupply: BigNumberish,
  starts: BigNumberish,
  expires: BigNumberish,
  account: string,
  chainID: number,
  jsonRpcProvider: JsonRpcProvider
) => {
  const filmFactory = InternetCameraFilmFactory__factory.connect(
    InternetCameraAddresses[chainID].filmFactory,
    jsonRpcProvider
  );
  const { data } = await filmFactory.populateTransaction['deployPersonalFilm'](
    name,
    symbol,
    tokenURI,
    totalSupply,
    starts,
    expires
  );
  const gasLimit = await filmFactory.estimateGas['deployPersonalFilm'](
    name,
    symbol,
    tokenURI,
    totalSupply,
    starts,
    expires,
    { from: account }
  );
  const gasLimitNum = Number(gasLimit.toNumber().toString());
  const forwarder = TrustedForwarder__factory.connect(
    InternetCameraAddresses[chainID].forwarder,
    jsonRpcProvider
  );
  const nonce = await forwarder.getNonce(account);
  const request = {
    from: account,
    to: InternetCameraAddresses[chainID].filmFactory,
    value: 0,
    gas: gasLimitNum,
    nonce: nonce.toNumber(),
    data
  };
  const dataToSign = await getDataToSignForEIP712(request, chainID);
  return dataToSign;
};

export const getDeployClaimableFilmTypedData = async (
  name: string,
  symbol: string,
  tokenURI: string,
  totalSupply: BigNumberish,
  starts: BigNumberish,
  expires: BigNumberish,
  amountClaimablePerUser: BigNumberish,
  maxClaimsPerUser: BigNumberish,
  account: string,
  chainID: number,
  jsonRpcProvider: JsonRpcProvider
) => {
  const filmFactory = InternetCameraFilmFactory__factory.connect(
    InternetCameraAddresses[chainID].filmFactory,
    jsonRpcProvider
  );

  const { data } = await filmFactory.populateTransaction['deployClaimableFilm'](
    name,
    symbol,
    tokenURI,
    totalSupply,
    starts,
    expires,
    amountClaimablePerUser,
    maxClaimsPerUser
  );
  const gasLimit = await filmFactory.estimateGas['deployClaimableFilm'](
    name,
    symbol,
    tokenURI,
    totalSupply,
    starts,
    expires,
    amountClaimablePerUser,
    maxClaimsPerUser,
    { from: account }
  );
  const gasLimitNum = Number(gasLimit.toNumber().toString());
  const forwarder = TrustedForwarder__factory.connect(
    InternetCameraAddresses[chainID].forwarder,
    jsonRpcProvider
  );
  const nonce = await forwarder.getNonce(account);
  const request = {
    from: account,
    to: InternetCameraAddresses[chainID].filmFactory,
    value: 0,
    gas: gasLimitNum,
    nonce: nonce.toNumber(),
    data
  };
  const dataToSign = await getDataToSignForEIP712(request, chainID);
  return dataToSign;
};

export const getClaimFilmTypedData = async (
  filmAddress: string,
  account: string,
  chainID: number,
  jsonRpcProvider: JsonRpcProvider
) => {
  const film = ClaimableFilm__factory.connect(filmAddress, jsonRpcProvider);
  const { data } = await film.populateTransaction['claimFilm'](account);
  const gasLimit = await film.estimateGas['claimFilm'](account, {
    from: account
  });
  const gasLimitNum = Number(gasLimit.toNumber().toString());
  const forwarder = TrustedForwarder__factory.connect(
    InternetCameraAddresses[chainID].forwarder,
    jsonRpcProvider
  );
  const nonce = await forwarder.getNonce(account);
  const request = {
    from: account,
    to: filmAddress,
    value: 0,
    gas: gasLimitNum,
    nonce: nonce.toNumber(),
    data
  };
  const dataToSign = await getDataToSignForEIP712(request, chainID);
  return dataToSign;
};

export const getBurnPhotoTypedData = async (
  tokenId: string,
  account: string,
  chainID: number,
  jsonRpcProvider: JsonRpcProvider
) => {
  const camera = InternetCamera__factory.connect(
    InternetCameraAddresses[chainID].camera,
    jsonRpcProvider
  );
  const { data } = await camera.populateTransaction['burn'](tokenId);
  const gasLimit = await camera.estimateGas['burn'](tokenId, { from: account });
  const gasLimitNum = Number(gasLimit.toNumber().toString());
  const forwarder = TrustedForwarder__factory.connect(
    InternetCameraAddresses[chainID].forwarder,
    jsonRpcProvider
  );
  const nonce = await forwarder.getNonce(account);
  const request = {
    from: account,
    to: InternetCameraAddresses[chainID].camera,
    value: 0,
    gas: gasLimitNum,
    nonce: nonce.toNumber(),
    data
  };
  const dataToSign = await getDataToSignForEIP712(request, chainID);
  return dataToSign;
};

// export const getBurnFilmTypedData = async (
//   filmAddress: string,
//   amount: BigNumberish,
//   account: string,
//   chainID: number,
//   jsonRpcProvider: JsonRpcProvider
// ) => {
//   const film = BasicFilm__factory.connect(filmAddress, jsonRpcProvider);
//   const { data } = await film.populateTransaction['transfer'](
//     InternetCameraAddresses[chainID].camera,
//     amount
//   );
//   const gasLimit = await film.estimateGas['transfer'](
//     InternetCameraAddresses[chainID].camera,
//     amount,
//     { from: account }
//   );
//   const gasLimitNum = Number(gasLimit.toNumber().toString());
//   const forwarder = TrustedForwarder__factory.connect(
//     InternetCameraAddresses[chainID].forwarder,
//     jsonRpcProvider
//   );
//   const nonce = await forwarder.getNonce(account);
//   const request = {
//     from: account,
//     to: filmAddress,
//     value: 0,
//     gas: gasLimitNum,
//     nonce: nonce.toNumber(),
//     data
//   };
//   const dataToSign = await getDataToSignForEIP712(request, chainID);
//   return dataToSign;
// };

export const getSignatureForTypedData = async (
  provider: JsonRpcProvider,
  dataToSign: {
    domain: Record<string, string>;
    types: Record<string, { name: string; type: string }[]>;
    primaryType: string;
    message: any;
  }
) => {
  const signature = await provider
    .getSigner()
    ._signTypedData(dataToSign.domain, dataToSign.types, dataToSign.message);
  return { data: dataToSign, signature };
};
