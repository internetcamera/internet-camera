import { Signer } from '@ethersproject/abstract-signer';
import { JsonRpcProvider, JsonRpcSigner, Provider } from '@ethersproject/providers';
import { Film, Photo } from './types';
import { ContractTransaction } from 'ethers';
export declare class InternetCameraGraph {
    private graphURL?;
    private ipfsURL?;
    private provider?;
    private chainID?;
    constructor(config?: {
        graphURL?: string;
        ipfsURL?: string;
        provider?: Provider | Signer | JsonRpcProvider | JsonRpcSigner;
        chainID?: number;
    });
    getContract(): import("@internetcamera/contracts").InternetCamera;
    getAddresses(): {
        camera: string;
        filmFactory: string;
    };
    postPhoto(file: File, filmAddress: string): Promise<ContractTransaction>;
    getPhoto(tokenId: string): Promise<Photo>;
    getRecentPhotos(limit?: number): Promise<Photo[]>;
    getRecentPhotosFromFilm(limit: number, filmAddress: string): Promise<Photo[]>;
    getFilm(filmAddress: string): Promise<Film>;
    getRecentFilms(limit?: number): Promise<Film[]>;
    getWalletFilmForAddress(address: string): Promise<any>;
    getWalletPhotosForAddress(address: string): Promise<any>;
    getRecentTransferEvents(limit?: number): Promise<any>;
    graphRequest(gql: string): Promise<any>;
}
export default InternetCameraGraph;
