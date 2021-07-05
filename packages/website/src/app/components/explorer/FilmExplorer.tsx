import { useQuery } from '@internetcamera/sdk/dist/react';
import { gql } from 'graphql-request';
import React from 'react';
import FilmGrid from '../collections/FilmGrid';

const FilmExplorer = ({
  address,
  orderDirection
}: {
  address: string;
  orderDirection: string;
}) => {
  const { data, error } = useQuery(
    gql`
      {
        films(first: 25, orderBy: createdAt, orderDirection: ${orderDirection}${
      address.length ? `, where: {filmAddress: "${address}"}` : ''
    }) {
          ...fields
        }
      }
      fragment fields on Film {
        id
        name
        symbol
        used
        totalSupply
        filmAddress
        photos(first: 3, orderBy: filmIndex) {
          id
          image
          width
          height
        }
        createdAt
      }
    `,
    process.env.NEXT_PUBLIC_GRAPH_URL
  );
  if (error) return <div className="error">{error}</div>;
  return <>{data?.films && <FilmGrid films={data.films} />}</>;
};

export default React.memo(FilmExplorer);
