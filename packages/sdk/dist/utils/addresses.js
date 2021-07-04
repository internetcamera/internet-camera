"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _50_json_1 = __importDefault(require("@internetcamera/contracts/dist/addresses/50.json"));
const _80001_json_1 = __importDefault(require("@internetcamera/contracts/dist/addresses/80001.json"));
const InternetCameraAddresses = {
    50: _50_json_1.default,
    80001: _80001_json_1.default
};
exports.default = InternetCameraAddresses;
