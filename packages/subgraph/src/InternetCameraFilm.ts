import { Transfer } from '../generated/templates/InternetCameraFilm/InternetCameraFilm';
import { Film, Wallet, TransferEvent, WalletFilm } from '../generated/schema';
import { Address, BigInt, log } from '@graphprotocol/graph-ts';

// InternetCameraFilm
export function handleFilmTransfer(event: Transfer): void {
  let fromAddress = event.params.from;
  let toAddress = event.params.to;
  let value = event.params.value;
  let filmAddress = event.address;
  let film = Film.load(filmAddress.toHex());

  let fromId = fromAddress.toHex();
  let fromWallet = Wallet.load(fromId);
  if (!fromWallet) {
    fromWallet = new Wallet(fromId);
    fromWallet.address = fromAddress;
    fromWallet.createdAt = event.block.timestamp;
    fromWallet.save();
  }
  let fromWalletFilmId = fromAddress.toHex() + '-' + filmAddress.toHex();
  let fromWalletFilm = WalletFilm.load(fromWalletFilmId);
  if (!fromWalletFilm) {
    fromWalletFilm = new WalletFilm(fromWalletFilmId);
    fromWalletFilm.wallet = fromWallet.id;
    fromWalletFilm.film = film.id;
    fromWalletFilm.amount = BigInt.fromI32(0);
  }
  if (!isZeroAddress(fromAddress.toHex())) {
    fromWalletFilm.amount = fromWalletFilm.amount.minus(value);
  }
  fromWalletFilm.save();

  let toId = toAddress.toHex();
  let toWallet = Wallet.load(toId);
  if (!toWallet) {
    toWallet = new Wallet(toId);
    toWallet.address = toAddress;
    toWallet.createdAt = event.block.timestamp;
    toWallet.save();
  }
  let toWalletFilmId = toAddress.toHex() + '-' + filmAddress.toHex();
  let toWalletFilm = WalletFilm.load(toWalletFilmId);
  if (!toWalletFilm) {
    toWalletFilm = new WalletFilm(toWalletFilmId);
    toWalletFilm.wallet = toWallet.id;
    toWalletFilm.film = film.id;
    toWalletFilm.amount = BigInt.fromI32(0);
  }
  toWalletFilm.amount = toWalletFilm.amount.plus(value);
  toWalletFilm.save();

  let transferEvent = new TransferEvent(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  transferEvent.type = 'FILM';
  transferEvent.film = film.id;
  transferEvent.amount = value;
  transferEvent.from = fromWallet.id;
  transferEvent.to = toWallet.id;
  transferEvent.txHash = event.transaction.hash;
  transferEvent.createdAt = event.block.timestamp;
  transferEvent.save();
}

function isZeroAddress(string: string): boolean {
  return string == '0x0000000000000000000000000000000000000000';
}
