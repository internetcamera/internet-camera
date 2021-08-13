import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { gql, request as gqlRequest } from 'graphql-request';
import { InternetCamera__factory } from '@internetcamera/contracts';
import { Film, Photo } from './types';
import InternetCameraAddresses from './utils/addresses';
import { ContractTransaction } from '@ethersproject/contracts';
import {
  getBurnPhotoTypedData,
  getPostPhotoTypedData,
  getSignatureForTypedData
} from './utils/forwarder';
import { Variables } from 'graphql-request/dist/types';

export class InternetCamera {
  private graphURL: string =
    'https://api.thegraph.com/subgraphs/name/shahruz/ic-mumbai-one';
  private ipfsURL: string = 'https://ipfs.internet.camera';
  private forwarderURL: string = 'https://tx.internet.camera/api/forward';
  private chainID: number = 80001;
  private provider?: Web3Provider;
  private jsonRpcProvider?: JsonRpcProvider;

  constructor(
    config: {
      graphURL?: string;
      ipfsURL?: string;
      forwarderURL?: string;
      provider?: Web3Provider;
      jsonRpcProvider?: JsonRpcProvider;
      chainID?: number;
    } = {}
  ) {
    if (config.graphURL) this.graphURL = config.graphURL;
    if (config.provider) this.provider = config.provider;
    if (config.forwarderURL) this.forwarderURL = config.forwarderURL;
    if (config.jsonRpcProvider) this.jsonRpcProvider = config.jsonRpcProvider;
    if (config.chainID) this.chainID = config.chainID;
    if (config.ipfsURL) this.ipfsURL = config.ipfsURL;
  }

  public getContract() {
    if (!this.provider) throw new Error('Missing provider.');
    if (!this.chainID) throw new Error('Missing chain ID.');
    return InternetCamera__factory.connect(
      InternetCameraAddresses[this.chainID].camera,
      this.provider.getSigner()
    );
  }

  public getAddresses() {
    if (!this.chainID) throw new Error('Missing chain ID.');
    return InternetCameraAddresses[this.chainID];
  }

  public async postPhoto(
    file: File,
    filmAddress: string,
    meta: { width: number; height: number }
  ): Promise<ContractTransaction> {
    if (!this.provider) throw new Error('Missing provider.');
    if (!this.chainID) throw new Error('Missing chain ID.');
    if (!this.ipfsURL) throw new Error('Missing IPFS url');

    const metadataHash = await this.postPhotoToIPFS(file, filmAddress, meta);

    return await this.getContract().postPhoto(filmAddress, metadataHash);
  }

  public async postPhotoGasless(
    file: File,
    filmAddress: string,
    meta: { width: number; height: number },
    account: string
  ): Promise<ContractTransaction> {
    if (!this.provider) throw new Error('Missing provider.');
    if (!this.jsonRpcProvider) throw new Error('Missing jsonRpcProvider.');
    if (!this.forwarderURL) throw new Error('Missing forwarderURL.');
    const metadataHash = await this.postPhotoToIPFS(file, filmAddress, meta);
    const typedData = await getPostPhotoTypedData(
      filmAddress,
      metadataHash,
      account,
      this.chainID,
      this.jsonRpcProvider
    );
    const { data, signature } = await getSignatureForTypedData(
      this.provider,
      typedData
    );
    const response = await fetch(this.forwarderURL + '/api/forward', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        data,
        signature
      })
    })
      .then(res => res.json())
      .catch(err => console.log(err));
    return await this.jsonRpcProvider.getTransaction(response.hash);
  }

  public async postPhotoToIPFS(
    file: File | { uri: string; type: string; name: string },
    filmAddress: string,
    meta: { width: number; height: number }
  ): Promise<string> {
    // Upload file to IPFS
    const body = new FormData();
    //@ts-ignore
    body.append('files', file);
    const { hash: imageHash }: { hash: string } = await fetch(
      `${this.ipfsURL}/upload`,
      {
        method: 'POST',
        body
      }
    ).then(res => res.json());

    // Build metadata and upload
    const film = await this.getFilm(filmAddress);
    const index = film.photos.length + 1;

    const metadata = {
      name: `${film.symbol} #${index}`,
      filmAddress,
      filmIndex: index,
      description: ``,
      image: `ipfs://${imageHash}`,
      width: meta.width,
      height: meta.height,
      createdAt: Date.now()
    };

    const { hash: metadataHash }: { hash: string } = await fetch(
      `${this.ipfsURL}/uploadJSON`,
      {
        method: 'POST',
        body: JSON.stringify(metadata),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(res => res.json());
    return metadataHash;
  }

  public async getPhoto(tokenId: string): Promise<Photo> {
    const { photo } = await this.graphRequest(gql`
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
            used
            totalSupply
          }
          createdAt
        }
      }
    `);
    return photo;
  }

  public async getRecentPhotos(limit: number = 10): Promise<Photo[]> {
    const { photos } = await this.graphRequest(gql`
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
            used
            totalSupply
          }
          createdAt
        }
      }
    `);
    return photos;
  }

  public async getRecentPhotosFromFilm(
    limit: number,
    filmAddress: string
  ): Promise<Photo[]> {
    const { photos } = await this.graphRequest(gql`
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
            used
            totalSupply
          }
          createdAt
        }
      }
    `);
    return photos;
  }

  public async getFilm(filmAddress: string): Promise<Film> {
    const { film } = await this.graphRequest(gql`
      {
        film(id: "${filmAddress.toLowerCase()}") {
          id
          filmAddress
          creator {
            address
          }
          name
          symbol
          used
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

  public async getRecentFilms(limit: number = 10): Promise<Film[]> {
    const { films } = await this.graphRequest(gql`
      {
        films(first: ${limit}, orderBy: createdAt, orderDirection: desc) {
          id
          filmAddress
          creator {
            address
          }
          name
          symbol
          used
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

  public async getWalletFilmForAddress(address: string): Promise<any> {
    const { wallet } = await this.graphRequest(gql`
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
            used
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

  public async getWalletPhotosForAddress(address: string): Promise<any> {
    const { wallet } = await this.graphRequest(gql`
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

  public async getRecentTransferEvents(limit: number = 10): Promise<any> {
    const { transferEvents } = await this.graphRequest(gql`
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
              used
              totalSupply
            }
          }
          film {
            filmAddress
            name
            symbol
            used
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

  public graphRequest(gql: string, variables?: Variables): Promise<any> {
    if (!this.graphURL) throw new Error('Missing graphURL.');
    return gqlRequest(this.graphURL, gql, variables);
  }

  public async burnPhoto(tokenId: string): Promise<ContractTransaction> {
    if (!this.provider) throw new Error('Missing provider.');
    if (!this.chainID) throw new Error('Missing chain ID.');
    if (!this.ipfsURL) throw new Error('Missing IPFS url');
    return await this.getContract().burn(tokenId);
  }

  public async burnPhotoGasless(
    tokenId: string,
    account: string
  ): Promise<ContractTransaction> {
    if (!this.provider) throw new Error('Missing provider.');
    if (!this.jsonRpcProvider) throw new Error('Missing jsonRpcProvider.');
    if (!this.forwarderURL) throw new Error('Missing forwarderURL.');
    const typedData = await getBurnPhotoTypedData(
      tokenId,
      account,
      this.chainID,
      this.jsonRpcProvider
    );
    const { data, signature } = await getSignatureForTypedData(
      this.provider,
      typedData
    );
    const response = await fetch(this.forwarderURL + '/api/forward', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        data,
        signature
      })
    })
      .then(res => res.json())
      .catch(err => console.log(err));
    return await this.jsonRpcProvider.getTransaction(response.hash);
  }
}

export default InternetCamera;
