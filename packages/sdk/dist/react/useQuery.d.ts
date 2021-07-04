declare const useQuery: (query: string, graphURL: string, swrOptions?: Partial<Partial<import("swr/dist/types").Configuration<any, any, import("swr/dist/types").Fetcher<any>>>> | undefined) => {
    data: any;
    error: any;
};
export default useQuery;
