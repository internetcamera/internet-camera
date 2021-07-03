import {
  FilmRegistered,
  PhotoPosted,
  Transfer,
  InternetCamera
} from '../generated/InternetCamera/InternetCamera';
import { InternetCameraFilm as InternetCameraFilmTemplate } from '../generated/templates';
import { InternetCameraFilm } from '../generated/templates/InternetCameraFilm/InternetCameraFilm';
import { Photo, Film, TransferEvent, Wallet } from '../generated/schema';
import { Bytes, ipfs } from '@graphprotocol/graph-ts';
import { json } from '@graphprotocol/graph-ts';
import { log } from '@graphprotocol/graph-ts';

// Internet Camera
export function handleFilmRegistered(event: FilmRegistered): void {
  log.info('Processing FilmRegistered({}, {})', [
    event.params.creatorAddress.toHex(),
    event.params.filmAddress.toHex()
  ]);

  let film = new Film(event.params.filmAddress.toHex());
  InternetCameraFilmTemplate.create(event.params.filmAddress);
  let filmContract = InternetCameraFilm.bind(event.params.filmAddress);

  film.filmAddress = event.params.filmAddress;

  let creatorId = event.params.creatorAddress.toHex();
  let creatorWallet = Wallet.load(creatorId);
  if (!creatorWallet) {
    creatorWallet = new Wallet(creatorId);
    creatorWallet.address = event.params.creatorAddress;
    creatorWallet.createdAt = event.block.timestamp;
    creatorWallet.save();
  }

  film.creator = creatorWallet.id;
  film.name = filmContract.name();
  film.symbol = filmContract.symbol();
  film.totalSupply = filmContract.totalSupply();
  film.startTime = filmContract.startTime();
  film.expireTime = filmContract.expireTime();
  film.createdAt = event.block.timestamp;
  film.tokenURI = filmContract.tokenURI();

  if (film.tokenURI != '') {
    log.info('handleFilmRegistered: tokenURI {}', [film.tokenURI.toString()]);
    let metadata = ipfs.cat(film.tokenURI.toString().slice(7));
    if (metadata != null) {
      let value = json.fromBytes(metadata as Bytes);
      if (!value.isNull()) {
        film.factoryModel = value
          .toObject()
          .get('factoryModel')
          .toString();
      }
    }
  }

  film.save();
}

export function handlePhotoPosted(event: PhotoPosted): void {
  let photo = new Photo(event.params.photoIndex.toString());
  let photoContract = InternetCamera.bind(event.address);

  photo.tokenId = event.params.photoIndex;

  let creatorId = event.params.creatorAddress.toHex();
  let creatorWallet = Wallet.load(creatorId);
  if (!creatorWallet) {
    creatorWallet = new Wallet(creatorId);
    creatorWallet.address = event.params.creatorAddress;
    creatorWallet.createdAt = event.block.timestamp;
    creatorWallet.save();
  }

  photo.creator = creatorWallet.id;
  photo.owner = creatorWallet.id;
  photo.filmIndex = event.params.filmIndex;
  photo.tokenURI = photoContract.tokenURI(photo.tokenId);

  log.info('handlePhotoPosted: tokenURI {}', [photo.tokenURI.toString()]);
  let metadata = ipfs.cat(photo.tokenURI.toString().slice(7));
  if (metadata != null) {
    let value = json.fromBytes(metadata as Bytes);
    if (!value.isNull()) {
      photo.name = value
        .toObject()
        .get('name')
        .toString();
      photo.description = value
        .toObject()
        .get('description')
        .toString();
      photo.image = value
        .toObject()
        .get('image')
        .toString();
      photo.width = value
        .toObject()
        .get('width')
        .toBigInt();
      photo.height = value
        .toObject()
        .get('height')
        .toBigInt();
    }
  }

  let film = Film.load(event.params.filmAddress.toHex());
  photo.film = film.id;
  photo.createdAt = event.block.timestamp;

  photo.save();
}

export function handlePhotoTransfer(event: Transfer): void {
  let fromAddress = event.params.from;
  let toAddress = event.params.to;
  let tokenId = event.params.tokenId;

  let fromId = fromAddress.toHex();
  let fromWallet = Wallet.load(fromId);
  if (!fromWallet) {
    fromWallet = new Wallet(fromId);
    fromWallet.address = fromAddress;
    fromWallet.createdAt = event.block.timestamp;
    fromWallet.save();
  }

  let toId = toAddress.toHex();
  let toWallet = Wallet.load(toId);
  if (!toWallet) {
    toWallet = new Wallet(toId);
    toWallet.address = toAddress;
    toWallet.createdAt = event.block.timestamp;
    toWallet.save();
  }

  let photo = Photo.load(tokenId.toString());
  if (photo != null) {
    photo.owner = toWallet.id;
    photo.save();
  }

  let transferEvent = new TransferEvent(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  transferEvent.type = 'PHOTO';
  transferEvent.photo = tokenId.toString();
  transferEvent.from = fromWallet.id;
  transferEvent.to = toWallet.id;
  transferEvent.txHash = event.transaction.hash;
  transferEvent.createdAt = event.block.timestamp;
  transferEvent.save();
}
