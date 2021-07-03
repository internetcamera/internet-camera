import { useRef } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import InternetCamera from '../InternetCamera';
import { Film } from '../types';

const useRecentFilms = (
  limit: number,
  graphURL: string,
  swrOptions?: Partial<SWRConfiguration>
) => {
  const camera = useRef(new InternetCamera({ graphURL }));
  const { data: films, error } = useSWR<Film[]>(
    [limit, 'icdk-react-use-recent-films'],
    limit => camera.current.getRecentFilms(limit),
    { revalidateOnMount: true, ...swrOptions }
  );
  return { films, error };
};

export default useRecentFilms;
