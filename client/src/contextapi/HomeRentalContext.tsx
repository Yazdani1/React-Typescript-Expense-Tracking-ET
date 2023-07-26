import React, {
  useState,
  createContext,
  useEffect,
  FC,
  ReactNode,
  useContext,
} from "react";
import {toast } from "react-toastify";
import { getAllHomeRentPosts, getAllUserLists } from "../services/API";

export const HomeRentalContext = createContext<null | any>(null);

// To use this context api - now from any other component i just need to call useHomeRentalContext function 
// and then i can use all these api data in any other components..
export const useHomeRentalContext= () => useContext(HomeRentalContext);


interface HomeRentalProviderProps {
  children: ReactNode;
}


export const HomeRentalProvider: FC<HomeRentalProviderProps> = ({ children }) => {
  /****************************************/
  /*********Al Home Rental Posts   ********/
  /****************************************/

  const [allHomeRentPosts, setAllHomeRentPosts] = useState<any>([]);

  const loadAllHomeRentPosts = async () => {

    // This is a way to show the data from local storage. at first we get the api request from the server
    // after that we store this data in local storgae and from local storage we can show our data.
    // This way even when users are offline, users can see the data.
    // And from this context api, data can be used anywhere in the project.

    try {
      const offlineData = localStorage.getItem("rentalposts");
      if (offlineData) {
        setAllHomeRentPosts(JSON.parse(offlineData));
      } else {
        const res = await getAllHomeRentPosts();
        setAllHomeRentPosts(res.data);
        localStorage.setItem("rentalposts", JSON.stringify(res.data));
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    // try {
    //   const res = await getAllHomeRentPosts();
    //   setAllHomeRentPosts(res.data);
    // } catch (error: any) {
    //   toast.error(error.response && error.response.data.error, {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    // }
  };

  /****************************************/
  /***** Home Rental All User Lists *******/
  /****************************************/

  const [allUsers, setAllUsers] = useState<any>([]);

  const loadHRPAllUserLists = async () => {
    try {
      const res = await getAllUserLists();

      if (res) {
        setAllUsers(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadAllHomeRentPosts();
    loadHRPAllUserLists();
  }, []);

  return (
    <HomeRentalContext.Provider value={{ allHomeRentPosts,allUsers }}>
      {children}
    </HomeRentalContext.Provider>
  );
};

// In this context api - i am sending multiple api data in just one context api.
// Now I can use this context api and can show my desire data in any component.



