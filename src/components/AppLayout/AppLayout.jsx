import React from 'react';
import './AppLayout.css';

const AppLayout = ({ children }) => {
  return (
    <div className="app-viewport-wrapper">
      <div className="mobile-container-main">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
