import { useQuery, gql, ApolloError, ApolloQueryResult } from '@apollo/client';
import { formatEther } from '@ethersproject/units';
import dayjs from 'dayjs';

export type GraphFilm = {
  id: string;
  filmAddress: string;
  name: string;
  symbol: string;
  totalSupply: string;
  createdAt: number;
};

export type SDKFilm = {
  id: string;
  address: string;
  name: string;
  symbol: string;
  totalSupply: number;
  createdAt: Date;
};

type GET_FILM_VARS = {
  id: string;
};

type UseFilmProps = {
  address: string;
};

const GET_FILM = gql`
  query GetFilm($id: String!) {
    film(id: $id) {
      id
      filmAddress
      name
      symbol
      totalSupply
    }
  }
`;

const useFilmInfo = ({
  address
}: UseFilmProps): {
  film: SDKFilm | undefined;
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
  } = useQuery<{ film: GraphFilm }, GET_FILM_VARS>(GET_FILM, {
    variables: { id: address }
  });
  if (data) {
    const formatted: SDKFilm = {
      id: data.film.id,
      address: data.film.filmAddress,
      name: data.film.name,
      symbol: data.film.symbol,
      totalSupply: parseFloat(formatEther(data.film.totalSupply)),
      createdAt: dayjs.unix(data.film.createdAt).toDate()
    };
    return { film: formatted, loading, error, refresh };
  } else return { film: undefined, loading, error, refresh };
};

export default useFilmInfo;
