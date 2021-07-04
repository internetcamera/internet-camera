"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimableFilm = void 0;
const contracts_1 = require("@internetcamera/contracts");
class ClaimableFilm {
    constructor(filmAddress, providerOrSigner, chainId) {
        this.contract = contracts_1.ClaimableFilm__factory.connect(filmAddress, providerOrSigner);
    }
    // ClaimableFilm Write APIs
    async claimFilm() {
        return this.contract.claimFilm();
    }
    // ClaimableFilm Read APIs
    async maxClaims() {
        return this.maxClaims();
    }
    async amountClaimablePerUser() {
        return this.amountClaimablePerUser();
    }
    async claimCountOf(address) {
        return this.claimCountOf(address);
    }
}
exports.ClaimableFilm = ClaimableFilm;
exports.default = ClaimableFilm;
