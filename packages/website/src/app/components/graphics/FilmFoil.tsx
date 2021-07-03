import React from 'react';

const FilmFoil = ({ address }: { address: string }) => {
  return (
    <div className="film-foil">
      <style jsx>{`
        .film-foil {
          width: 100%;
          height: 100%;
          background-image: radial-gradient(
              at 40% 20%,
              #${address.slice(2, 8)} 0,
              transparent 50%
            ),
            radial-gradient(
              at 80% 0%,
              #${address.slice(4, 10)} 0,
              transparent 50%
            ),
            radial-gradient(
              at 0% 100%,
              #${address.slice(6, 12)} 0,
              transparent 50%
            ),
            radial-gradient(
              at 80% 50%,
              #${address.slice(8, 14)} 0,
              transparent 50%
            ),
            radial-gradient(
              at 0% 100%,
              #${address.slice(10, 16)} 0,
              transparent 50%
            ),
            radial-gradient(
              at 80% 100%,
              #${address.slice(18, 24)} 0,
              transparent 50%
            ),
            radial-gradient(
              at 0% 0%,
              #${address.slice(24, 30)} 0,
              transparent 50%
            );
        }
      `}</style>
    </div>
  );
};

export default FilmFoil;
