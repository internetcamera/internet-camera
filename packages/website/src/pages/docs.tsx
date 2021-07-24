import React, { FunctionComponent, useState } from 'react';

const Docs: FunctionComponent = () => {
  const [tab, setTab] = useState('overview');
  return (
    <div className="page">
      <div className="sidebar">
        <div className="section">
          <div
            className={`sidebar-header ${tab == 'overview' ? 'active' : ''}`}
            onClick={() => setTab('overview')}
          >
            Overview
          </div>
        </div>
        <div className="section">
          <div
            className={`sidebar-header ${
              tab == 'smart-contracts' ? 'active' : ''
            }`}
            onClick={() => setTab('smart-contracts')}
          >
            Smart Contracts
          </div>
        </div>
        <div className="section">
          <div
            className={`sidebar-header ${tab == 'graphql-api' ? 'active' : ''}`}
            onClick={() => setTab('graphql-api')}
          >
            GraphQL API
          </div>
        </div>
        <div className="section">
          <div
            className={`sidebar-header ${
              tab == 'typescript-sdk' ? 'active' : ''
            }`}
            onClick={() => setTab('typescript-sdk')}
          >
            TypeScript SDK
          </div>
        </div>
        <div className="section">
          <div
            className={`sidebar-header ${tab == 'react-hooks' ? 'active' : ''}`}
            onClick={() => setTab('react-hooks')}
          >
            React Hooks
          </div>
        </div>
        <div className="section">
          <div
            className={`sidebar-header ${
              tab == 'other-languages' ? 'active' : ''
            }`}
            onClick={() => setTab('other-languages')}
          >
            Other Languages
          </div>
        </div>
        <div className="section">
          <div
            className={`sidebar-header ${
              tab == 'booth-tutorial' ? 'active' : ''
            }`}
            onClick={() => setTab('booth-tutorial')}
          >
            Booth Tutorial
          </div>
        </div>
        <div className="section">
          <div
            className={`sidebar-header ${
              tab == 'gallery-tutorial' ? 'active' : ''
            }`}
            onClick={() => setTab('gallery-tutorial')}
          >
            Gallery Tutorial
          </div>
        </div>
      </div>
      <div className="main">
        {tab == 'overview' ? (
          <>
            <div className="title">How the Internet Camera Protocol Works</div>
            <div className="text">
              Internet Camera is a decentralized protocol that allows people to
              shoot and store media on the blockchain.
              <br />
              <br />
              Film makes it easy to shoot photos and make social rolls. Film is
              a customizable token standard that can be exchanged for permanent
              storage of a digital photo in NFT form.
              <br />
              <br />
              Film can be created by anyone and configured in a number of ways,
              including offering exclusive access to Filters, limiting the
              number of photos that can be taken, or fine-tuning permissions
              around things like editing or deleting photos.
              <br />
              <br />
              Film can be sold or transferred like any token on the Ethereum
              blockchain. This lets creators of Film make money for their work
              directly from their users in many different ways where they have
              complete and independent control.
            </div>
          </>
        ) : (
          <div className="text">Coming soon.</div>
        )}
      </div>
      <style jsx>{`
        .page {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 300px 2fr;
          gap: 40px;
          padding-top: 75px;
        }
        .main {
        }
        .title {
          font-weight: bold;
          font-size: 36px;
          margin-bottom: 30px;
        }
        .text {
          font-size: 24px;
          line-height: 1.5em;
          text-align: left;
        }

        .docs {
          max-width: 1200px;
          margin: 0 auto;
          margin-top: 20px;
          flex: 1 1 auto;
          display: flex;
          justify-content: stretch;
          align-items: flex-start;
          gap: 60px;
          padding-bottom: 80px;
        }
        .sidebar {
          position: sticky;
          top: 80px;
          border-right: 1px solid #444;
        }
        .section {
          margin-bottom: 20px;
        }

        .sidebar-header {
          font-size: 18px;
          font-weight: bold;
          color: #888;
          margin-bottom: 10px;
          cursor: pointer;
        }
        .sidebar-header.active {
          color: white;
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
      `}</style>
    </div>
  );
};

export default Docs;
