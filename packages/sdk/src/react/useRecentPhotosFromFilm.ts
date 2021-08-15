import { useRef } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import InternetCamera from '../InternetCamera';
import { Photo } from '../types';

const useRecentPhotosFromFilm = (
  filmAddress: string,
  graphURL?: string,
  swrOptions?: Partial<SWRConfiguration>
) => {
  const camera = useRef(new InternetCamera({ graphURL }));
  const {
    data: photos,
    error,
    mutate
  } = useSWR<Photo[]>(
    [filmAddress, 'icdk-react-use-recent-photos-from-film'],
    filmAddress => camera.current.getRecentPhotosFromFilm(filmAddress),
    { revalidateOnMount: true, ...swrOptions }
  );
  return { photos, error, refresh: mutate };
};

export default useRecentPhotosFromFilm;
