import FilmFactory from '@app/components/FilmFactory';
import React, { FunctionComponent } from 'react';

const Film: FunctionComponent = () => {
  return (
    <div className="page">
      <div className="header">
        <div className="title">
          You create the film that makes the Internet Camera work.
        </div>
        <div className="subtitle">
          Film is a new, open format for creating collections of photos. Every
          roll of Film has a limited supply, and each photo published through
          the protocol costs one Film token to post. Film covers all costs of
          processing and long-term storage on a decentralized network.
          <br />
          <br />
          Film is easy for anyone to make. Use Film to make a roll for a
          wedding, a music festival, or an elaborate art project. You pick the
          template, set a size for the roll, and add a filter.
          <br />
          <br />
          Creators of Film can make money on their own terms. The Film format is
          an extension of ERC20, the general token standard used on the Ethereum
          blockchain. What that means is there's a world of apps and services
          that can help you sell or distribute Film, and you don't have to pay
          any fees on the money you make.
        </div>
      </div>
      <div className="factory">
        <FilmFactory />
      </div>
      <style jsx>{`
        .page {
          max-width: 1000px;
          margin: 0 auto;
        }
        .header {
          text-align: center;
          padding: 75px;
        }
        .title {
          font-weight: bold;
          font-size: 56px;
          margin-bottom: 80px;
        }
        .subtitle {
          font-size: 24px;
          line-height: 1.5em;
          text-align: left;
          max-width: 740px;
          margin: 0 auto;
        }
        .film-canister {
          width: 300px;
        }
        .factory {
          margin-bottom: 100px;
        }
        @media (max-width: 768px) {
          .header {
            padding: 25px 0px;
          }
          .title {
            font-size: 22px;
            margin-bottom: 40px;
          }
          .subtitle {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default Film;
