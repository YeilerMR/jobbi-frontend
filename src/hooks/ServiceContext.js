import React, { createContext, useContext, useState, useCallback } from 'react';

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [serviceViewMode, setServiceViewMode] = useState({
    mode: 'all',
    branchId: null,
    fromBranches: false
  });

  const resetToAllMode = useCallback(() => {
    setServiceViewMode({
      mode: 'all',
      branchId: null,
      fromBranches: false
    });
  }, []);

  const setBranchMode = useCallback((branchId) => {
    setServiceViewMode({
      mode: 'branch',
      branchId: branchId,
      fromBranches: true
    });
  }, []);

  return (
    <ServiceContext.Provider value={{ 
      serviceViewMode, 
      setServiceViewMode,
      resetToAllMode,
      setBranchMode
    }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServiceView = () => useContext(ServiceContext);