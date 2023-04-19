import { createContext, useCallback, useContext, useState } from "react";
import { useRouter } from "next/router";
const AppContext = createContext();

export function AppWrapper({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const router = useRouter();

  const logout = () => {
    setCurrentUser(null);
  };

  let sharedState = {
    currentUser,
    setCurrentUser,
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
