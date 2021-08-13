export default {};

// import { useQuery, gql } from '@apollo/client';

// import { formatEther } from '@ethersproject/units';
// import dayjs from 'dayjs';

// type GET_FILM_VARS = {
//   id: string;
// };

// type GET_FILM_WITH_PHOTOS_VARS = {
//   id: string;
//   take: number;
// };

// type UseFilmProps = {
//   address: string;
//   include?: {
//     photos?: boolean | { take?: number };
//   };
// };

// const GET_FILM = gql`
//   query GetFilm($id: String!) {
//     film(id: $id) {
//       id
//       filmAddress
//       name
//       symbol
//       totalSupply
//     }
//   }
// `;

// const GET_FILM_WITH_PHOTOS = gql`
//   query GetFilmWithPhotos($id: String!, $take: Int!) {
//     film(id: $id) {
//       id
//       filmAddress
//       name
//       symbol
//       totalSupply
//       photos(first: $take) {
//         id
//         name
//         image
//         createdAt
//       }
//       createdAt
//     }
//   }
// `;

// const useFilm = ({ address, include }: UseFilmProps) => {
//   if (!include?.photos) {
//     const { data, loading, error } = useQuery<
//       { film: GraphFilm },
//       GET_FILM_VARS
//     >(GET_FILM, {
//       variables: { id: address }
//     });
//     if (data) {
//       const formatted: SDKFilm = {
//         id: data.film.id,
//         address: data.film.filmAddress,
//         name: data.film.name,
//         symbol: data.film.symbol,
//         totalSupply: parseFloat(formatEther(data.film.totalSupply)),
//         createdAt: dayjs.unix(data.film.createdAt).toDate()
//       };
//       return { data: formatted, loading, error };
//     } else return { data: undefined, loading, error };
//   } else {
//     const { data, loading, error } = useQuery<
//       { film: GraphFilm & { photos: GraphPhotos } },
//       GET_FILM_WITH_PHOTOS_VARS
//     >(GET_FILM_WITH_PHOTOS, {
//       variables: {
//         id: address,
//         take:
//           typeof include.photos == 'boolean'
//             ? 10
//             : (include.photos.take as number)
//       }
//     });
//     if (data) {
//       const formatted: SDKFilm = {
//         id: data.film.id,
//         address: data.film.filmAddress,
//         name: data.film.name,
//         symbol: data.film.symbol,
//         totalSupply: parseFloat(formatEther(data.film.totalSupply)),
//         createdAt: dayjs.unix(data.film.createdAt).toDate()
//       };
//       return { data: formatted, loading, error };
//     } else return { data: undefined, loading, error };
//   }
// };

// export default useFilm;
