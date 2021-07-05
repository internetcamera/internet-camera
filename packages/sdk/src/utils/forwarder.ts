import { BigNumberish } from '@ethersproject/bignumber';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import {
  InternetCamera,
  TrustedForwarder__factory
} from '@internetcamera/contracts';
import {
  ClaimableFilm,
  InternetCameraFilmFactory
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

export const getPostPhotoSignature = async (
  filmAddress: string,
  metadataHash: string,
  account: string,
  camera: InternetCamera,
  chainID: number,
  provider: Web3Provider,
  jsonRpcProvider: JsonRpcProvider
) => {
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
  const signature = await provider
    .getSigner()
    ._signTypedData(dataToSign.domain, dataToSign.types, dataToSign.message);
  return { data: dataToSign, signature };
};

export const getDeployPersonalFilmSignature = async (
  name: string,
  symbol: string,
  tokenURI: string,
  totalSupply: BigNumberish,
  starts: BigNumberish,
  expires: BigNumberish,
  account: string,
  filmFactory: InternetCameraFilmFactory,
  chainID: number,
  provider: Web3Provider,
  jsonRpcProvider: JsonRpcProvider
) => {
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
  const signature = await provider
    .getSigner()
    ._signTypedData(dataToSign.domain, dataToSign.types, dataToSign.message);
  return { data: dataToSign, signature };
};

export const getDeployClaimableFilmSignature = async (
  name: string,
  symbol: string,
  tokenURI: string,
  totalSupply: BigNumberish,
  starts: BigNumberish,
  expires: BigNumberish,
  amountClaimablePerUser: BigNumberish,
  maxClaimsPerUser: BigNumberish,
  account: string,
  filmFactory: InternetCameraFilmFactory,
  chainID: number,
  provider: Web3Provider,
  jsonRpcProvider: JsonRpcProvider
) => {
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
  const signature = await provider
    .getSigner()
    ._signTypedData(dataToSign.domain, dataToSign.types, dataToSign.message);
  return { data: dataToSign, signature };
};

export const getClaimFilmSignature = async (
  filmAddress: string,
  account: string,
  film: ClaimableFilm,
  chainID: number,
  provider: Web3Provider,
  jsonRpcProvider: JsonRpcProvider
) => {
  const { data } = await film.populateTransaction['claimFilm']();
  const gasLimit = await film.estimateGas['claimFilm']({ from: account });
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
  const signature = await provider
    .getSigner()
    ._signTypedData(dataToSign.domain, dataToSign.types, dataToSign.message);
  return { data: dataToSign, signature };
};
