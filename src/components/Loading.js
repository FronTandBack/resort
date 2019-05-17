import React from 'react';
import loadingGif from '../img/gif/loading-arrow.gif';
const Loading = () => {
  return (
    <div className="loading">
      <h4>rooms data loading...</h4>
      <img src={loadingGif} />
    </div>
  );
};

export default Loading;
