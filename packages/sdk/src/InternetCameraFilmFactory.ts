import { Signer } from '@ethersproject/abstract-signer';
import { BigNumberish } from '@ethersproject/bignumber';
import {
  JsonRpcProvider,
  JsonRpcSigner,
  Provider
} from '@ethersproject/providers';
import { InternetCameraFilmFactory__factory } from '@internetcamera/contracts';
import { ContractTransaction } from '@ethersproject/contracts';
import InternetCameraAddresses from './utils/addresses';

export class InternetCameraFilmFactory {
  private ipfsURL: string = 'https://ipfs.internet.camera';
  private chainID: number = 80001;
  private provider?: Provider | Signer | JsonRpcProvider | JsonRpcSigner;

  constructor(
    config: {
      ipfsURL?: string;
      provider?: Provider | Signer | JsonRpcProvider | JsonRpcSigner;
      chainID?: number;
    } = {}
  ) {
    if (config.provider) this.provider = config.provider;
    if (config.chainID) this.chainID = config.chainID;
    if (config.ipfsURL) this.ipfsURL = config.ipfsURL;
  }

  public getContract() {
    if (!this.provider) throw new Error('Missing provider.');
    if (!this.chainID) throw new Error('Missing chain ID.');
    return InternetCameraFilmFactory__factory.connect(
      InternetCameraAddresses[this.chainID].filmFactory,
      this.provider
    );
  }

  // InternetCameraFilmFactory Write APIs
  public async deployPersonalFilm(
    name: string,
    symbol: string,
    totalSupply: BigNumberish,
    starts: BigNumberish,
    expires: BigNumberish
  ): Promise<ContractTransaction> {
    if (!this.provider) throw new Error('Missing provider.');
    if (!this.chainID) throw new Error('Missing chain ID.');
    if (!this.ipfsURL) throw new Error('Missing IPFS url');
    const metadata = {
      name,
      symbol,
      totalSupply,
      starts,
      expires,
      factoryModel: 'personal'
    };
    const { hash: tokenURI }: { hash: string } = await fetch(
      `${this.ipfsURL}/uploadJSON`,
      {
        method: 'POST',
        body: JSON.stringify(metadata),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(res => res.json());
    return this.getContract().deployPersonalFilm(
      name,
      symbol,
      tokenURI,
      totalSupply,
      starts,
      expires
    );
  }

  public async deployClaimableFilm(
    name: string,
    symbol: string,
    totalSupply: BigNumberish,
    starts: BigNumberish,
    expires: BigNumberish,
    amountClaimablePerUser: BigNumberish,
    maxClaims: BigNumberish
  ): Promise<ContractTransaction> {
    if (!this.provider) throw new Error('Missing provider.');
    if (!this.chainID) throw new Error('Missing chain ID.');
    if (!this.ipfsURL) throw new Error('Missing IPFS url');
    const metadata = {
      name,
      symbol,
      totalSupply,
      starts,
      expires,
      factoryModel: 'claimable'
    };
    const { hash: tokenURI }: { hash: string } = await fetch(
      `${this.ipfsURL}/uploadJSON`,
      {
        method: 'POST',
        body: JSON.stringify(metadata),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(res => res.json());
    return this.getContract().deployClaimableFilm(
      name,
      symbol,
      tokenURI,
      totalSupply,
      starts,
      expires,
      amountClaimablePerUser,
      maxClaims
    );
  }
}

export default InternetCameraFilmFactory;
