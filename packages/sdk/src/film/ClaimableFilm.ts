import { Signer } from '@ethersproject/abstract-signer';
import {
  JsonRpcProvider,
  JsonRpcSigner,
  Provider
} from '@ethersproject/providers';
import { ContractTransaction } from 'ethers';
import {
  ClaimableFilm__factory,
  ClaimableFilm as ClaimableFilmTypechain
} from '@internetcamera/contracts';
import { BigNumber } from '@ethersproject/bignumber';

export class ClaimableFilm {
  contract: ClaimableFilmTypechain;

  constructor(
    filmAddress: string,
    providerOrSigner: Provider | Signer | JsonRpcProvider | JsonRpcSigner,
    chainId: number
  ) {
    this.contract = ClaimableFilm__factory.connect(
      filmAddress,
      providerOrSigner
    );
  }

  // ClaimableFilm Write APIs
  public async claimFilm(): Promise<ContractTransaction> {
    return this.contract.claimFilm();
  }

  // ClaimableFilm Read APIs
  public async maxClaims(): Promise<BigNumber> {
    return this.maxClaims();
  }

  public async amountClaimablePerUser(): Promise<BigNumber> {
    return this.amountClaimablePerUser();
  }

  public async claimCountOf(address: string): Promise<BigNumber> {
    return this.claimCountOf(address);
  }
}

export default ClaimableFilm;
