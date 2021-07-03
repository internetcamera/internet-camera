import React, { FunctionComponent } from 'react';

const Apps: FunctionComponent = () => {
  return (
    <div className="apps">
      <div className="header">
        <div className="title">
          Anything can be an Internet Camera if it wants to be.
        </div>
        <div className="subtitle">
          Copy about ownership/portability, no lock-in. Easy to get your stuff
          in any app, sell or license it through services, etc. Specialized use
          cases (events, limited editions, etc). Link to developers page?
        </div>
      </div>
      <div className="apps">
        <AppPreview
          name="Cam"
          description="The first NFT camera app. Now on TestFlight."
          image=""
        />
        <AppPreview
          name="Booth"
          description="A simple web camera. Post from your browser!"
          image=""
        />
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
        .apps {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: flex-start;
          gap: 50px;
        }
      `}</style>
    </div>
  );
};

const AppPreview = ({
  name,
  description,
  image
}: {
  name: string;
  description: string;
  image: string;
}) => {
  return (
    <div className="app-preview">
      <div className="image-placeholder" />
      <div className="meta">
        <div className="name">{name}</div>
        <div className="description">{description}</div>
      </div>
      <style jsx>{`
        .app-preview {
          display: flex;
          flex-direction: column;
          width: 300px;
        }
        .image-placeholder {
          width: 300px;
          height: 300px;
          background-color: black;
          border-radius: 5px;
        }
        .meta {
          margin-top: 10px;
          width: 100%;
          text-align: center;
        }
        .name {
          font-size: 28px;
          font-weight: bold;
        }
        .description {
          font-size: 14px;
          color: #ccc;
        }
      `}</style>
    </div>
  );
};

export default Apps;
