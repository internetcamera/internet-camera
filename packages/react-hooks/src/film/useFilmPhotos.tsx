import { useQuery, gql, ApolloError, ApolloQueryResult } from '@apollo/client';
import dayjs from 'dayjs';

export type GraphFilm = {
  id: string;
  filmAddress: string;
  name: string;
  symbol: string;
  totalSupply: string;
  photos: {
    id: string;
    name: string;
    image: string;
    filmIndex: string;
    createdAt: number;
  }[];

  createdAt: number;
};

export type SDKFilmPhotos = {
  id: string;
  name: string;
  image: string;
  filmIndex: number;
  createdAt: Date;
}[];

type GET_FILM_VARS = {
  id: string;
};

type UseFilmProps = {
  address: string;
};

const GET_FILM_PHOTOS = gql`
  query GetFilmPhotos($id: String!) {
    film(id: $id) {
      photos {
        id
        name
        image
        filmIndex
        createdAt
      }
    }
  }
`;

const useFilmPhotos = ({
  address
}: UseFilmProps): {
  photos: SDKFilmPhotos | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  refresh: (variables?: Partial<GET_FILM_VARS> | undefined) => Promise<
    ApolloQueryResult<{
      film: GraphFilm;
    }>
  >;
} => {
  const {
    data,
    loading,
    error,
    refetch: refresh
  } = useQuery<{ film: GraphFilm }, GET_FILM_VARS>(GET_FILM_PHOTOS, {
    variables: { id: address }
  });
  if (data) {
    const formatted: SDKFilmPhotos = data.film.photos.map(photo => ({
      id: photo.id,
      name: photo.name,
      image: photo.image,
      filmIndex: parseInt(photo.filmIndex),
      createdAt: dayjs.unix(photo.createdAt).toDate()
    }));
    return { photos: formatted, loading, error, refresh };
  } else return { photos: undefined, loading, error, refresh };
};

export default useFilmPhotos;
