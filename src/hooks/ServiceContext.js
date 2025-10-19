// ServiceContext.js
import React, { createContext, useContext, useState } from 'react';

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [serviceViewMode, setServiceViewMode] = useState({
    mode: 'all', // o 'branch'
    branchId: null,
  });

  return (
    <ServiceContext.Provider value={{ serviceViewMode, setServiceViewMode }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServiceView = () => useContext(ServiceContext);