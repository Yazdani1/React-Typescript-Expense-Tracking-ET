import { useState, createContext, useEffect } from "react";

const UserProtectedRouteContext = createContext();

const UserProtectedRouteProvider = ({ children }) => {

  const [userInfo, setUserInfo] = useState(window.localStorage.getItem("userInforProtectedRoute"));

  useEffect(() => {
    setUserInfo(JSON.parse(window.localStorage.getItem("userInforProtectedRoute")));
  }, []);

  return (
    <UserProtectedRouteContext.Provider value={[userInfo, setUserInfo]}>
      {children}
    </UserProtectedRouteContext.Provider>
  );
};

export { UserProtectedRouteContext, UserProtectedRouteProvider };

