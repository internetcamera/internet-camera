import React, { useState } from 'react';
import Marquee from 'react-fast-marquee';
import {
  useRecentFilms,
  useRecentPhotos,
  useRecentTransferEvents
} from '@internetcamera/sdk/dist/react';
import PhotoGrid from '@app/components/collections/PhotoGrid';
import FilmGrid from '@app/components/collections/FilmGrid';
import TransfersList from '@app/components/collections/TransfersList';

const Explorer = () => {
  const { photos } = useRecentPhotos(
    25,
    process.env.NEXT_PUBLIC_GRAPH_URL as string
  );
  const { films } = useRecentFilms(
    25,
    process.env.NEXT_PUBLIC_GRAPH_URL as string
  );
  const { transferEvents } = useRecentTransferEvents(
    25,
    process.env.NEXT_PUBLIC_GRAPH_URL as string
  );
  const [seeOption, setSeeOption] = useState<'photos' | 'films' | 'transfers'>(
    'photos'
  );
  return (
    <div className="explorer">
      <div className="marquee">
        <Marquee
          className="micro"
          gradientColor={[34, 36, 44]}
          speed={50}
        ></Marquee>
      </div>
      <div className="main">
        <div className="sidebar">
          <div className="section">
            <div className="sidebar-header micro">Search for</div>
            <input type="text" placeholder="Wallet / Film address or ENS..." />
          </div>
          <div className="section">
            <div className="sidebar-header micro">Explore</div>
            <div
              onClick={() => setSeeOption('photos')}
              className={`sidebar-button micro ${
                seeOption == 'photos' ? 'sidebar-button-selected' : ''
              }`}
            >
              Photos
            </div>
            <div
              onClick={() => setSeeOption('films')}
              className={`sidebar-button micro ${
                seeOption == 'films' ? 'sidebar-button-selected' : ''
              }`}
            >
              Film
            </div>
            <div
              onClick={() => setSeeOption('transfers')}
              className={`sidebar-button micro ${
                seeOption == 'transfers' ? 'sidebar-button-selected' : ''
              }`}
            >
              Activity
            </div>
          </div>
          <div className="section">
            <div className="sidebar-header micro">Sort by</div>
            <div className="sidebar-button micro sidebar-button-selected">
              Newest → Oldest
            </div>
            <div className="sidebar-button micro">Oldest → Newest</div>
          </div>
          <div className="section">
            <div className="sidebar-header micro">Filter by</div>
            <div className="sidebar-button micro">•••</div>
            <div className="sidebar-button micro">•••</div>
            <div className="sidebar-button micro">•••</div>
          </div>
        </div>
        {seeOption == 'photos' && photos && <PhotoGrid photos={photos} />}
        {seeOption == 'films' && films && <FilmGrid films={films} />}
        {seeOption == 'transfers' && transferEvents && (
          <TransfersList transferEvents={transferEvents} />
        )}
      </div>
      <style jsx>{`
        .explorer {
          width: 100%;
          min-height: 100%;
          display: flex;
          flex-direction: column;
        }
        .marquee {
          font-size: 10px;
          font-weight: bold;
          text-transform: uppercase;
          margin: 0 -30px;
          color: #ccc;
        }
        .marquee :global(.overlay::before),
        .marquee :global(.overlay::after) {
          pointer-events: none;
        }

        .main {
          flex: 1 1 auto;
          display: flex;
          justify-content: stretch;
          align-items: flex-start;
          gap: 20px;
          padding-bottom: 80px;
        }
        .sidebar {
          position: sticky;
          top: 80px;
          background-color: rgba(0, 0, 0, 0.4);
          box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
            rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
          border-radius: 3px;
          padding: 20px;
          min-width: 300px;
          min-height: 500px;
        }
        .sidebar-header {
          text-transform: uppercase;
          font-size: 12px;
          color: #888;
          margin-bottom: 10px;
        }
        .sidebar-button {
          background: #000;
          border-radius: 5px;
          padding: 10px 15px;
          cursor: pointer;
          margin-bottom: 10px;
          text-transform: uppercase;
          font-size: 11px;
          font-weight: bold;
          color: #888;
          transition: box-shadow 250ms;
        }
        .sidebar-button:hover {
          box-shadow: 0px 0px 4px 1px hsla(300, 100%, 25%, 40%),
            1px 1px 4px 0px hsla(240, 100%, 25%, 40%);
        }
        .sidebar-button-selected {
          color: #ccc;
          box-shadow: 0px 0px 4px 1px purple, 1px 1px 4px 0px blue !important;
        }

        input[type='text'] {
          width: 100%;
          display: block;
          padding: 5px 10px;
          border: none;
          outline: none;
          color: white;
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
          font-size: 16px;
        }
        .section {
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default Explorer;
