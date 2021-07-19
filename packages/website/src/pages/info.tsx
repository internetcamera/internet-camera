import React from 'react';
import { InternetCameraAddresses } from '@internetcamera/sdk';

const Info = () => {
  return (
    <div className="info">
      <pre>
        {JSON.stringify({ addresses: InternetCameraAddresses[80001] }, null, 2)}
      </pre>
      <style jsx>{`
        .info {
        }
      `}</style>
    </div>
  );
};

export default Info;
