import { useEffect } from "react";
import { createContext, useState } from "react";

export const userContext = createContext();
export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      setUserData(JSON.parse(data));
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    if (Object.keys(userData).length !== 0) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
    setLoading(false);
  }, [userData]);

  return (
    <userContext.Provider value={{ userData, setUserData }}>
      {children}
    </userContext.Provider>
  );
};
