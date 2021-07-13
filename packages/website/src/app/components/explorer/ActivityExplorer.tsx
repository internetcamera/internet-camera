import { useQuery } from '@internetcamera/sdk/dist/react';
import { gql } from 'graphql-request';
import React from 'react';
import ActivityList from '../collections/ActivityList';

const ActivityExplorer = ({
  address,
  orderDirection
}: {
  address: string;
  orderDirection: string;
}) => {
  const { data, error } = useQuery(
    gql`
      {
        from: transferEvents(first: 25, orderBy: createdAt, orderDirection: ${orderDirection}${
      address.length ? `, where: {from: "${address.toLowerCase()}"}` : ''
    }) {
          ...fields
        }
        to: transferEvents(first: 25, orderBy: createdAt, orderDirection: ${orderDirection}${
      address.length ? `, where: {to: "${address.toLowerCase()}"}` : ''
    }) {
          ...fields
        }
      }
      fragment fields on TransferEvent {
        id
        type
        from {
          address
        }
        to {
          address
        }
        film {
          id
          name
          symbol
          filmAddress
          used
          totalSupply
        }
        amount
        txHash
        photo {
          id
          filmIndex
          film {
            id
            name
            used
            totalSupply
          }
        }
        createdAt
      }
    `,
    {},
    process.env.NEXT_PUBLIC_GRAPH_URL
  );
  let activity = data ? [...data.from, ...data.to] : [];
  activity = activity.filter(
    (p, i) => i == activity.findIndex(n => n.id == p.id)
  );

  if (error) return <div className="error">{error}</div>;
  return <>{activity && <ActivityList transferEvents={activity} />}</>;
};

export default React.memo(ActivityExplorer);
