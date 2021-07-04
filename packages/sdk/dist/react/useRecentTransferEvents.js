"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const swr_1 = __importDefault(require("swr"));
const InternetCamera_1 = __importDefault(require("../InternetCamera"));
const useRecentTransferEvents = (limit, graphURL, swrOptions) => {
    const camera = react_1.useRef(new InternetCamera_1.default({ graphURL }));
    const { data: transferEvents, error } = swr_1.default([limit, 'icdk-react-use-recent-transfer-events'], limit => camera.current.getRecentTransferEvents(limit), { revalidateOnMount: true, ...swrOptions });
    return { transferEvents, error };
};
exports.default = useRecentTransferEvents;
