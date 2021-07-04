import { Photo } from '../types';
declare const useWalletPhotosForAddress: (address: string, graphURL: string, swrOptions?: Partial<Partial<import("swr/dist/types").Configuration<any, any, import("swr/dist/types").Fetcher<any>>>> | undefined) => {
    photos: {
        photosCreated: Photo[];
        photosOwned: Photo[];
    } | undefined;
    error: any;
};
export default useWalletPhotosForAddress;
