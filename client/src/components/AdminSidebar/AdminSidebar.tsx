import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { UserContext } from "../../contextapi/UserContext";
import style from "./AdminSidebar.module.scss";

const AdminSidebar = () => {
  let navigate = useNavigate();

  // to use context api
  const [state, setState] = useContext(UserContext);

  const logOut = () => {
    window.localStorage.removeItem("tokenLogin");
    window.localStorage.removeItem("token");
    navigate("/");
    setState("");
  };

  return (
    <div className={style.sidebarContainer}>
      <button className="btn btn-danger" onClick={logOut}>
        Log out
      </button>
    </div>
  );
};

export default AdminSidebar;
