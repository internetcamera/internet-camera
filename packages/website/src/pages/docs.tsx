import React, { FunctionComponent } from 'react';

const Docs: FunctionComponent = () => {
  return (
    <div className="docs-page">
      <div className="header">
        <div className="title">
          Build your own camera products for the new internet.
        </div>
        <div className="subtitle">
          Typescript SDK for Browsers & Node.js & React Native, React Hooks for
          React & React Native, GraphQL, Tutorial (webcam photo booth), Tutorial
          (share page)
        </div>
      </div>
      <div className="docs">
        <div className="sidebar">
          <div className="section">
            <div className="sidebar-header micro">General</div>
          </div>
          <div className="section">
            <div className="sidebar-header micro">Smart Contracts</div>
          </div>
          <div className="section">
            <div className="sidebar-header micro">GraphQL API</div>
          </div>
          <div className="section">
            <div className="sidebar-header micro">TypeScript SDK</div>
          </div>
          <div className="section">
            <div className="sidebar-header micro">React Hooks</div>
          </div>
        </div>
        <div className="main">
          <h1>Overview</h1>
        </div>
      </div>
      <style jsx>{`
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
          background-color: rgba(0, 0, 0, 0.4);
          box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
            rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
          border-radius: 3px;
          padding: 20px;
          min-width: 350px;
          min-height: 500px;
        }
        .section {
          margin-bottom: 20px;
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
      `}</style>
    </div>
  );
};

export default Docs;
