import Head from 'next/head';
import React, { ReactNode } from 'react';
import Header from './Header';
import { FaExclamationCircle, FaGithub, FaTwitter } from 'react-icons/fa';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="main-layout">
      <Head>
        <title>Internet Camera</title>
        <link key="icon" rel="shortcut icon" href="/static/icon.png" />
      </Head>
      <Header />
      <main>{children}</main>
      <footer>
        <a href="https://github.com/internetcamera" target="_blank">
          <FaGithub />
        </a>
        <a href="https://twitter.com/internetcamera" target="_blank">
          <FaTwitter />
        </a>
      </footer>
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
          height: 100%;
        }
        main {
          flex: 1 1 auto;
          padding: 15px;
          padding-bottom: 150px;
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
        footer {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 40px;
          font-size: 24px;
          padding-bottom: 100px;
          color: #ccc;
        }
        .testnet {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 10px 20px;
          background-color: hsl(260, 100%, 15%);
          color: #ccc;
          font-size: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .testnet :global(svg) {
          display: block;
        }
        @media (max-width: 768px) {
          .testnet {
            font-size: 11px;
            font-family: 'Helvetica Now Micro';
            padding: 15px;
          }
          .testnet :global(svg) {
            display: none;
          }
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
          background-color: hsl(221, 11%, 8%);
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
