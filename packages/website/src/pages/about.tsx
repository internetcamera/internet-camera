import React, { FunctionComponent } from 'react';

const About: FunctionComponent = () => {
  return (
    <div className="page">
      <div className="header">
        <div className="title">
          Public infrastructure for the next era of camera products.
        </div>
        <div className="subtitle">
          The Internet Camera protocol is currently running in a private
          beta, and documentation is coming soon.
          <br />
          <br />
          The protocol is designed to be fully decentralized, financially
          sustainable, and publicly owned. More details on transitioning the
          protocol to a publicly governed organization will be available soon.
          <br />
          <br />
          We are looking for more input and feedback from photographers, filter
          creators, and others working in the existing social camera ecosystem.
          <br />
          <br />
          <br />
          <div className="buttons">
            <a href="mailto:hello@internet.camera" className="button">
              Say Hello
            </a>
          </div>
        </div>
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
        .buttons {
          text-align: center;
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

export default About;
