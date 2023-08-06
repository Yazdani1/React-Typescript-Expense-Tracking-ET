import React, { useContext, ReactNode, FC, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

import { UserContext } from "../contextapi/UserContext";
import { getUserRoleForAdmin } from "../services/API";
import { UserProtectedRouteContext } from "../contextapi/UserProtectedRouteContext";

interface AdminSecureLayoutProps {
  children: ReactNode;
}

const AdminSecureLayout: FC<AdminSecureLayoutProps> = ({ children }) => {
  let location = useLocation();
  let navigate = useNavigate();

  // to use redux toolkit
  const userProfileDetails = useSelector(
    (state: any) => state.user.currentUser
  );

  const loadCurrentUserAdminRole = async () => {
    try {
      const res = await getUserRoleForAdmin();
    } catch (error: any) {
      navigate("/");
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadCurrentUserAdminRole();
  }, []);

  return userProfileDetails ? (
    <> {children}</>
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );

  ////////////////////////////////////////////////////////////////////////////
  // useEffect(() => {
  //   if (userstate && userstate.token) loadCurrentUserAdminRole();
  //   // if(!userstate && userstate.token ){
  //   //     // <Navigate to="/" replace state={{ from: location }} />
  //   //     navigate("/");
  //   // }
  // }, [userstate && userstate.token]);
  ////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////
  // const [userInfo]: any = useContext(UserProtectedRouteContext);
  // return userInfo ? (
  //   <> {children}</>
  // ) : (
  //   <Navigate to="/" replace state={{ from: location }} />
  // );
  ////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////
  //const [userstate, setState] = useContext(UserContext);
  // return userstate?.user ? (
  //     <> {children}</>
  //   ) : (
  //     <Navigate to="/" replace state={{ from: location }} />
  //   );
  ////////////////////////////////////////////////////////////////////////////
};

export default AdminSecureLayout;
