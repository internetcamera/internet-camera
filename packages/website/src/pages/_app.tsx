import React from 'react';
import type { AppProps } from 'next/app';
import MainLayout from '@app/layouts/MainLayout';
import PlausibleProvider from 'next-plausible';

function App({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="internet.camera">
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </PlausibleProvider>
  );
}

export default App;
