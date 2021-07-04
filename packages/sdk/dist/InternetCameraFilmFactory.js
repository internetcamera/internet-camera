"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternetCameraFilmFactory = void 0;
const contracts_1 = require("@internetcamera/contracts");
const addresses_1 = __importDefault(require("./utils/addresses"));
class InternetCameraFilmFactory {
    constructor(config = {}) {
        if (config.provider)
            this.provider = config.provider;
        if (config.chainID)
            this.chainID = config.chainID;
        if (config.ipfsURL)
            this.ipfsURL = config.ipfsURL;
    }
    getContract() {
        if (!this.provider)
            throw new Error('Missing provider.');
        if (!this.chainID)
            throw new Error('Missing chain ID.');
        return contracts_1.InternetCameraFilmFactory__factory.connect(addresses_1.default[this.chainID].filmFactory, this.provider);
    }
    // InternetCameraFilmFactory Write APIs
    async deployPersonalFilm(name, symbol, totalSupply, starts, expires) {
        if (!this.provider)
            throw new Error('Missing provider.');
        if (!this.chainID)
            throw new Error('Missing chain ID.');
        if (!this.ipfsURL)
            throw new Error('Missing IPFS url');
        const metadata = {
            name,
            symbol,
            totalSupply,
            starts,
            expires,
            factoryModel: 'personal'
        };
        const { hash: tokenURI } = await fetch(`${this.ipfsURL}/uploadJSON`, {
            method: 'POST',
            body: JSON.stringify(metadata),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
        return this.getContract().deployPersonalFilm(name, symbol, tokenURI, totalSupply, starts, expires);
    }
    async deployClaimableFilm(name, symbol, totalSupply, starts, expires, amountClaimablePerUser, maxClaims) {
        if (!this.provider)
            throw new Error('Missing provider.');
        if (!this.chainID)
            throw new Error('Missing chain ID.');
        if (!this.ipfsURL)
            throw new Error('Missing IPFS url');
        const metadata = {
            name,
            symbol,
            totalSupply,
            starts,
            expires,
            factoryModel: 'claimable'
        };
        const { hash: tokenURI } = await fetch(`${this.ipfsURL}/uploadJSON`, {
            method: 'POST',
            body: JSON.stringify(metadata),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
        return this.getContract().deployClaimableFilm(name, symbol, tokenURI, totalSupply, starts, expires, amountClaimablePerUser, maxClaims);
    }
}
exports.InternetCameraFilmFactory = InternetCameraFilmFactory;
exports.default = InternetCameraFilmFactory;
