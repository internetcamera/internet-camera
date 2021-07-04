import { HardhatUserConfig } from 'hardhat/config';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import 'hardhat-deploy';

// You have to export an object to set up your config
// This object can have the following optional entries:
// defaultNetwork, networks, solc, and paths.
// Go to https://buidler.dev/config/ to learn more
const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true
          }
        }
      }
    ]
  },
  networks: {
    goerli: {
      chainId: 5,
      url: require('dotenv').config({ path: '.env.5' }).parsed.RPC_ENDPOINT
    },
    mumbai: {
      chainId: 80001,
      url: require('dotenv').config({ path: '.env.80001' }).parsed.RPC_ENDPOINT
    }
  },
  etherscan: {
    apiKey: require('dotenv').config({ path: '.env.80001' }).parsed
      .ETHERSCAN_KEY
  },
  typechain: {
    outDir: 'typechain/',
    target: 'ethers-v5'
  }
};

export default config;
