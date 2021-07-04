"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const swr_1 = __importDefault(require("swr"));
const InternetCamera_1 = __importDefault(require("../InternetCamera"));
const useWalletFilmForAddress = (address, graphURL, swrOptions) => {
    const camera = react_1.useRef(new InternetCamera_1.default({ graphURL }));
    const { data: filmHoldings, error } = swr_1.default([address, 'icdk-react-use-wallet-film-for-address'], address => camera.current.getWalletFilmForAddress(address), { revalidateOnMount: true, ...swrOptions });
    return { filmHoldings, error };
};
exports.default = useWalletFilmForAddress;
