import React from 'react';

const Like = ({ onClick, liked }) => {
  let classes = 'fa fa-heart';
  if (!liked) classes += '-o';
  return (
    <i
      onClick={onClick}
      className={classes}
      aria-hidden='true'
      style={{ cursor: 'pointer' }}
    ></i>
  );
};

export default Like;
