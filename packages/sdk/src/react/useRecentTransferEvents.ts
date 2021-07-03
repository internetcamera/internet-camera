import { useRef } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import InternetCamera from '../InternetCamera';

const useRecentTransferEvents = (
  limit: number,
  graphURL: string,
  swrOptions?: Partial<SWRConfiguration>
) => {
  const camera = useRef(new InternetCamera({ graphURL }));
  const { data: transferEvents, error } = useSWR<any[]>(
    [limit, 'icdk-react-use-recent-transfer-events'],
    limit => camera.current.getRecentTransferEvents(limit),
    { revalidateOnMount: true, ...swrOptions }
  );
  return { transferEvents, error };
};

export default useRecentTransferEvents;
