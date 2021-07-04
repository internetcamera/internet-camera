import { Film } from '../types';
declare const useFilm: (filmAddress: string, graphURL: string, swrOptions?: Partial<Partial<import("swr/dist/types").Configuration<any, any, import("swr/dist/types").Fetcher<any>>>> | undefined) => {
    film: Film | undefined;
    error: any;
};
export default useFilm;
