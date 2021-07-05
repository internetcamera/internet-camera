import fs from 'fs-extra';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import {
  InternetCamera__factory,
  InternetCameraFilmFactory__factory,
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
  if (addressBook.camera || addressBook.filmFactory)
    throw new Error(
      "This would overwrite the address book. Clear it first if you'd like to deploy new instances."
    );

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

  if (!addressBook.camera || !addressBook.filmFactory) {
    console.log('Deploying Internet Camera...');
    const deployTxCamera = await new InternetCamera__factory(wallet).deploy(
      addressBook.forwarder
    );
    console.log('Deploy TX: ', deployTxCamera.deployTransaction.hash);
    const camera = await deployTxCamera.deployed();
    console.log('Internet Camera deployed at ', deployTxCamera.address);
    addressBook.camera = deployTxCamera.address;
    await fs.writeFile(addressesPath, JSON.stringify(addressBook, null, 2));

    console.log('Deploying Personal Film...');
    const deployTxFilmPersonal = await new BasicFilm__factory(wallet).deploy(
      addressBook.forwarder
    );
    console.log('Deploy TX: ', deployTxFilmPersonal.deployTransaction.hash);
    await deployTxFilmPersonal.deployed();
    console.log('PersonalFilm deployed at ', deployTxFilmPersonal.address);
    addressBook.filmModelPersonal = deployTxFilmPersonal.address;

    await fs.writeFile(addressesPath, JSON.stringify(addressBook, null, 2));

    console.log('Deploying Claimable Film...');
    const deployTxFilmClaimable = await new ClaimableFilm__factory(
      wallet
    ).deploy(addressBook.forwarder);
    console.log('Deploy TX: ', deployTxFilmClaimable.deployTransaction.hash);
    await deployTxFilmClaimable.deployed();
    console.log('ClaimableFilm deployed at ', deployTxFilmClaimable.address);
    addressBook.filmModelClaimable = deployTxFilmClaimable.address;

    await fs.writeFile(addressesPath, JSON.stringify(addressBook, null, 2));

    console.log('Deploying Film Factory...');
    const deployTxFilmFactory = await new InternetCameraFilmFactory__factory(
      wallet
    ).deploy(
      addressBook.camera,
      deployTxFilmPersonal.address,
      deployTxFilmClaimable.address,
      addressBook.forwarder
    );
    console.log('Deploy TX: ', deployTxFilmFactory.deployTransaction.hash);
    await deployTxFilmFactory.deployed();
    console.log('FilmFactory deployed at ', deployTxFilmFactory.address);
    addressBook.filmFactory = deployTxFilmFactory.address;
    await fs.writeFile(addressesPath, JSON.stringify(addressBook, null, 2));

    await camera.setFilmFactoryAddress(deployTxFilmFactory.address);
  }

  console.log('Deployed!');
}

start().catch((e: Error) => {
  console.error(e);
  process.exit(1);
});
