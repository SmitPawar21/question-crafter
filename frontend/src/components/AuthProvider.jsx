import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [selectedFile, setSelectedFile] = useState([]);

  const manageFile = (newFile)=>{
    setSelectedFile(prev => [...prev, ...newFile]);
  }
  
  return (
    <AuthContext.Provider value={{ selectedFile, manageFile, setSelectedFile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
