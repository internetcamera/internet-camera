import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { ContractTransaction } from '@ethersproject/contracts';
import { ClaimableFilm__factory } from '@internetcamera/contracts';
import {
  getClaimFilmTypedData,
  getSignatureForTypedData
} from '../utils/forwarder';

export class ClaimableFilm {
  private forwarderURL: string = 'https://tx.internet.camera/api/forward';
  private chainID: number = 80001;
  private provider?: Web3Provider;
  private jsonRpcProvider?: JsonRpcProvider;
  private _filmAddress: string;

  constructor(
    filmAddress: string,
    config: {
      forwarderURL?: string;
      provider?: Web3Provider;
      jsonRpcProvider?: JsonRpcProvider;
      chainID?: number;
    } = {}
  ) {
    this._filmAddress = filmAddress;
    if (config.provider) this.provider = config.provider;
    if (config.forwarderURL) this.forwarderURL = config.forwarderURL;
    if (config.jsonRpcProvider) this.jsonRpcProvider = config.jsonRpcProvider;
    if (config.chainID) this.chainID = config.chainID;
  }

  public getContract() {
    if (!this.provider && !this.jsonRpcProvider)
      throw new Error('Missing provider.');
    if (!this.chainID) throw new Error('Missing chain ID.');
    return ClaimableFilm__factory.connect(
      this._filmAddress,
      this.provider
        ? this.provider.getSigner()
        : (this.jsonRpcProvider as JsonRpcProvider)
    );
  }

  public async claimFilm(account: string): Promise<ContractTransaction> {
    return this.getContract().claimFilm(account);
  }

  public async claimFilmGasless(account: string): Promise<ContractTransaction> {
    if (!this.provider) throw new Error('Missing provider.');
    if (!this.jsonRpcProvider) throw new Error('Missing jsonRpcProvider.');
    if (!this.forwarderURL) throw new Error('Missing forwarderURL.');
    const typedData = await getClaimFilmTypedData(
      this._filmAddress,
      account,
      this.chainID,
      this.jsonRpcProvider
    );
    const { data, signature } = await getSignatureForTypedData(
      this.provider,
      typedData
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
}

export default ClaimableFilm;
