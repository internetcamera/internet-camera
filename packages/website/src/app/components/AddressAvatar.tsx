import React from 'react';

const AddressAvatar = ({
  address,
  size = 40
}: {
  address: string;
  size?: number;
}) => {
  return (
    <div className="address-avatar">
      <style jsx>{`
        .address-avatar {
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background-color: #${address.slice(-6)};
        }
      `}</style>
    </div>
  );
};

export default React.memo(AddressAvatar);
