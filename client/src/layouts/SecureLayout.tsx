import { useContext, ReactNode, FC } from "react";
import { UserContext } from "../contextapi/UserContext";
import { Navigate, useLocation } from "react-router-dom";

interface IProposSecureLayout {
  children: ReactNode;
}

const SecureLayout: FC<IProposSecureLayout> = ({ children }) => {
  let location = useLocation();

  const [userstate, setState] = useContext(UserContext);

  return userstate?.user ? (
    <> {children}</>
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default SecureLayout;
