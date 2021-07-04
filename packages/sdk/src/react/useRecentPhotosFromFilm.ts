import { useRef } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import InternetCamera from '../InternetCamera';
import { Photo } from '../types';

const useRecentPhotosFromFilm = (
  limit: number,
  filmAddress: string,
  graphURL?: string,
  swrOptions?: Partial<SWRConfiguration>
) => {
  const camera = useRef(new InternetCamera({ graphURL }));
  const { data: photos, error } = useSWR<Photo[]>(
    [limit, filmAddress, 'icdk-react-use-recent-photos-from-film'],
    (limit, filmAddress) =>
      camera.current.getRecentPhotosFromFilm(limit, filmAddress),
    { revalidateOnMount: true, ...swrOptions }
  );
  return { photos, error };
};

export default useRecentPhotosFromFilm;
