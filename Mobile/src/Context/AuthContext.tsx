import { createContext, FC, useContext, useEffect, useState } from "react";
import {
  getUserData,
  getWelcomeSeen,
  setWelcomeSeen,
} from "../helpers/storage";
import { IAuthContextInterface, IFC } from "../interfaces";

const AuthContext = createContext<IAuthContextInterface>({
  isAuthenticated: false,
  isLoading: true,
  showSplash: true,
  handleSplashDone: () => {},
  checkAuth: () => {},
});

export const AuthProvider: FC<IFC> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showSplash, setShowSplash] = useState<boolean>(true);

  const checkAuth = async () => {
    const splashResult = await getWelcomeSeen();
    const authResult = await getUserData();

    // setIsAuthenticated(true); //for testing
    setIsAuthenticated(!!authResult);
    setShowSplash(!splashResult);
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // debugging
  // Inside AuthContext.tsx
  useEffect(() => {
    console.log("Auth State Updated:", {
      isAuthenticated,
      isLoading,
      showSplash,
    });
  }, [isAuthenticated, isLoading, showSplash]);

  const handleSplashDone = async () => {
    await setWelcomeSeen();
    setShowSplash(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        showSplash,
        handleSplashDone,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
