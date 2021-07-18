import React from 'react';

const Flash = () => {
  return (
    <div className="flash">
      IC
      <style jsx>{`
        .flash {
          width: 40px;
          height: 40px;
          background-color: black;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0px 0px 4px 1px purple, 1px 1px 4px 0px blue !important;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Flash;
