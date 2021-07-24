import React, { FunctionComponent } from 'react';
import Link from 'next/link';

const Apps: FunctionComponent = () => {
  return (
    <div className="page">
      <div className="header">
        <div className="title">
          One public standard powers your filters, cameras, and galleries.
        </div>
        <div className="subtitle">
          Internet Camera provides a public standard for sharing photos that is
          open to everyone. When you take a photo it's instantly viewable by any
          gallery or feed that's configured to include it. When you make a Film
          roll with a custom filter, it will work with all other cameras
          automatically. There's no platform lock-in.
          <br />
          <br />
          Internet Camera is all about giving you choice and the freedom to
          move. Your photos belong to you and if you get tired of how they're
          being displayed or how your feed is sorted, you can move to any app
          you like and your photos will already be there.
          <br />
          <br />
          Internet Camera is easy to use and build on. You can make a unique
          camera for a wedding, an alternative reality game, or a 3D gallery
          that pulls in photos from multiple rolls. Those shooting photos and
          those making apps have a big creative canvas and total control over
          how they get paid for their work.
        </div>
      </div>
      <div className="apps-list-header">
        Check Out Apps Available Now or Coming Soon
      </div>
      <div className="apps-list">
        <AppPreview
          name="Cam"
          link="https://cam.internet.camera"
          description={
            <>
              The first NFT camera app for iOS.
              <br />
              Now on TestFlight.
            </>
          }
          image="/static/cam-icon.png"
        />
        <AppPreview
          name="Explorer"
          link="/explorer"
          description="Browse and query the public Internet Camera database."
          image="/static/explorer-icon.png"
        />
        <AppPreview
          name="Booth"
          link="#"
          description={
            <>
              A simple camera app for the web.
              <br />
              Available in August 2021.
            </>
          }
          image="/static/booth-icon.png"
        />
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
        }
        .apps-list-header {
          text-align: center;
          font-weight: bold;
          font-size: 24px;
          margin-bottom: 40px;
        }
        .apps-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: flex-start;
          gap: 50px;
          padding-bottom: 100px;
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

const AppPreview = ({
  name,
  description,
  image,
  link
}: {
  name: string;
  description: string | React.ReactNode;
  image: string;
  link: string;
}) => {
  return (
    <Link href={link}>
      <a className="app-preview">
        <div
          className="image-placeholder"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="meta">
          <div className="name">{name}</div>
          <div className="description">{description}</div>
        </div>
        <style jsx>{`
          .app-preview {
            display: flex;
            flex-direction: column;
            width: 250px;
          }
          .image-placeholder {
            width: 250px;
            height: 250px;
            border-radius: 20px;
            overflow: hidden;
            background-color: black;
            background-size: cover;
          }
          .meta {
            padding: 10px;
            width: 100%;
          }
          .name {
            font-size: 28px;
            font-weight: bold;
          }
          .description {
            font-size: 16px;
            color: #ccc;
          }
        `}</style>
      </a>
    </Link>
  );
};

export default Apps;
