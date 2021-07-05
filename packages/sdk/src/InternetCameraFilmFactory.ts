import { BigNumberish } from '@ethersproject/bignumber';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { InternetCameraFilmFactory__factory } from '@internetcamera/contracts';
import { ContractTransaction } from '@ethersproject/contracts';
import InternetCameraAddresses from './utils/addresses';
import { getDeployPersonalFilmSignature } from './utils/forwarder';

export class InternetCameraFilmFactory {
  private ipfsURL: string = 'https://ipfs.internet.camera';
  private forwarderURL: string = 'https://tx.internet.camera/api/forward';
  private chainID: number = 80001;
  private provider?: Web3Provider;
  private jsonRpcProvider?: JsonRpcProvider;

  constructor(
    config: {
      ipfsURL?: string;
      forwarderURL?: string;
      provider?: Web3Provider;
      jsonRpcProvider?: JsonRpcProvider;
      chainID?: number;
    } = {}
  ) {
    if (config.provider) this.provider = config.provider;
    if (config.chainID) this.chainID = config.chainID;
    if (config.forwarderURL) this.forwarderURL = config.forwarderURL;
    if (config.jsonRpcProvider) this.jsonRpcProvider = config.jsonRpcProvider;
    if (config.ipfsURL) this.ipfsURL = config.ipfsURL;
  }

  public getContract() {
    if (!this.provider) throw new Error('Missing provider.');
    if (!this.chainID) throw new Error('Missing chain ID.');
    return InternetCameraFilmFactory__factory.connect(
      InternetCameraAddresses[this.chainID].filmFactory,
      this.provider.getSigner()
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
    const tokenURI = await this._uploadMetadataToIPFS(metadata);
    return this.getContract().deployPersonalFilm(
      name,
      symbol,
      tokenURI,
      totalSupply,
      starts,
      expires
    );
  }

  public async deployPersonalFilmGasless(
    name: string,
    symbol: string,
    totalSupply: BigNumberish,
    starts: BigNumberish,
    expires: BigNumberish,
    account: string
  ): Promise<ContractTransaction> {
    if (!this.provider) throw new Error('Missing provider.');
    if (!this.chainID) throw new Error('Missing chain ID.');
    if (!this.ipfsURL) throw new Error('Missing IPFS url.');
    if (!this.jsonRpcProvider) throw new Error('Missing jsonRpcProvider.');
    const metadata = {
      name,
      symbol,
      totalSupply,
      starts,
      expires,
      factoryModel: 'personal'
    };
    const tokenURI = await this._uploadMetadataToIPFS(metadata);
    const { signature, data } = await getDeployPersonalFilmSignature(
      name,
      symbol,
      tokenURI,
      totalSupply,
      starts,
      expires,
      account,
      this.getContract(),
      this.chainID,
      this.provider,
      this.jsonRpcProvider
    );
    const response = await fetch(this.forwarderURL + '/api/forward', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        data,
        signature
      })
    })
      .then(res => res.json())
      .catch(err => console.log(err));
    return await this.jsonRpcProvider.getTransaction(response.hash);
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
    const tokenURI = await this._uploadMetadataToIPFS(metadata);
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

  public async deployClaimableFilmGasless(
    name: string,
    symbol: string,
    totalSupply: BigNumberish,
    starts: BigNumberish,
    expires: BigNumberish,
    amountClaimablePerUser: BigNumberish,
    maxClaims: BigNumberish,
    account: string
  ): Promise<ContractTransaction> {
    if (!this.provider) throw new Error('Missing provider.');
    if (!this.chainID) throw new Error('Missing chain ID.');
    if (!this.ipfsURL) throw new Error('Missing IPFS url');
    if (!this.jsonRpcProvider) throw new Error('Missing jsonRpcProvider.');
    const metadata = {
      name,
      symbol,
      totalSupply,
      starts,
      expires,
      factoryModel: 'claimable'
    };
    const tokenURI = await this._uploadMetadataToIPFS(metadata);
    const { signature, data } = await getDeployPersonalFilmSignature(
      name,
      symbol,
      tokenURI,
      totalSupply,
      starts,
      expires,
      account,
      this.getContract(),
      this.chainID,
      this.provider,
      this.jsonRpcProvider
    );
    const response = await fetch(this.forwarderURL + '/api/forward', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        data,
        signature
      })
    })
      .then(res => res.json())
      .catch(err => console.log(err));
    return await this.jsonRpcProvider.getTransaction(response.hash);
  }

  private async _uploadMetadataToIPFS(metadata: object): Promise<string> {
    const { hash }: { hash: string } = await fetch(
      `${this.ipfsURL}/uploadJSON`,
      {
        method: 'POST',
        body: JSON.stringify(metadata),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(res => res.json());
    return hash;
  }
}

export default InternetCameraFilmFactory;
