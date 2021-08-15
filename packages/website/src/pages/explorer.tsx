import React, { useState } from 'react';
import FilmExplorer from '@app/components/explorer/FilmExplorer';
import PhotoExplorer from '@app/components/explorer/PhotoExplorer';
import ActivityExplorer from '@app/components/explorer/ActivityExplorer';

const Explorer = () => {
  const [address, setAddress] = useState('');
  const [orderDirection, setOrderDirection] = useState('desc');
  const [seeOption, setSeeOption] = useState<'photos' | 'films' | 'activity'>(
    'photos'
  );
  // const [viewAs, setViewAs] = useState<'list' | 'grid'>('grid');
  return (
    <div className="explorer">
      <div className="main">
        <div className="sidebar">
          <div className="section">
            <input
              type="text"
              placeholder="Search for photos, film, or wallets..."
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
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
              onClick={() => setSeeOption('activity')}
              className={`sidebar-button micro ${
                seeOption == 'activity' ? 'sidebar-button-selected' : ''
              }`}
            >
              Activity
            </div>
          </div>
          <div className="section">
            <div className="sidebar-header micro">Sort by</div>
            <div
              onClick={() => setOrderDirection('desc')}
              className={`sidebar-button micro ${
                orderDirection == 'desc' ? 'sidebar-button-selected' : ''
              }`}
            >
              Newest → Oldest
            </div>
            <div
              onClick={() => setOrderDirection('asc')}
              className={`sidebar-button micro ${
                orderDirection == 'asc' ? 'sidebar-button-selected' : ''
              }`}
            >
              Oldest → Newest
            </div>
          </div>
          {/* <div className="section">
            <div className="sidebar-header micro">View as</div>
            <div
              onClick={() => setViewAs('grid')}
              className={`sidebar-button micro ${
                viewAs == 'grid' ? 'sidebar-button-selected' : ''
              }`}
            >
              Grid
            </div>
            <div
              onClick={() => setViewAs('list')}
              className={`sidebar-button micro ${
                viewAs == 'list' ? 'sidebar-button-selected' : ''
              }`}
            >
              List
            </div>
          </div> */}
        </div>
        {seeOption == 'photos' && (
          <PhotoExplorer address={address} orderDirection={orderDirection} />
        )}
        {seeOption == 'films' && (
          <FilmExplorer address={address} orderDirection={orderDirection} />
        )}
        {seeOption == 'activity' && (
          <ActivityExplorer address={address} orderDirection={orderDirection} />
        )}
      </div>
      <style jsx>{`
        .explorer {
          width: 100%;
          min-height: 100%;
          display: flex;
          flex-direction: column;
        }
        .main {
          flex: 1 1 auto;
          display: flex;
          justify-content: stretch;
          align-items: flex-start;
          gap: 40px;
          padding-bottom: 80px;
        }
        .sidebar {
          position: sticky;
          top: 90px;
          min-width: 300px;
          min-height: 200px;
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
        .section:last-of-type {
          margin-bottom: 0;
        }
        @media (max-width: 768px) {
          .explorer {
            display: block;
          }
          .main {
            display: block;
          }
          .sidebar {
            position: relative;
            top: 0;
            margin-bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Explorer;
