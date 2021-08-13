import InternetCamera from '@internetcamera/react-hooks';
import React from 'react';

const Test = () => {
  const { film } = InternetCamera.useFilmInfo({
    address: '0x3030778ec0f9df33d81dd1e17d00b998d4220d4b'
  });
  const { photos } = InternetCamera.useFilmPhotos({
    address: '0x3030778ec0f9df33d81dd1e17d00b998d4220d4b'
  });
  return (
    <div className="test">
      <pre>{JSON.stringify({ film, photos }, null, 2)}</pre>
      <style jsx>{`
        .test {
        }
      `}</style>
    </div>
  );
};

export default Test;
