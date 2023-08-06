import React, { useContext, ReactNode, FC, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { UserContext } from "../contextapi/UserContext";
import { getUserRoleForAdmin } from "../services/API";
import { UserProtectedRouteContext } from "../contextapi/UserProtectedRouteContext";

interface AdminSecureLayoutProps {
  children: ReactNode;
}

const AdminSecureLayout: FC<AdminSecureLayoutProps> = ({ children }) => {
  const [userInfo]: any = useContext(UserProtectedRouteContext);

  let location = useLocation();
  let navigate = useNavigate();

  const [userstate, setState] = useContext(UserContext);

  const loadCurrentUserAdminRole = async () => {
    try {
      const res = await getUserRoleForAdmin();

      if (res) {
        // if(!userstate && userstate.token){
        //     <Navigate to="/" replace state={{ from: location }} />
        // }
        // setUserDetails(res.data);
        // console.log(res.data);
        // console.log(userDetails?.role);
        // if (res.data.user?.role === "Admin") {
        //     navigate("/admin");
        //   } else {
        //   }
      }
    } catch (error:any) {
      navigate("/");


      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  // useEffect(() => {
  //   if (userstate && userstate.token) loadCurrentUserAdminRole();
  //   // if(!userstate && userstate.token ){
  //   //     // <Navigate to="/" replace state={{ from: location }} />
  //   //     navigate("/");
  //   // }
  // }, [userstate && userstate.token]);
  ////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    loadCurrentUserAdminRole();
  }, []);

  return userInfo ? (
    <> {children}</>
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
  
  ////////////////////////////////////////////////////////////////////////////
  // return userstate?.user ? (
  //     <> {children}</>
  //   ) : (
  //     <Navigate to="/" replace state={{ from: location }} />
  //   );
  ////////////////////////////////////////////////////////////////////////////
};

export default AdminSecureLayout;
