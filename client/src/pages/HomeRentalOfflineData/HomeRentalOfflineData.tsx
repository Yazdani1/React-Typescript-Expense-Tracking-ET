import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import style from "./HomeRentalOfflineData.module.scss";
import SubscriberPageLayout from "../../layouts/SubscriberPageLayout";
import CardLayout from "../../components/CardLayout/CardLayout";
import { getAllHomeRentPosts } from "../../services/API";

const HomeRentalOfflineData = () => {
    
  const [allHomeRentPosts, setAllHomeRentPosts] = useState<any>([]);

  const loadAllHomeRentPosts = async () => {
    try {
      const offlineData = localStorage.getItem("homeRentPosts");
      if (offlineData) {
        setAllHomeRentPosts(JSON.parse(offlineData));
      } else {
        const res = await getAllHomeRentPosts();
        setAllHomeRentPosts(res.data);
        localStorage.setItem("homeRentPosts", JSON.stringify(res.data));
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadAllHomeRentPosts();
  }, []);

  return (
    <SubscriberPageLayout>
      <CardLayout>
        <h6>Home Rental Offline Data</h6>
        <p>{JSON.stringify(allHomeRentPosts)}</p>
      </CardLayout>
    </SubscriberPageLayout>
  );
};

export default HomeRentalOfflineData;
