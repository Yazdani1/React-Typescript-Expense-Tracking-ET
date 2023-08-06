import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logOut } from "../../redux/userSlice";
import { UserContext } from "../../contextapi/UserContext";
import style from "./AdminSidebar.module.scss";

const AdminSidebar = () => {
  let navigate = useNavigate();

  const dispatch = useDispatch();

  // to use context api
  const [state, setState] = useContext(UserContext);

  const logOutAdming = () => {
    window.localStorage.removeItem("tokenLogin");
    window.localStorage.removeItem("token");
    navigate("/");
    setState("");
    dispatch(logOut())

  };

  return (
    <div className={style.sidebarContainer}>
      <button className="btn btn-danger" onClick={logOutAdming}>
        Log out
      </button>
    </div>
  );
};

export default AdminSidebar;
