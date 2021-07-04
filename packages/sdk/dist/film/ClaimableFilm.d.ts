import { Signer } from '@ethersproject/abstract-signer';
import { JsonRpcProvider, JsonRpcSigner, Provider } from '@ethersproject/providers';
import { ContractTransaction } from 'ethers';
import { ClaimableFilm as ClaimableFilmTypechain } from '@internetcamera/contracts';
import { BigNumber } from '@ethersproject/bignumber';
export declare class ClaimableFilm {
    contract: ClaimableFilmTypechain;
    constructor(filmAddress: string, providerOrSigner: Provider | Signer | JsonRpcProvider | JsonRpcSigner, chainId: number);
    claimFilm(): Promise<ContractTransaction>;
    maxClaims(): Promise<BigNumber>;
    amountClaimablePerUser(): Promise<BigNumber>;
    claimCountOf(address: string): Promise<BigNumber>;
}
export default ClaimableFilm;
