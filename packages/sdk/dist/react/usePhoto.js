"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const swr_1 = __importDefault(require("swr"));
const InternetCamera_1 = __importDefault(require("../InternetCamera"));
const usePhoto = (tokenId, graphURL, swrOptions) => {
    const camera = react_1.useRef(new InternetCamera_1.default({ graphURL }));
    const { data: photo, error } = swr_1.default([tokenId, 'icdk-react-use-photo'], tokenId => camera.current.getPhoto(tokenId), { revalidateOnMount: true, ...swrOptions });
    return { photo, error };
};
exports.default = usePhoto;
