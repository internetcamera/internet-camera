import { useQuery } from '@internetcamera/sdk/dist/react';
import { gql } from 'graphql-request';
import React from 'react';
import PhotoGrid from '../collections/PhotoGrid';

const PhotoExplorer = ({
  address,
  orderDirection
}: {
  address: string;
  orderDirection: string;
}) => {
  const { data, error } = useQuery(
    gql`
      {
        filmPhotos: photos(first: 100, orderBy: createdAt, orderDirection: ${orderDirection}${
      address.length ? `, where: {film: "${address.toLowerCase()}"}` : ''
    }) {
          ...fields
        }
        creatorPhotos: photos(first: 100, orderBy: createdAt, orderDirection: ${orderDirection}${
      address.length ? `, where: {creator: "${address.toLowerCase()}"}` : ''
    }) {
          ...fields
        }
        ownerPhotos: photos(first: 100, orderBy: createdAt, orderDirection: ${orderDirection}${
      address.length ? `, where: {owner: "${address.toLowerCase()}"}` : ''
    }) {
          ...fields
        }
      }
      fragment fields on Photo {
        id
        name
        image
        width
        height
        filmIndex
        tokenId
        creator {
          address
        }
        owner {
          address
        }
        createdAt
      }
    `,
    {},
    process.env.NEXT_PUBLIC_GRAPH_URL
  );
  let photos = data
    ? [data?.filmPhotos, data?.creatorPhotos, data?.ownerPhotos].flat()
    : [];
  photos = photos.filter((p, i) => i == photos.findIndex(n => n.id == p.id));
  if (error) return <div className="error">{error}</div>;
  return <>{photos && <PhotoGrid photos={photos} />}</>;
};

export default React.memo(PhotoExplorer);
