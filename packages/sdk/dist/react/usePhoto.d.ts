import { Photo } from '../types';
declare const usePhoto: (tokenId: string, graphURL: string, swrOptions?: Partial<Partial<import("swr/dist/types").Configuration<any, any, import("swr/dist/types").Fetcher<any>>>> | undefined) => {
    photo: Photo | undefined;
    error: any;
};
export default usePhoto;
