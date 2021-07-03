import FilmFactory from '@app/components/FilmFactory';
import React, { FunctionComponent } from 'react';

const Film: FunctionComponent = () => {
  return (
    <div className="film-page">
      <div className="header">
        <div className="title">
          You create the film that makes the Internet Camera work.
        </div>
        <div className="subtitle">
          Each photo published on the Internet Camera is paid for with Film - a
          new currency standard that we've made easy for anyone to create and
          start selling. Film creators just pay a flat fee per photo upfront to
          cover long-term storage costs, then are free to distribute or sell it
          any way they'd like. You can currently create a personal roll of film
          to post your own photos, or make a claimable edition that can be
          distributed online or at events. Film is an extension of the ERC20
          standard, so it can be traded through your Ethereum wallet and
          exchanges like Uniswap.
        </div>
      </div>
      <div className="factory">
        <FilmFactory />
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
          line-height: 1.5em;
        }
        .film-canister {
          width: 300px;
        }
        .factory {
          margin-bottom: 100px;
        }
      `}</style>
    </div>
  );
};

export default Film;
