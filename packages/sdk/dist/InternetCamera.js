"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternetCameraGraph = void 0;
const graphql_request_1 = require("graphql-request");
const contracts_1 = require("@internetcamera/contracts");
const addresses_1 = __importDefault(require("./utils/addresses"));
const exifreader_1 = __importDefault(require("exifreader"));
class InternetCameraGraph {
    constructor(config = {}) {
        if (config.graphURL)
            this.graphURL = config.graphURL;
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
        return contracts_1.InternetCamera__factory.connect(addresses_1.default[this.chainID].camera, this.provider);
    }
    getAddresses() {
        if (!this.chainID)
            throw new Error('Missing chain ID.');
        return addresses_1.default[this.chainID];
    }
    async postPhoto(file, filmAddress) {
        var _a, _b;
        if (!this.provider)
            throw new Error('Missing provider.');
        if (!this.chainID)
            throw new Error('Missing chain ID.');
        if (!this.ipfsURL)
            throw new Error('Missing IPFS url');
        // Upload file to IPFS
        const body = new FormData();
        body.append('files', file);
        const { hash: imageHash } = await fetch(`${this.ipfsURL}/upload`, {
            method: 'POST',
            body
        }).then(res => res.json());
        // Build metadata and upload
        const film = await this.getFilm(filmAddress);
        const index = film.photos.length + 1;
        const tags = await exifreader_1.default.load(await file.arrayBuffer());
        const metadata = {
            name: `${film.symbol} #${index}`,
            description: ``,
            width: ((_a = tags['Image Width']) === null || _a === void 0 ? void 0 : _a.value) || 0,
            height: ((_b = tags['Image Height']) === null || _b === void 0 ? void 0 : _b.value) || 0,
            image: `ipfs://${imageHash}`
        };
        const { hash: metadataHash } = await fetch(`${this.ipfsURL}/uploadJSON`, {
            method: 'POST',
            body: JSON.stringify(metadata),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
        return await this.getContract().postPhoto(filmAddress, metadataHash);
    }
    async getPhoto(tokenId) {
        const { photo } = await this.graphRequest(graphql_request_1.gql `
      {
        photo(id: "${tokenId}") {
          id
          tokenId
          creator {
            address
          }
          owner {
            address
          }
          name
          description
          tokenURI
          image
          width
          height
          filmIndex
          film {
            id
            name
            symbol
            filmAddress
            totalSupply
          }
          createdAt
        }
      }
    `);
        return photo;
    }
    async getRecentPhotos(limit = 10) {
        const { photos } = await this.graphRequest(graphql_request_1.gql `
      {
        photos(first: ${limit}, orderBy: createdAt, orderDirection: desc) {
          id
          tokenId
          creator {
            address
          }
          owner {
            address
          }
          name
          description
          tokenURI
          image
          width
          height
          filmIndex
          film {
            id
            name
            symbol
            filmAddress
            totalSupply
          }
          createdAt
        }
      }
    `);
        return photos;
    }
    async getRecentPhotosFromFilm(limit, filmAddress) {
        const { photos } = await this.graphRequest(graphql_request_1.gql `
      {
        photos(first: ${limit}, where: {film: "${filmAddress.toLowerCase()}"}, orderBy: createdAt, orderDirection: desc) {
          id
          tokenId
          creator {
            address
          }
          owner {
            address
          }
          name
          description
          tokenURI
          image
          width
          height
          filmIndex
          film {
            id
            name
            symbol
            filmAddress
            totalSupply
          }
          createdAt
        }
      }
    `);
        return photos;
    }
    async getFilm(filmAddress) {
        const { film } = await this.graphRequest(graphql_request_1.gql `
      {
        film(id: "${filmAddress.toLowerCase()}") {
          id
          filmAddress
          creator {
            address
          }
          name
          symbol
          totalSupply
          startTime
          expireTime
          factoryModel
          tokenURI
          wallets(where: {amount_gt: 0}) {
            wallet {
              address
            }
            amount
          }
          photos {
            id
            tokenId
            creator {
              address
            }
            owner {
              address
            }
            name
            description
            createdAt
            filmIndex
            image
            width
            height
          }
          createdAt
        }
      }
    `);
        return film;
    }
    async getRecentFilms(limit = 10) {
        const { films } = await this.graphRequest(graphql_request_1.gql `
      {
        films(first: ${limit}, orderBy: createdAt, orderDirection: desc) {
          id
          filmAddress
          creator {
            address
          }
          name
          symbol
          totalSupply
          startTime
          expireTime
          factoryModel
          tokenURI
          wallets {
            wallet {
              address
            }
            amount
          }
          photos {
            id
            tokenId
            creator {
              address
            }
            owner {
              address
            }
            name
            description
            createdAt
            filmIndex
            width
            height
          }
          createdAt
        }
      }
    `);
        return films;
    }
    async getWalletFilmForAddress(address) {
        const { wallet } = await this.graphRequest(graphql_request_1.gql `
    {
      wallet(id: "${address.toLowerCase()}") {
        films {
          id
          amount
          film {
            id
            filmAddress
            name
            symbol
            totalSupply
            photos {
              id
            }
          }
        }
      }
    }
  `);
        return wallet.films;
    }
    async getWalletPhotosForAddress(address) {
        const { wallet } = await this.graphRequest(graphql_request_1.gql `
    {
      wallet(id: "${address.toLowerCase()}") {
        photosCreated {
          id
          tokenId
          name
          image
          creator {
            address
          }
          owner {
            address
          }
          film {
            id
            name
            symbol
            filmAddress
            photos {
              id
            }
          }
          createdAt
        }
        photosOwned {
          id
          tokenId
          name
          image
          creator {
            address
          }
          owner {
            address
          }
          film {
            id
            name
            symbol
            filmAddress
            photos {
              id
            }
          }
          createdAt
        }
      }
    }
  `);
        return wallet;
    }
    async getRecentTransferEvents(limit = 10) {
        const { transferEvents } = await this.graphRequest(graphql_request_1.gql `
      {
        transferEvents(first: ${limit}, orderBy: createdAt, orderDirection: desc) {
          id
          type
          photo {
            id
            name
            creator {
              address
            }
            filmIndex
            film {
              filmAddress
              name
              symbol
              totalSupply
            }
          }
          film {
            filmAddress
            name
            symbol
            totalSupply
          }
          amount
          from {
            address
          }
          to {
            address
          }
          txHash
          createdAt
        }
      }
    `);
        return transferEvents;
    }
    graphRequest(gql) {
        if (!this.graphURL)
            throw new Error('Missing graphURL.');
        return graphql_request_1.request(this.graphURL, gql);
    }
}
exports.InternetCameraGraph = InternetCameraGraph;
exports.default = InternetCameraGraph;
