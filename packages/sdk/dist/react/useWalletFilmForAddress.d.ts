declare const useWalletFilmForAddress: (address: string, graphURL: string, swrOptions?: Partial<Partial<import("swr/dist/types").Configuration<any, any, import("swr/dist/types").Fetcher<any>>>> | undefined) => {
    filmHoldings: {
        amount: string;
        film: {
            filmAddress: string;
            name: string;
            symbol: string;
        };
    }[] | undefined;
    error: any;
};
export default useWalletFilmForAddress;
