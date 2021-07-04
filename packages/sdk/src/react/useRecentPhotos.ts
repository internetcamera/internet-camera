import { useRef } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import InternetCamera from '../InternetCamera';
import { Photo } from '../types';

const useRecentPhotos = (
  limit: number,
  graphURL?: string,
  swrOptions?: Partial<SWRConfiguration>
) => {
  const camera = useRef(new InternetCamera({ graphURL }));
  const { data: photos, error } = useSWR<Photo[]>(
    [limit, 'icdk-react-use-recent-photos'],
    limit => camera.current.getRecentPhotos(limit),
    { revalidateOnMount: true, ...swrOptions }
  );
  return { photos, error };
};

export default useRecentPhotos;
