import Head from 'next/head';
import React, { ReactNode } from 'react';
import Header from './Header';
import { FaExclamationCircle } from 'react-icons/fa';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="main-layout">
      <Head>
        <title>Internet Camera</title>
        <link
          rel="shortcut icon"
          href="https://internet.camera/static/icon.png"
        />
      </Head>
      <Header />
      <main>{children}</main>
      <div id="gradient1" />
      <div id="gradient2" />
      <div className="testnet">
        <FaExclamationCircle />
        Internet Camera is currently running on test networks only. Photo
        storage should not be considered permanent. Film and Photos should not
        be traded for real money on the test networks.
      </div>
      <style jsx>{`
        .main-layout {
          display: flex;
          flex-direction: column;
          justify-content: stretch;
          align-items: stretch;
        }
        main {
          flex: 1 1 auto;
          padding: 20px 20px;
        }
        #gradient1 {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          width: 200vw;
          height: 200vh;
          mix-blend-mode: color;
          background: radial-gradient(
            50% 50% at 60% 60%,
            #03018810 0,
            rgba(255, 255, 255, 0) 100%
          );
          transform: translate(-40vw, -40vh);
          z-index: 0;
        }
        #gradient2 {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          width: 200vw;
          height: 200vh;
          mix-blend-mode: color;
          background: radial-gradient(
            50% 50% at 50% 25%,
            #01882310 0,
            rgba(255, 255, 255, 0) 100%
          );
          transform: translate(-50vw, -50vh);
          z-index: 0;
        }
        .testnet {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 10px 30px;
          background-color: hsl(260, 100%, 50%);
          color: white;
          font-size: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .testnet :global(svg) {
          display: block;
        }
      `}</style>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        .container {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
        }
        html,
        body,
        input,
        textarea,
        button,
        option,
        select {
          font-family: 'Helvetica Now', -apple-system, BlinkMacSystemFont,
            'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
            'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
        }
        html,
        body {
          margin: 0;
          padding: 0;
          background-color: hsl(221, 11%, 10%);
          color: white;
        }
        @font-face {
          font-family: 'Helvetica Now';
          src: url('/static/fonts/HelveticaNowDisplay-Regular.otf');
          font-weight: normal;
        }
        @font-face {
          font-family: 'Helvetica Now';
          src: url('/static/fonts/HelveticaNowDisplay-Bold.otf');
          font-weight: bold;
        }
        @font-face {
          font-family: 'Helvetica Now Micro';
          src: url('/static/fonts/HelveticaNowMicro-Regular.otf');
          font-weight: normal;
        }
        @font-face {
          font-family: 'Helvetica Now Micro';
          src: url('/static/fonts/HelveticaNowMicro-Bold.otf');
          font-weight: bold;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        h1 {
          font-weight: bold;
          margin: 0;
          padding: 0;
        }
        .micro {
          font-family: 'Helvetica Now Micro';
        }
      `}</style>
    </div>
  );
};

export default MainLayout;
