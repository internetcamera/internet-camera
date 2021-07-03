import React from 'react';
import Masonry from 'react-masonry-css';
import { Film } from '@internetcamera/sdk/dist/types';
import FilmPreview from '@app/components/previews/FilmPreview';

const FilmGrid = ({ films }: { films: Film[] }) => {
  return (
    <div className="film-grid">
      <Masonry breakpointCols={3} className="grid" columnClassName="column">
        {films.map(film => (
          <FilmPreview
            key={film.id}
            filmAddress={film.filmAddress}
            initialData={film}
          />
        ))}
      </Masonry>
      <style jsx>{`
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
