import { Variables } from 'graphql-request/dist/types';
import { useRef } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import InternetCamera from '../InternetCamera';

const useQuery = (
  query: string,
  variables?: Variables,
  graphURL?: string,
  swrOptions?: Partial<SWRConfiguration>
) => {
  const camera = useRef(new InternetCamera({ graphURL }));
  const { data, error, mutate } = useSWR(
    [query, 'icdk-react-use-query'],
    query => camera.current.graphRequest(query, variables),
    { revalidateOnMount: true, ...swrOptions }
  );
  return { data, error, refresh: mutate };
};

export default useQuery;
