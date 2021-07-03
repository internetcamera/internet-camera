import React, { ReactNode } from 'react';

const Dialog = ({
  title,
  children,
  subtitle
}: {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
}) => {
  return (
    <div className="dialog">
      {title && <div className="title">{title}</div>}
      {subtitle && <div className="subtitle">{subtitle}</div>}
      {children}
      <style jsx>{`
        .dialog {
          background-color: rgba(0, 0, 0, 0.4);
          box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
            rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
          border-radius: 20px;
          padding: 30px 30px;
          max-width: 450px;
          width: 100%;
          margin: auto;
        }
        .title {
          font-weight: bold;
          font-size: 24px;
          margin-bottom: 5px;
        }
        .subtitle {
          font-size: 18px;
          color: #ccc;
          line-height: 1.4em;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default Dialog;
