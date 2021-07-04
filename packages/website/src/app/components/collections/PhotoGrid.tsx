import React from 'react';
import Masonry from 'react-masonry-css';
import { InternetCameraTypes } from '@internetcamera/sdk';
import PhotoPreview from '@app/components/previews/PhotoPreview';

const PhotoGrid = ({ photos }: { photos: InternetCameraTypes.Photo[] }) => {
  return (
    <div className="photo-grid">
      <Masonry breakpointCols={4} className="grid" columnClassName="column">
        {photos.map(photo => (
          <PhotoPreview
            key={photo.id}
            tokenId={photo.tokenId}
            initialData={photo}
          />
        ))}
      </Masonry>
      <style jsx>{`
        .photo-grid :global(.grid) {
          display: flex;
          margin-left: -20px;
          width: auto;
        }
        .photo-grid :global(.column) {
          padding-left: 20px;
          background-clip: padding-box;
        }
      `}</style>
    </div>
  );
};

export default PhotoGrid;
