import { Photo } from '../types';
declare const useRecentPhotosFromFilm: (limit: number, filmAddress: string, graphURL: string, swrOptions?: Partial<Partial<import("swr/dist/types").Configuration<any, any, import("swr/dist/types").Fetcher<any>>>> | undefined) => {
    photos: Photo[] | undefined;
    error: any;
};
export default useRecentPhotosFromFilm;
