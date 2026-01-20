import React from 'react';
import './AppLayout.css';

const AppLayout = ({ children }) => {
  return (
    <div className="app-viewport-wrapper">
      {/* Ye main container hai jo desktop par 390px rahega */}
      <div className="mobile-container-main">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;