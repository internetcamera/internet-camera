import React, { useEffect, useRef } from 'react';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Head from 'next/head';
import { providers } from 'ethers';
import create from 'zustand';

type StoreState = {
  provider?: providers.Web3Provider;
  account?: string;
};

const useStore = create<StoreState>(set => ({
  provider: undefined,
  account: undefined
}));

const IndexPage = () => {
  const walletConnectProvider = useRef<WalletConnectProvider>();
  const account = useStore(state => state.account);

  useEffect(() => {
    (async () => {
      walletConnectProvider.current = new WalletConnectProvider({
        infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
        qrcode: false,
        bridge: 'https://b.bridge.walletconnect.org'
      });
      walletConnectProvider.current.connector.on(
        'display_uri',
        (_err, payload) => {
          const uri = payload.params[0];
          postMessage('uri', uri);
        }
      );
      walletConnectProvider.current.connector.on('connect', () => refresh());
      await walletConnectProvider.current.enable();
    })();
  }, []);

  const refresh = async () => {
    if (!walletConnectProvider.current) return;
    let provider = useStore.getState().provider;
    if (!provider) {
      provider = new providers.Web3Provider(walletConnectProvider.current);
      useStore.setState({ provider });
    }
    const account = (await provider.listAccounts())[0];
    useStore.setState({ account });
    postMessage('account', account);
  };

  const disconnect = async () => {
    await walletConnectProvider.current?.disconnect();
    await useStore.setState({ provider: undefined, account: undefined });
    postMessage('account', null);
    setTimeout(() => location.reload(), 500);
  };

  useEffect(() => {
    (window as any).refresh = refresh;
    (window as any).signTypedData = signTypedData;
    (window as any).disconnect = disconnect;
  }, []);

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="index">
      <Head>
        <title>Cam</title>
        <link key="icon" rel="shortcut icon" href="/static/cam-icon.png" />
      </Head>
      {account && (
        <>
          <pre>{account}</pre>
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
        </>
      )}
      <style jsx>{`
        .index {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: black;
          color: white;
          font-family: ui-rounded, 'SF Pro Rounded', system-ui, san-serif;
          z-index: 100000000;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: center;
          justify-content: center;
        }
        pre {
          word-wrap: break-word;
          white-space: pre-wrap;
        }
      `}</style>
    </div>
  );
};

const postMessage = async (type: string, message: any) => {
  if ((window as any).ReactNativeWebView)
    (window as any).ReactNativeWebView.postMessage(
      JSON.stringify({ type, message })
    );
};

const signTypedData = async (message: string) => {
  const provider = useStore.getState().provider;
  if (!provider) return;
  const data = JSON.parse(message);
  const signature = await provider
    .getSigner()
    ._signTypedData(data.domain, data.types, data.message);
  postMessage('signature', signature);
};

export default IndexPage;
