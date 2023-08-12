import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import AdminPageLayout from '../../layouts/AdminPageLayout';
import { getAllUserList } from '../../services/API';
import { UserProfileDetails } from '../../services/DataProvider';
import UserListsCard from './UserListsCard';
import CardLayout from '../../components/CardLayout/CardLayout';

const Admin = () => {
  /****************************************/
  /*********Load All Users List     ******/
  /****************************************/

  const [allUser, setAllUser] = useState<UserProfileDetails[]>([]);
  const loadAllUserList = async () => {
    try {
      const res = await getAllUserList();

      if (res) {
        setAllUser(res);
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
        {/* Row Header */}

        <CardLayout>
          <UserListHeader />
        </CardLayout>

        {allUser && allUser.map((users) => <UserListsCard user={users} key={users._id} loadUserList={loadAllUserList} />)}
      </div>
    </AdminPageLayout>
  );
};

export default Admin;

const UserListHeader = () => {
  return (
    <div className="row">
      <div className="col-xl-4 col-lg-2 col-md-6 col-sm-12">
        <h6>Name:</h6>
      </div>
      <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12">
        <h6>Role:</h6>
      </div>
      <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12">
        <h6>E-mail:</h6>
      </div>
      <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12">
        <h6>Date:</h6>
      </div>
      <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12">Action</div>
    </div>
  );
};
