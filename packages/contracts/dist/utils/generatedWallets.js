"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signMessage = exports.generatedWallets = exports.privateKeys = void 0;
const ethers_1 = require("ethers");
exports.privateKeys = [
    '0x59b2ebea31c70579bcbfd686ed2e5e3744817cb5bcc041026850ca2553cafa15',
    '0x2ec7c436a8a171e48a474d1177f68e6816f90183c2432d8d6ec04d8076df5b5b',
    '0x6dbb3e58e668c67aa0ba300a8035c3efc31030c8db44b8b188d4d61f4bb02a54',
    '0x16a9689816d4171cf904b50f359eb3c48e9cf751d843dfc0fde4d0f0376fcdfe',
    '0x20bf830e5a0d68caa36943aa625c33c7f5273fee63a343e4f49c0847d7eb65c9',
    '0xc8bc6673dc9826a08f97b5079a224d6abdabeb8828d8cc7bca9161f70634786d',
    '0xa3fca90047c823820ae8aa404637eeb484369ca448379c06924ab350746f3086',
    '0x1fa0ba0ace639cd90b674084cf709b43d1ff819a2fd4e93a1b10a6c1d1e67ac7',
    '0xf58e994af15090ecd6bc34b26c23166469112f5ebeb6e33a1e5fc34526617ed9'
];
const generatedWallets = (provider) => {
    return exports.privateKeys.map((key) => {
        return new ethers_1.ethers.Wallet(key, provider);
    });
};
exports.generatedWallets = generatedWallets;
const signMessage = async (message, wallet) => {
    const messageHash = ethers_1.ethers.utils.id(message);
    const messageHashBytes = ethers_1.ethers.utils.arrayify(messageHash);
    const flatSig = await wallet.signMessage(messageHashBytes);
    return ethers_1.ethers.utils.arrayify(flatSig);
};
exports.signMessage = signMessage;
//# sourceMappingURL=generatedWallets.js.map