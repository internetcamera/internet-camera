import React from 'react';
import Masonry from 'react-masonry-css';
import { InternetCameraTypes } from '@internetcamera/sdk';
import FilmPreview from '@app/components/previews/FilmPreview';

const FilmGrid = ({ films }: { films: InternetCameraTypes.Film[] }) => {
  const filmsFiltered = films.filter(film => film.photos.length > 0);
  return (
    <div className="film-grid">
      <Masonry breakpointCols={3} className="grid" columnClassName="column">
        {filmsFiltered.map(film => (
          <FilmPreview
            key={film.id}
            filmAddress={film.filmAddress}
            initialData={film}
          />
        ))}
      </Masonry>
      <style jsx>{`
        .film-grid {
          flex: 1 1 auto;
        }
        .film-grid :global(.grid) {
          display: flex;
          margin-left: -20px;
          width: auto;
        }
        .film-grid :global(.column) {
          padding-left: 20px;
          background-clip: padding-box;
        }
      `}</style>
    </div>
  );
};

export default FilmGrid;
