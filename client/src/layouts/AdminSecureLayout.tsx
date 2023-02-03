import React, { useContext, ReactNode, FC, useEffect, useState } from "react";
import { Navigate, useLocation,useNavigate } from "react-router-dom";

import { UserContext } from "../contextapi/UserContext";
import { getUserRoleForAdmin } from "../services/API";

interface AdminSecureLayoutProps {
  children: ReactNode;
}

const AdminSecureLayout: FC<AdminSecureLayoutProps> = ({ children }) => {
  let location = useLocation();
  let navigate = useNavigate();

  const [userstate, setState] = useContext(UserContext);

  const [userDetails,setUserDetails] = useState<any>("");

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
    } catch (error) {
        navigate("/");
    }
  };

  useEffect(() => {

    if (userstate && userstate.token) loadCurrentUserAdminRole();

    // if(!userstate && userstate.token ){
    //     // <Navigate to="/" replace state={{ from: location }} />
    //     navigate("/");

    // }
       
  
  }, [userstate && userstate.token]);

//   return <div>{children}</div>;

return userstate?.user ? (
    <> {children}</>
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );


};

export default AdminSecureLayout;
