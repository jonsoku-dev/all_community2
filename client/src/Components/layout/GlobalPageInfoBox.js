import React from 'react';

const GlobalPageInfoBox = ({
  title = 'Title',
  description = 'Description',
  className,
  children,
}) => {
  return (
    <>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className={className}>{children}</div>
    </>
  );
};

export default GlobalPageInfoBox;
