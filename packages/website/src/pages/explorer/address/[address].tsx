import { GetServerSideProps } from 'next';
import {
  useWalletFilmForAddress,
  useWalletPhotosForAddress
} from '@internetcamera/sdk/dist/react';

import AddressAvatar from '@app/components/AddressAvatar';
import PhotoGrid from '@app/components/collections/PhotoGrid';
import FilmGrid from '@app/components/collections/FilmGrid';

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { address }: { address?: string } = ctx.query;
  return {
    props: { address }
  };
};

const Wallet = ({ address }: { address: string }) => {
  const { filmHoldings } = useWalletFilmForAddress(
    address,
    process.env.NEXT_PUBLIC_GRAPH_URL as string
  );
  const { photos } = useWalletPhotosForAddress(
    address,
    process.env.NEXT_PUBLIC_GRAPH_URL as string
  );
  return (
    <div className="wallet">
      <div className="header">
        <div className="title">
          <AddressAvatar address={address} size={100} />
        </div>
        <div className="subtitle">{address.slice(0, 6)}</div>
      </div>
      {photos && (
        <>
          <h1>Photos created</h1>
          <PhotoGrid photos={photos.photosCreated as any} />
          <h1>Photos owned</h1>
          <PhotoGrid photos={photos.photosOwned as any} />
        </>
      )}
      {filmHoldings && (
        <>
          <h1>Film owned</h1>
          <FilmGrid films={filmHoldings.map(holding => holding.film as any)} />
        </>
      )}
      <style jsx>{`
        .header {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 75px;
        }
        .title {
          font-weight: bold;
          font-size: 42px;
          margin-bottom: 20px;
        }
        .subtitle {
          font-size: 24px;
        }
      `}</style>
    </div>
  );
};

export default Wallet;
