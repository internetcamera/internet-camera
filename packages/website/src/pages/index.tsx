import Link from 'next/link';
import React, { FunctionComponent } from 'react';

const Index: FunctionComponent = () => {
  return (
    <div className="page">
      <div className="header">
        <div className="title">
          A New Way to Shoot Photos, Make Filters, and Get Paid
        </div>
        <div className="subtitle">A camera protocol, owned by everyone.</div>
        <Link href="/film">
          <a className="button">Learn more</a>
        </Link>
      </div>
      <style jsx>{`
        .page {
          max-width: 1000px;
          margin: 0 auto;
        }
        .header {
          text-align: center;
          padding: 75px;
          padding-top: 150px;
          max-width: 1000px;
          margin: 0 auto;
        }
        .title {
          font-weight: bold;
          font-size: 64px;
          margin-bottom: 30px;
        }
        .subtitle {
          max-width: 640px;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 auto;
          font-size: 32px;
          margin-bottom: 60px;
        }
        .button {
          text-align: center;
          outline: none;
          border: none;
          cursor: pointer;
          background-color: #111;
          color: hsl(250, 100%, 100%);
          padding: 10px 30px;
          border-radius: 5px;
          font-size: 18px;
          font-weight: bold;
          text-shadow: 0px 0px 1px rgba(0, 0, 0, 5%);
          text-overflow: ellipsis;
          white-space: nowrap;
          box-shadow: 0px 0px 4px 1px purple, 1px 1px 4px 0px blue !important;
        }

        @media (max-width: 768px) {
          .header {
            padding: 75px 10px;
          }
          .title {
            font-size: 24px;
          }
          .subtitle {
            font-size: 18px;
            margin-bottom: 60px;
          }
          .button {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
