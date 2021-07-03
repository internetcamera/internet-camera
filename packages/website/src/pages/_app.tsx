import React from 'react';
import type { AppProps } from 'next/app';
import MainLayout from '@app/layouts/MainLayout';
//@ts-ignore
import { UseWalletProvider } from 'use-wallet';

function App({ Component, pageProps }: AppProps) {
  return (
    <UseWalletProvider
      chainId={1}
      connectors={{
        walletconnect: {
          rpcUrl:
            'https://mainnet.infura.io/v3/31cab49b254143188fc112a0c332ad86'
        }
      }}
    >
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </UseWalletProvider>
  );
}

export default App;
