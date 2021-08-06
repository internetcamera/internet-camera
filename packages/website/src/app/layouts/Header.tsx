import { useWallet } from "@gimmixfactory/use-wallet";
import { useRouter } from "next/dist/client/router";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Link from "next/link";
import React, { useState } from "react";
import { useWalletFilmForAddress } from "@internetcamera/sdk/dist/react";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { FaBars } from "react-icons/fa";
import ENSNameOrAddress from "@app/components/ENSNameOrAddress";

const Header = () => {
  const { route } = useRouter();
  const { account, connect } = useWallet();
  const { filmHoldings } = useWalletFilmForAddress(
    account || "0x0000000000000000000000000000000000000000",
    process.env.NEXT_PUBLIC_GRAPH_URL
  );
  const totalHoldings = parseFloat(
    formatEther(
      filmHoldings
        ?.map((h) => h.amount)
        .reduce(
          (a, b) => BigNumber.from(a).add(BigNumber.from(b)),
          BigNumber.from(0)
        ) || 0
    )
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header>
      <Link href="/">
        <a className="internet-camera link">Internet Camera</a>
      </Link>

      <div className="navigation" onClick={() => setMobileMenuOpen(false)}>
        <Link href="/">
          <a className="mobile home">Home</a>
        </Link>

        <Link href="/explorer">
          <a
            className={`link ${route.startsWith("/explorer") ? "active" : ""}`}
          >
            Explorer
          </a>
        </Link>

        <Link href="/film">
          <a className={`link ${route.startsWith("/film") ? "active" : ""}`}>
            Film
          </a>
        </Link>

        <Link href="/apps">
          <a className={`link ${route.startsWith("/apps") ? "active" : ""}`}>
            Apps
          </a>
        </Link>

        <Link href="/docs">
          <a
            className={`link desktop-only ${
              route.startsWith("/docs") ? "active" : ""
            }`}
          >
            Docs
          </a>
        </Link>

        <Link href="/about">
          <a className={`link ${route.startsWith("/about") ? "active" : ""}`}>
            About
          </a>
        </Link>
      </div>

      <div className="account">
        {!account ? (
          <button
            className="connect"
            onClick={() =>
              connect({
                cacheProvider: true,
                providerOptions: {
                  walletconnect: {
                    package: WalletConnectProvider,
                    options: {
                      infuraId: process.env.NEXT_PUBLIC_INFURA_ID as string,
                    },
                  },
                },
              })
            }
          >
            Connect Wallet
          </button>
        ) : (
          <>
            <Link href="/settings">
              <a className="settings micro">Settings</a>
            </Link>
            <div className="holdings micro">
              {totalHoldings.toLocaleString()} FILM
            </div>
            <Link href={`/explorer/address/${account}`}>
              <a className="wallet">
                <ENSNameOrAddress address={account}></ENSNameOrAddress>
              </a>
            </Link>
          </>
        )}
      </div>
      <div className="mobile-nav" onClick={() => setMobileMenuOpen(true)}>
        <FaBars />
      </div>
      <style jsx>{`
        header {
          padding: 20px;
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          position: sticky;
          top: 0;
          background-color: hsla(171, 18%, 8%, 10%);
          backdrop-filter: blur(10px);
          z-index: 999;
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
          width: 300px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-weight: bold;
          font-size: 22px;
          text-decoration: none !important;
        }
        .settings {
          font-size: 12px;
          padding: 5px 20px;
          color: #ccc;
        }
        .connect {
          text-align: center;
          outline: none;
          border: none;
          cursor: pointer;
          background-color: #111;
          color: hsl(250, 100%, 100%);
          padding: 8px 18px;
          border-radius: 5px;
          font-size: 14px;
          font-weight: bold;
          text-shadow: 0px 0px 1px rgba(0, 0, 0, 5%);
          text-overflow: ellipsis;
          white-space: nowrap;
          box-shadow: 0px 0px 4px 1px purple, 1px 1px 4px 0px blue !important;
        }
        .holdings {
          padding: 7.5px 10px;
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          font-size: 11px;
          border: 1px solid rgba(0, 0, 0, 0.4);
          border-right: none;
          color: #ccc;
          box-shadow: 0px 0px 4px 1px purple, 1px 1px 4px 0px blue !important;
        }
        .wallet {
          padding: 5px 15px;
          border: 1px solid rgba(0, 0, 0, 0.4);
          border-left: none;
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 5px;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          font-size: 14px;
          box-shadow: 0px 0px 4px 1px purple, 1px 1px 4px 0px blue !important;
        }
        .account {
          width: 300px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
        .link:hover {
        }
        .join:hover {
          text-decoration: none;
        }
        .mobile-nav {
          display: none;
        }
        @media (max-width: 768px) {
          .connect {
            display: none;
          }
          .navigation {
            pointer-events: ${!mobileMenuOpen ? "none" : "default"};
            opacity: ${!mobileMenuOpen ? 0 : 1};
            transition: opacity 250ms;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.97);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 30px;
          }
          .link {
            font-size: 18px;
            font-weight: bold;
            display: block;
          }
          header {
            padding: 10px 15px;
            align-items: center;
          }
          .internet-camera {
            font-size: 18px;
          }
          .account,
          .internet-camera {
            width: auto;
          }
          .mobile-nav {
            font-size: 18px;
            padding: 3px;
            display: block;
          }
          .mobile-nav :global(svg) {
            display: block;
          }
          .desktop-only {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
