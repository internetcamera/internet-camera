import React from 'react';
import { InternetCameraTypes } from '@internetcamera/sdk';
import TransferPreview from '../previews/TransferPreview';

const TransfersList = ({
  transferEvents
}: {
  transferEvents: InternetCameraTypes.TransferEvent[];
}) => {
  return (
    <div className="transfers-list">
      {transferEvents.map(transferEvent => (
        <TransferPreview transferEvent={transferEvent} key={transferEvent.id} />
      ))}
      <style jsx>{`
        .transfers-list {
          display: flex;
          flex-direction: column;

          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default TransfersList;
