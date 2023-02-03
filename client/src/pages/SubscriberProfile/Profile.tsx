import React, { useContext } from "react";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import SubscriberPageLayout from "../../layouts/SubscriberPageLayout";
import CardLayout from "../../components/CardLayout/CardLayout";
import { UserContext } from "../../contextapi/UserContext";

const Profile = () => {
  const [state, setState] = useContext(UserContext);

  return (
    <SubscriberPageLayout>
      <CardLayout title="Account Details"></CardLayout>
      <CardLayout>
        <div>
          <h6>Name: {state && state.user?.name}</h6>
        </div>
      </CardLayout>

      <CardLayout>
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <h6>E-mail: {state && state.user?.email}</h6>
          <button className="btn btn-success">Edit</button>
        </div>
      </CardLayout>

      <CardLayout>
        <div>
          <h6>Role: {state && state.user?.role}</h6>
        </div>
      </CardLayout>

      <CardLayout>
        <div>
          <h6>Joined: {state && state.user?.date}</h6>
        </div>
      </CardLayout>
    </SubscriberPageLayout>
  );



};

export default Profile;
