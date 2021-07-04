"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const swr_1 = __importDefault(require("swr"));
const InternetCamera_1 = __importDefault(require("../InternetCamera"));
const useRecentPhotosFromFilm = (limit, filmAddress, graphURL, swrOptions) => {
    const camera = react_1.useRef(new InternetCamera_1.default({ graphURL }));
    const { data: photos, error } = swr_1.default([limit, filmAddress, 'icdk-react-use-recent-photos-from-film'], (limit, filmAddress) => camera.current.getRecentPhotosFromFilm(limit, filmAddress), { revalidateOnMount: true, ...swrOptions });
    return { photos, error };
};
exports.default = useRecentPhotosFromFilm;
