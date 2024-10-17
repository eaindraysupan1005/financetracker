// LayoutWithHeader.js
import React from 'react';
import Header from './Common/Header';
import { Outlet } from 'react-router-dom';

const LayoutWithHeader = () => {
  return (
    <div>
      <Header />
      <Outlet /> {/* This will render the nested routes */}
    </div>
  );
};

export default LayoutWithHeader;
