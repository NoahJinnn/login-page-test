import React from 'react';
import Navigation from '../components/Navigator';

export const Layout = ({ children }) => {
  return (
    <div>
      <Navigation />
      <div className="flex justify-center w-100">{children}</div>
    </div>
  );
};
