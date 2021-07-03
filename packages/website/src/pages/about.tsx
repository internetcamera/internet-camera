import React, { FunctionComponent } from 'react';

const About: FunctionComponent = () => {
  return (
    <div className="about">
      <div className="header">
        <div className="title">
          Public infrastructure for the next era of camera products.
        </div>
        <div className="subtitle">About copy, links, contact, etc</div>
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
      `}</style>
    </div>
  );
};

export default About;
