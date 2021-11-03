import { GetServerSideProps } from 'next';
import { useFilm } from '@internetcamera/sdk/dist/react';
import { formatEther } from 'ethers/lib/utils';
import PhotoGrid from '@app/components/collections/PhotoGrid';
import { useWallet } from '@gimmixorg/use-wallet';
import { useState } from 'react';
import useSettings from '@app/features/useSettings';
import { ContractTransaction, providers } from 'ethers';

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { filmAddress }: { filmAddress?: string } = ctx.query;
  if (!filmAddress)
    return {
      redirect: { destination: '/404', permanent: false }
    };
  return { props: { filmAddress } };
};

const Film = ({ filmAddress }: { filmAddress: string }) => {
  const { film } = useFilm(
    filmAddress,
    process.env.NEXT_PUBLIC_GRAPH_URL as string
  );
  const { provider, account } = useWallet();
  const [error, _setError] = useState<string>();
  const gasless = useSettings(state => state.gasless);
  const claimFilm = async () => {
    if (!provider || film?.factoryModel != 'claimable' || !account) return;
    try {
      const ClaimableFilm = (await import('@internetcamera/sdk')).ClaimableFilm;
      const claimableFilm = new ClaimableFilm(film.filmAddress, {
        provider,
        jsonRpcProvider: new providers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_RPC_URL
        ),
        forwarderURL: process.env.NEXT_PUBLIC_TX_URL,
        chainID: Number(process.env.NEXT_PUBLIC_CHAIN_ID)
      });
      let tx: ContractTransaction;
      if (!gasless) tx = await claimableFilm.claimFilm(account);
      else tx = await claimableFilm.claimFilmGasless(account);
      const receipt = await tx.wait(1);
      console.log({ receipt, tx });
    } catch (err) {
      console.log(err);
      // setError(err.data.message);
    }
  };
  if (!film) return null;
  return (
    <div className="film">
      <div className="header">
        <div className="title">{film.name}</div>
        <div className="subtitle">
          {film.symbol} <span className="divider">✸</span> {film.photos.length}{' '}
          of {parseFloat(formatEther(film.totalSupply)).toLocaleString()} shots
          taken <span className="divider">✸</span> {film.wallets.length} holders
        </div>
        <div className="links">
          <a
            href={film.tokenURI.replace(
              'ipfs://',
              process.env.NEXT_PUBLIC_IPFS_GATEWAY as string
            )}
            target="_blank"
          >
            Metadata on IPFS ↗
          </a>
        </div>
        {film.factoryModel == 'claimable' && (
          <div className="claim">
            <button onClick={claimFilm}>Claim Film</button>
            {error && <div className="error">{error}</div>}
          </div>
        )}
      </div>
      <div className="grid">
        <PhotoGrid photos={film.photos} />
      </div>
      <style jsx>{`
        .film {
        }
        .header {
          text-align: center;
          padding: 75px;
        }
        .title {
          font-weight: bold;
          font-size: 42px;
          margin-bottom: 40px;
        }
        .subtitle {
          font-size: 24px;
        }
        .divider {
          margin: 0 20px;
        }
        .name {
          font-size: 48px;
          font-weight: bold;
        }
        .claim {
          margin-top: 20px;
        }
        .links {
          margin-top: 20px;
        }
        button {
          padding: 10px 15px;
          background-image: linear-gradient(to bottom, #0066ff, #6e00ff);
          border: none;
          border-radius: 5px;
          outline: none;
          color: white;
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
        }
        button:disabled {
          background: #333;
          color: #888;
        }
        .grid {
          margin-bottom: 40px;
        }
        @media (max-width: 768px) {
          .header {
            padding: 20px 10px;
          }
          .name {
            font-size: 18px;
          }
          .subtitle {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Film;
