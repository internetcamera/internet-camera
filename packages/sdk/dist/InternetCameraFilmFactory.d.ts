import { Signer } from '@ethersproject/abstract-signer';
import { BigNumberish } from '@ethersproject/bignumber';
import { JsonRpcProvider, JsonRpcSigner, Provider } from '@ethersproject/providers';
import { ContractTransaction } from 'ethers';
export declare class InternetCameraFilmFactory {
    private ipfsURL?;
    private provider?;
    private chainID?;
    constructor(config?: {
        ipfsURL?: string;
        provider?: Provider | Signer | JsonRpcProvider | JsonRpcSigner;
        chainID?: number;
    });
    getContract(): import("@internetcamera/contracts").InternetCameraFilmFactory;
    deployPersonalFilm(name: string, symbol: string, totalSupply: BigNumberish, starts: BigNumberish, expires: BigNumberish): Promise<ContractTransaction>;
    deployClaimableFilm(name: string, symbol: string, totalSupply: BigNumberish, starts: BigNumberish, expires: BigNumberish, amountClaimablePerUser: BigNumberish, maxClaims: BigNumberish): Promise<ContractTransaction>;
}
export default InternetCameraFilmFactory;
