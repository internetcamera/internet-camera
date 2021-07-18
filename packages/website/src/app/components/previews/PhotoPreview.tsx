import React from 'react';
import { InternetCameraTypes } from '@internetcamera/sdk';
import { usePhoto } from '@internetcamera/sdk/dist/react';
import Link from 'next/link';
import dayjs from 'dayjs';

import AddressAvatar from '../AddressAvatar';

const PhotoPreview = ({
  tokenId,
  initialData
}: {
  tokenId: string;
  initialData?: InternetCameraTypes.Photo;
}) => {
  const { photo, error } = usePhoto(
    tokenId,
    process.env.NEXT_PUBLIC_GRAPH_URL as string,
    { initialData }
  );
  if (error) return <div className="error">{error.message}</div>;
  return (
    <Link
      href={
        photo?.film
          ? `/explorer/film/${photo.film.filmAddress}/${photo.filmIndex}?tokenId=${photo.tokenId}`
          : '#'
      }
    >
      <a className="photo">
        <img
          src={`${photo?.image?.replace(
            'ipfs://',
            process.env.NEXT_PUBLIC_IPFS_GATEWAY as string
          )}.jpg`}
          width={photo?.width}
          height={photo?.height}
          style={{ opacity: 0, transition: 'opacity 200ms' }}
          onLoad={e => (e.currentTarget.style.opacity = '1')}
        />
        {photo && (
          <div className="overlay">
            <div className="name">{photo.name}</div>
            <div className="date">
              {dayjs.unix(photo.createdAt).format('MMMM D, YYYY h:mm:ssa')}
            </div>
            <div className="creator micro">
              <AddressAvatar address={photo.creator.address} size={20} />
              {photo.creator.address.slice(0, 6)}
            </div>
          </div>
        )}
        <style jsx>{`
          .photo {
            position: relative;
            transform: scale(1);
            transition: 200ms transform;
            display: block;
            background-color: #111;
            border-radius: 3px;
            overflow: hidden;
            margin-bottom: 20px;
          }
          .photo:hover {
            transform: scale(0.99);
          }
          img {
            width: 100%;
            height: auto;
            border-radius: 3px;
            overflow: hidden;
            background: black;
            display: block;
          }
          .overlay {
            opacity: 0;
            transition: opacity 200ms;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            top: 0;
            background-image: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0%),
              rgba(0, 0, 0, 30%)
            );
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 10px;
          }
          .photo:hover .overlay {
            opacity: 1;
          }
          .name {
            font-size: 14px;
            font-weight: bold;
          }
          .date {
            font-size: 12px;
            opacity: 0.7;
            margin-bottom: 10px;
          }
          .creator {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 10px;
          }
        `}</style>
      </a>
    </Link>
  );
};

export default PhotoPreview;
