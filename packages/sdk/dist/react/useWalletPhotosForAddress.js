"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const swr_1 = __importDefault(require("swr"));
const InternetCamera_1 = __importDefault(require("../InternetCamera"));
const useWalletPhotosForAddress = (address, graphURL, swrOptions) => {
    const camera = react_1.useRef(new InternetCamera_1.default({ graphURL }));
    const { data: photos, error } = swr_1.default([address, 'icdk-react-use-wallet-photos-for-address'], address => camera.current.getWalletPhotosForAddress(address), { revalidateOnMount: true, ...swrOptions });
    return { photos, error };
};
exports.default = useWalletPhotosForAddress;
