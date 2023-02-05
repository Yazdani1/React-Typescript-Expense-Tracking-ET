import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import AdminPageLayout from "../../layouts/AdminPageLayout";
import { getAllUserList } from "../../services/API";

const Admin = () => {
  
  /****************************************/
  /*********Load All Users List     ******/
  /****************************************/

  const [allUser, setAllUser] = useState([]);

  const loadAllUserList = async () => {
    try {
      const res = await getAllUserList();

      if (res) {
        setAllUser(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadAllUserList();
  }, []);

  return (
    <AdminPageLayout>
      <div className="container-fluid">
        <h5>Admin area</h5>

        {allUser &&
          allUser.map((users: any, index) => (
            <>
              <h6 className="card">
                {users.name}. {users.role}.{users.email}
              </h6>
            </>
          ))}
      </div>
    </AdminPageLayout>
  );
};

export default Admin;
