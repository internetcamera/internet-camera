import Camera from '@app/components/graphics/Camera';
import { useWallet } from '@gimmixfactory/use-wallet';
import { useRouter } from 'next/dist/client/router';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  const { route } = useRouter();
  const { account, connect } = useWallet();
  return (
    <header>
      <Link href="/">
        <a className="internet-camera link">
          <Camera />
        </a>
      </Link>

      <div className="navigation">
        <Link href="/explorer">
          <a
            className={`link ${route.startsWith('/explorer') ? 'active' : ''}`}
          >
            Explorer
          </a>
        </Link>

        <Link href="/film">
          <a className={`link ${route.startsWith('/film') ? 'active' : ''}`}>
            Film
          </a>
        </Link>

        <Link href="/apps">
          <a className={`link ${route.startsWith('/apps') ? 'active' : ''}`}>
            Apps
          </a>
        </Link>

        <Link href="/developers">
          <a
            className={`link ${
              route.startsWith('/developers') ? 'active' : ''
            }`}
          >
            Developers
          </a>
        </Link>

        <Link href="/about">
          <a className={`link ${route.startsWith('/about') ? 'active' : ''}`}>
            About
          </a>
        </Link>
      </div>

      <div className="account">
        {!account ? (
          <button
            className="wallet"
            onClick={() =>
              connect({
                cacheProvider: true,
                providerOptions: {
                  walletconnect: {
                    package: WalletConnectProvider,
                    options: {
                      infuraId: process.env.NEXT_PUBLIC_INFURA_ID as string
                    }
                  }
                }
              })
            }
          >
            Connect Wallet
          </button>
        ) : (
          <Link href={`/explorer/address/${account}`}>
            <a className="wallet">{account.slice(0, 8)}</a>
          </Link>
        )}
      </div>

      <style jsx>{`
        header {
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 999;
          backdrop-filter: blur(5px);
          background-color: hsla(197, 10%, 14%, 95%);
        }
        .navigation {
          display: flex;
          gap: 40px;
        }
        .link {
          font-size: 18px;
        }
        .active,
        .link:hover {
          text-decoration: underline;
          text-underline-offset: 10px;
        }
        .internet-camera {
          width: 36px;
          margin-right: 114px;
          text-decoration: none !important;
        }
        .wallet {
          text-align: center;
          outline: none;
          border: none;
          cursor: pointer;
          background-image: linear-gradient(to right, #0066ff, #6e00ff);
          color: white;
          padding: 5px 15px;
          border-radius: 5px;
          font-size: 14px;
          font-weight: bold;
          text-shadow: 0px 0px 1px rgba(0, 0, 0, 5%);
          box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
            rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .account {
          width: 130px;
          display: flex;
          justify-content: flex-end;
        }
        .link:hover {
        }
        .join:hover {
          text-decoration: none;
        }
        @media (max-width: 768px) {
        }
      `}</style>
    </header>
  );
};

export default Header;
