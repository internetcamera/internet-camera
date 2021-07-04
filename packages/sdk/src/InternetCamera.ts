import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { gql, request as gqlRequest } from 'graphql-request';
import { InternetCamera__factory } from '@internetcamera/contracts';
import { Film, Photo } from './types';
import InternetCameraAddresses from './utils/addresses';
import ExifReader from 'exifreader';
import { ContractTransaction } from '@ethersproject/contracts';
import { getPostPhotoSignature } from './utils/forwarder';

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
    filmAddress: string
  ): Promise<ContractTransaction> {
    if (!this.provider) throw new Error('Missing provider.');
    if (!this.chainID) throw new Error('Missing chain ID.');
    if (!this.ipfsURL) throw new Error('Missing IPFS url');

    const metadataHash = await this._postToIPFS(file, filmAddress);

    return await this.getContract().postPhoto(filmAddress, metadataHash);
  }

  public async postPhotoGasless(
    file: File,
    filmAddress: string,
    account: string
  ): Promise<ContractTransaction> {
    if (!this.provider) throw new Error('Missing provider.');
    if (!this.jsonRpcProvider) throw new Error('Missing jsonRpcProvider.');
    if (!this.forwarderURL) throw new Error('Missing forwarderURL.');
    const metadataHash = await this._postToIPFS(file, filmAddress);
    const { data, signature } = await getPostPhotoSignature(
      filmAddress,
      metadataHash,
      account,
      this.getContract(),
      this.chainID,
      this.provider,
      this.jsonRpcProvider
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

  private async _postToIPFS(file: File, filmAddress: string): Promise<string> {
    // Upload file to IPFS
    const body = new FormData();
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
    const tags = await ExifReader.load(await file.arrayBuffer());

    const metadata = {
      name: `${film.symbol} #${index}`,
      description: ``,
      width: tags['Image Width']?.value || 0,
      height: tags['Image Height']?.value || 0,
      image: `ipfs://${imageHash}`
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

  public graphRequest(gql: string): Promise<any> {
    if (!this.graphURL) throw new Error('Missing graphURL.');
    return gqlRequest(this.graphURL, gql);
  }
}

export default InternetCamera;
