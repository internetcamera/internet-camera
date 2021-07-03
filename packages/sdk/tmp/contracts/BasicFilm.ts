import { Signer } from '@ethersproject/abstract-signer';
import { Provider } from '@ethersproject/providers';
import {
  BasicFilm as BasicFilmTypechain,
  BasicFilm__factory
} from '@internetcamera/contracts/dist/typechain';
import { BigNumber } from '@ethersproject/bignumber';

// Should be a basic reference implementation for InternetCameraFilm standard

export class BasicFilm {
  public filmAddress: string;
  public providerOrSigner: Provider | Signer;
  public chainId: number;
  public contract: BasicFilmTypechain;

  constructor(
    filmAddress: string,
    providerOrSigner: Provider | Signer,
    chainId: number
  ) {
    this.filmAddress = filmAddress;
    this.providerOrSigner = providerOrSigner;
    this.chainId = chainId;
    this.contract = BasicFilm__factory.connect(filmAddress, providerOrSigner);
  }

  // InternetCameraFilm Read APIs
  public async tokenURI(): Promise<string> {
    return this.contract.tokenURI();
  }

  public async startTime(): Promise<BigNumber> {
    return this.contract.startTime();
  }
  public async expireTime(): Promise<BigNumber> {
    return this.contract.expireTime();
  }

  public async name(): Promise<string> {
    return this.contract.name();
  }

  public async symbol(): Promise<string> {
    return this.contract.symbol();
  }

  public async totalSupply(): Promise<BigNumber> {
    return this.contract.totalSupply();
  }

  public async balanceOf(account: string): Promise<BigNumber> {
    return this.contract.balanceOf(account);
  }
}

export default BasicFilm;
