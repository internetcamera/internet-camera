import { Film } from '../types';
declare const useRecentFilms: (limit: number, graphURL: string, swrOptions?: Partial<Partial<import("swr/dist/types").Configuration<any, any, import("swr/dist/types").Fetcher<any>>>> | undefined) => {
    films: Film[] | undefined;
    error: any;
};
export default useRecentFilms;
