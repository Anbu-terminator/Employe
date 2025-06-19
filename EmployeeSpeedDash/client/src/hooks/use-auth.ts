import { useState, useEffect } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("crysTechLoggedIn") === "true";
      setIsAuthenticated(isLoggedIn);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = () => {
    localStorage.setItem("crysTechLoggedIn", "true");
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("crysTechLoggedIn");
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
}