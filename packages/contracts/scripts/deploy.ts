import fs from 'fs-extra';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import {
  InternetCamera__factory,
  InternetCameraFilmFactory__factory,
  FilmFactoryToken__factory,
  BasicFilm__factory,
  ClaimableFilm__factory,
  TrustedForwarder__factory
} from '../typechain';

async function start() {
  const args = require('minimist')(process.argv.slice(2));

  if (!args.chainId) {
    throw new Error('--chainId chain ID is required');
  }
  const chainId = args.chainId;

  const path = `${process.cwd()}/.env.${chainId}`;
  const env = require('dotenv').config({ path }).parsed;
  const provider = new JsonRpcProvider(env.RPC_ENDPOINT);
  const wallet = new Wallet(`0x${env.PRIVATE_KEY}`, provider);
  const addressesPath = `${process.cwd()}/addresses/${chainId}.json`;
  const addressBook = JSON.parse(await fs.readFileSync(addressesPath));

  if (!addressBook.forwarder) {
    console.log('Deploying Forwarder...');
    const deployTxForwarder = await new TrustedForwarder__factory(
      wallet
    ).deploy();
    console.log('Deploy TX: ', deployTxForwarder.deployTransaction.hash);
    await deployTxForwarder.deployed();
    console.log('Forwader deployed at ', deployTxForwarder.address);
    addressBook.forwarder = deployTxForwarder.address;
    await fs.writeFile(addressesPath, JSON.stringify(addressBook, null, 2));
  }

  if (!addressBook.camera) {
    console.log('Deploying Internet Camera...');
    const deployTxCamera = await new InternetCamera__factory(wallet).deploy(
      addressBook.forwarder
    );
    console.log('Deploy TX: ', deployTxCamera.deployTransaction.hash);
    await deployTxCamera.deployed();
    console.log('Internet Camera deployed at ', deployTxCamera.address);
    addressBook.camera = deployTxCamera.address;
    await fs.writeFile(addressesPath, JSON.stringify(addressBook, null, 2));
  }

  if (!addressBook.filmModelPersonal) {
    console.log('Deploying Personal Film...');
    const deployTxFilmPersonal = await new BasicFilm__factory(wallet).deploy(
      addressBook.forwarder
    );
    console.log('Deploy TX: ', deployTxFilmPersonal.deployTransaction.hash);
    await deployTxFilmPersonal.deployed();
    console.log('PersonalFilm deployed at ', deployTxFilmPersonal.address);
    addressBook.filmModelPersonal = deployTxFilmPersonal.address;
    await fs.writeFile(addressesPath, JSON.stringify(addressBook, null, 2));
  }

  if (!addressBook.filmModelClaimable) {
    console.log('Deploying Claimable Film...');
    const deployTxFilmClaimable = await new ClaimableFilm__factory(
      wallet
    ).deploy(addressBook.forwarder);
    console.log('Deploy TX: ', deployTxFilmClaimable.deployTransaction.hash);
    await deployTxFilmClaimable.deployed();
    console.log('ClaimableFilm deployed at ', deployTxFilmClaimable.address);
    addressBook.filmModelClaimable = deployTxFilmClaimable.address;
    await fs.writeFile(addressesPath, JSON.stringify(addressBook, null, 2));
  }

  if (!addressBook.filmFactoryToken) {
    console.log('Deploying Film Factory Token...');
    const deployTxFilmFactoryToken = await new FilmFactoryToken__factory(
      wallet
    ).deploy();
    console.log('Deploy TX: ', deployTxFilmFactoryToken.deployTransaction.hash);
    await deployTxFilmFactoryToken.deployed();
    console.log(
      'deployTxFilmFactoryToken deployed at ',
      deployTxFilmFactoryToken.address
    );
    addressBook.filmFactoryToken = deployTxFilmFactoryToken.address;
    await fs.writeFile(addressesPath, JSON.stringify(addressBook, null, 2));
  }

  if (!addressBook.filmFactory) {
    console.log('Deploying Film Factory...');
    const deployTxFilmFactory = await new InternetCameraFilmFactory__factory(
      wallet
    ).deploy(
      addressBook.camera,
      addressBook.filmFactoryToken,
      addressBook.filmModelPersonal,
      addressBook.filmModelClaimable,
      addressBook.forwarder
    );
    console.log('Deploy TX: ', deployTxFilmFactory.deployTransaction.hash);
    await deployTxFilmFactory.deployed();
    console.log('FilmFactory deployed at ', deployTxFilmFactory.address);
    addressBook.filmFactory = deployTxFilmFactory.address;
    await fs.writeFile(addressesPath, JSON.stringify(addressBook, null, 2));

    console.log("Updating InternetCamera's registered FilmFactory address");
    const camera = InternetCamera__factory.connect(addressBook.camera, wallet);
    await camera.setFilmFactoryAddress(deployTxFilmFactory.address);

    console.log("Updating FilmFactoryToken's registered FilmFactory address");
    const filmFactoryToken = FilmFactoryToken__factory.connect(
      addressBook.filmFactoryToken,
      wallet
    );
    await filmFactoryToken.setFilmFactoryAddress(addressBook.filmFactory);
  }

  console.log('Done!');
}

start().catch((e: Error) => {
  console.error(e);
  process.exit(1);
});
