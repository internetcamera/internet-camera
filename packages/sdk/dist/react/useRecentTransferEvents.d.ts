declare const useRecentTransferEvents: (limit: number, graphURL: string, swrOptions?: Partial<Partial<import("swr/dist/types").Configuration<any, any, import("swr/dist/types").Fetcher<any>>>> | undefined) => {
    transferEvents: any[] | undefined;
    error: any;
};
export default useRecentTransferEvents;
