import { useState, createContext, useEffect, FC, ReactNode } from "react";
import { toast } from "react-toastify";

import { getLogedInUserProfile } from "../services/API";
import { UserProfileDetails } from "../services/DataProvider";

export const UserProfileDetailsContext = createContext<null | any>(null);

interface UserProfileDetailsProviderProps {
  children: ReactNode;
}

export const UserProfileDetailsProvider: FC<UserProfileDetailsProviderProps> = ({
  children,
}) => {
  /****************************************/
  /********* User Profile Details  ********/
  /****************************************/

  const [userProfileDetails, setUserProfileDetails] =
    useState<UserProfileDetails>();

  const loadLogedInUserProfileDetails = async () => {
    try {

      const res = await getLogedInUserProfile();
      if (res) {
        setUserProfileDetails(res);
      }
      
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // This function is used to update the user profile details. when user make any updates in the user profile
  // we need to call this funtion to add the updated data and then we can new data with this context api.

  const updateUserProfileDetails = (updatedProfile: UserProfileDetails) => {
    setUserProfileDetails(updatedProfile);
  };

  useEffect(() => {
    loadLogedInUserProfileDetails();
  }, []);

  return (
    <UserProfileDetailsContext.Provider value={{ userProfileDetails, updateUserProfileDetails }}>
      {children}
    </UserProfileDetailsContext.Provider>
  );
};
