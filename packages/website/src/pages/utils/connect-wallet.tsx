import React, { useEffect, useRef } from 'react';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Head from 'next/head';
import { providers } from 'ethers';
import create from 'zustand';

type StoreState = {
  provider?: providers.Web3Provider;
};
const useStore = create<StoreState>(set => ({}));

const IndexPage = () => {
  const walletConnectProvider = useRef<WalletConnectProvider>();
  useEffect(() => {
    (async () => {
      walletConnectProvider.current = new WalletConnectProvider({
        infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
        qrcodeModalOptions: {
          mobileLinks: ['metamask', 'rainbow']
        }
      });
      await walletConnectProvider.current.enable();
      const provider = new providers.Web3Provider(
        walletConnectProvider.current
      );
      useStore.setState({ provider });
      postMessage({ address: (await provider.listAccounts())[0] });
    })();
  }, []);
  const disconnect = async () => {
    await walletConnectProvider.current?.disconnect();
    await useStore.setState({ provider: undefined });
    postMessage({ address: null });
    location.reload();
  };
  useEffect(() => {
    (window as any).checkIfLoggedIn = checkIfLoggedIn;
    (window as any).getAddress = getAddress;
    (window as any).signMessage = signMessage;
    (window as any).disconnect = disconnect;
  }, []);

  return (
    <div className="index">
      <Head>
        <title>Internet Camera</title>
        <link
          rel="shortcut icon"
          href="https://wallet.internet.camera/static/icon.png"
        />
      </Head>
      <style jsx>{`
        .index {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: white;
          color: black;
          font-family: ui-rounded, 'SF Pro Rounded', system-ui, san-serif;
          z-index: 100000000;
          overflow-y: auto;
        }
      `}</style>
      <style jsx global>{`
        .walletconnect-qrcode__base {
          background-color: white !important;
          box-shadow: none !important;
        }
        .walletconnect-modal__base {
          background-color: white !important;
          box-shadow: none !important;
          border-radius: 0 !important;
          padding: 0 !important;
          transform: translateY(-110px) !important;
        }
        .walletconnect-modal__header,
        .walletconnect-modal__mobile__toggle {
          display: none !important;
        }
        .walletconnect-connect__buttons__wrapper__wrap {
          margin: 0 !important;
        }

        .walletconnect-qrcode__text {
          color: black !important;
          margin-bottom: 20px !important;
        }
        .walletconnect-modal__footer a {
          margin: 0 !important;
          padding: 10px 15px !important;
        }
        .walletconnect-connect__button__text {
          color: black !important;
        }
        p#walletconnect-qrcode-text {
          padding-bottom: 0px;
          margin-top: 0;
          padding-top: 0;
        }
        .walletconnect-modal__close__wrapper {
          display: none !important;
        }
        .walletconnect-connect__buttons__wrapper__wrap {
          transform: scale(1.1) !important;
        }
      `}</style>
    </div>
  );
};

const postMessage = async (message: any) => {
  if ((window as any).ReactNativeWebView)
    (window as any).ReactNativeWebView.postMessage(JSON.stringify(message));
};

const checkIfLoggedIn = async () => {
  postMessage({ loggedIn: !!useStore.getState().provider });
};

const getAddress = async () => {
  postMessage({
    address: (await useStore.getState().provider?.listAccounts())?.[0]
  });
};

const signMessage = async (message: string) => {
  const provider = useStore.getState().provider;
  if (!provider) return;
  provider
    .send('eth_signTypedData_v3', [
      (await useStore.getState().provider?.listAccounts())?.[0],
      message
    ])
    .then(signature => {
      postMessage({ signature });
    });
};

export default IndexPage;
