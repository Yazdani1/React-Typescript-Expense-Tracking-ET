import { useContext, ReactNode, FC } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { UserContext } from "../contextapi/UserContext";
import { useUserContext } from "../contextapi/UserContextCookies";
import { UserProtectedRouteContext } from "../contextapi/UserProtectedRouteContext";

interface IProposSecureLayout {
  children: ReactNode;
}

const SecureLayout: FC<IProposSecureLayout> = ({ children }) => {
  let location = useLocation();

  const [userInfo] = useContext(UserProtectedRouteContext);

  return userInfo ? (
    <> {children}</>
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );

  /////////////////////////////////////////////////////////////////////
  // const [userstate] = useContext(UserContext);

  // return userstate?.user ? (
  //   <> {children}</>
  // ) : (
  //   <Navigate to="/" replace state={{ from: location }} />
  // );
  /////////////////////////////////////////////////////////////////////
};

export default SecureLayout;
