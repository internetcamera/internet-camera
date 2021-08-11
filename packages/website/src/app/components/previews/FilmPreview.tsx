import Link from 'next/link';
import React from 'react';
import { InternetCameraTypes } from '@internetcamera/sdk';
import { useFilm } from '@internetcamera/sdk/dist/react';

import { formatEther } from 'ethers/lib/utils';

const FilmPreview = ({
  filmAddress,
  initialData
}: {
  filmAddress: string;
  initialData?: InternetCameraTypes.Film;
}) => {
  const { film, error } = useFilm(
    filmAddress,
    process.env.NEXT_PUBLIC_GRAPH_URL as string,
    { initialData }
  );
  if (error) return <div className="error">{error}</div>;
  return (
    <Link href={film ? `/explorer/film/${film.filmAddress}` : '#'}>
      <a className="film-preview">
        <div className="photos">
          {film?.photos && (
            <>
              <div className="col">
                <img
                  src={
                    film.photos[0]?.image
                      ? `${film.photos[0]?.image?.replace(
                          'ipfs://',
                          process.env.NEXT_PUBLIC_IPFS_GATEWAY as string
                        )}.jpg`
                      : 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                  }
                  width={film.photos[0]?.width}
                  height={film.photos[0]?.height}
                />
              </div>
              <div className="col col-split">
                <img
                  src={
                    film.photos[1]?.image
                      ? `${film.photos[1]?.image?.replace(
                          'ipfs://',
                          process.env.NEXT_PUBLIC_IPFS_GATEWAY as string
                        )}.jpg`
                      : 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                  }
                  width={film.photos[1]?.width}
                  height={film.photos[1]?.height}
                />

                <img
                  src={
                    film.photos[2]?.image
                      ? `${film.photos[2]?.image?.replace(
                          'ipfs://',
                          process.env.NEXT_PUBLIC_IPFS_GATEWAY as string
                        )}.jpg`
                      : 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                  }
                  width={film.photos[2]?.width}
                  height={film.photos[2]?.height}
                />
              </div>
            </>
          )}
        </div>
        {film && (
          <div className="meta">
            <div className="name">{film.name}</div>
            <div className="symbol micro">
              {film.symbol} ✸ {film.used} of{' '}
              {parseFloat(formatEther(film.totalSupply)).toLocaleString()} shots
              taken
            </div>
          </div>
        )}
        <style jsx>{`
          .film-preview {
            display: block;
            position: relative;
            width: 100%;
            margin-bottom: 50px;
          }
          .foil {
            position: absolute;
            left: 0;
            width: 10px;
            bottom: 0;
            top: 0;
          }
          .meta {
            position: relative;
            z-index: 100;
          }
          .name {
            font-size: 24px;
            font-weight: bold;
          }
          .symbol {
            font-size: 11px;
            color: #aaa;
          }
          .photos {
            display: flex;
            border-radius: 5px;
            margin-bottom: 10px;
            height: 240px;
            grid-gap: 5px;
            overflow: hidden;
            width: 100%;
          }
          .photos:hover {
            filter: brightness(0.9);
          }
          .photos .col {
            width: 70%;
          }
          .photos .col-split {
            display: flex;
            flex-direction: column;
            gap: 5px;
            width: 30%;
          }
          .photos img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            background: #111;
            border: none;
            outline: none;
          }
          .photos .col-split img {
            height: 50%;
            background-color: #2a2a2a;
          }
        `}</style>
      </a>
    </Link>
  );
};

export default FilmPreview;
