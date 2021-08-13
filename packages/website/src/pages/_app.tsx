import React from 'react';
import type { AppProps } from 'next/app';
import MainLayout from '@app/layouts/MainLayout';
import PlausibleProvider from 'next-plausible';
import InternetCamera from '@internetcamera/react-hooks';

function App({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="internet.camera" exclude="/utils/rn-wallet">
      <InternetCamera.Provider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </InternetCamera.Provider>
    </PlausibleProvider>
  );
}

export default App;
