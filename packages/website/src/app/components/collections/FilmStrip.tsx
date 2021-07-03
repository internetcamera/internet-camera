import React from 'react';
import { Film } from '@internetcamera/sdk/dist/types';
import Link from 'next/link';

const FilmStrip = ({ film, filterOut }: { film: Film; filterOut?: string }) => {
  return (
    <div className="filmstrip">
      <Link href={`/explorer/film/${film.filmAddress}`}>
        <a className="name micro">More photos in {film.name}</a>
      </Link>
      <div className="strip">
        {film.photos
          .filter(photo => photo.tokenId != filterOut)
          .map(photo => (
            <Link
              href={`/explorer/film/${film.filmAddress}/${photo.filmIndex}?tokenId=${photo.tokenId}`}
              key={photo.id}
            >
              <a className="photo">
                <span className="index micro">
                  #{parseInt(`${photo.filmIndex}`) + 1}
                </span>
                <img
                  src={photo.image.replace(
                    'ipfs://',
                    process.env.NEXT_PUBLIC_IPFS_GATEWAY as string
                  )}
                  width={photo.width}
                  height={photo.height}
                />
              </a>
            </Link>
          ))}
      </div>
      <style jsx>{`
        .filmstrip {
          background-color: rgba(0, 0, 0, 0.4);
          box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
            rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
          padding: 10px 15px;
          border-radius: 5px;
        }

        .strip {
          height: 100px;
          display: flex;
          gap: 10px;
        }
        .name {
          display: block;
          padding: 5px 3px;
          margin-bottom: 5px;
          font-size: 10px;
          text-transform: uppercase;
        }
        .photo {
          position: relative;
        }
        .index {
          position: absolute;
          left: 0;
          bottom: 0;
          padding: 3px 5px;
          font-size: 10px;
          font-weight: bold;
          text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
        }
        img {
          border-radius: 5px;
          height: 100%;
          width: auto;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default FilmStrip;
