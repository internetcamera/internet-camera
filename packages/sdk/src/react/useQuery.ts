import { useRef } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import InternetCamera from '../InternetCamera';

const useQuery = (
  query: string,
  graphURL: string,
  swrOptions?: Partial<SWRConfiguration>
) => {
  const camera = useRef(new InternetCamera({ graphURL }));
  const { data, error } = useSWR(
    [query, 'icdk-react-use-query'],
    query => camera.current.graphRequest(query),
    { revalidateOnMount: true, ...swrOptions }
  );
  return { data, error };
};

export default useQuery;
