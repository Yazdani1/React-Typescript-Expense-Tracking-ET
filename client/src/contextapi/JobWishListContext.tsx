import { useState, createContext, useEffect, FC, ReactNode, useContext } from 'react';
import { toast } from 'react-toastify';

import { getJobWishList } from '../services/API';
import { JobWishList } from '../services/DataProvider';

interface JobWishListContextProps {
  allJobWishList: JobWishList[];
  loadJobWishList: () => void;
  clearJobWishList: () => void;
}

export const JobWishListContext = createContext<JobWishListContextProps>({
  allJobWishList: [],
  loadJobWishList: () => {},
  clearJobWishList: () => {},
});

export const useJobWishListContext = () => useContext(JobWishListContext);

interface JobWishListProviderProps {
  children: ReactNode;
}

export const JobWishListProvider: FC<JobWishListProviderProps> = ({ children }) => {
  const [allJobWishList, setAllJobWishList] = useState<JobWishList[]>([]);

  const loadJobWishList = async () => {
    try {
      const res = await getJobWishList();
      if (res) {
        setAllJobWishList(res);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  // Need to clear the job wishlist state so that when user logout, it can change the save and saved condition
  // Cause based on this state data , i am showing save and saved text that user use to save and delete post from
  // Their wishlist.

  const clearJobWishList = () => {
    setAllJobWishList([]);
  };

  useEffect(() => {
    loadJobWishList();
  }, []);

  return (
    <JobWishListContext.Provider
      value={{
        allJobWishList,
        loadJobWishList,
        clearJobWishList,
      }}
    >
      {children}
    </JobWishListContext.Provider>
  );
};
