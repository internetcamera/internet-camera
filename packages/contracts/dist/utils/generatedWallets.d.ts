import { ethers } from 'ethers';
export declare const privateKeys: string[];
export declare const generatedWallets: (provider: ethers.providers.BaseProvider) => ethers.Wallet[];
export declare const signMessage: (message: string, wallet: ethers.Wallet) => Promise<Uint8Array>;
