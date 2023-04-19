import { createContext, useCallback, useContext, useState } from "react";
import { useRouter } from "next/router";
const AppContext = createContext();

export function AppWrapper({ children }) {
  const [currentAdmin, setCurrentAdmin] = useState();
  const router = useRouter();

  const logout = () => {
    setCurrentAdmin(null);
  };

  let sharedState = {
    currentAdmin,
    setCurrentAdmin,
    router,
    logout,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}