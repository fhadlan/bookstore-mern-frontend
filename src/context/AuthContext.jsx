import { createContext, useContext } from "react";

const AuthContext = createContext();
const useAuth = () => {
  return useContext(AuthContext);
};

//auth provider
export const AuthProvider = ({ children }) => {
  const value = {};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
