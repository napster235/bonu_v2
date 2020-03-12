import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="w-100 h-100 content-center main-bg">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>

  )
}

export default LoadingSpinner;
