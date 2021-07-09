import { useRef } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import InternetCamera from '../InternetCamera';
import { Film } from '../types';

const useFilm = (
  filmAddress: string,
  graphURL?: string,
  swrOptions?: Partial<SWRConfiguration>
) => {
  const camera = useRef(new InternetCamera({ graphURL }));
  const {
    data: film,
    error,
    mutate
  } = useSWR<Film>(
    [filmAddress, 'icdk-react-use-film'],
    filmAddress => camera.current.getFilm(filmAddress),
    { revalidateOnMount: true, ...swrOptions }
  );
  return { film, error, refresh: mutate };
};

export default useFilm;
