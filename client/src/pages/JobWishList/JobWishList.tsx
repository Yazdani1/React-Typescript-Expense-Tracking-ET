import { useEffect } from 'react';

import SubscriberPageLayout from '../../layouts/SubscriberPageLayout';
import { useJobWishListContext } from '../../contextapi/JobWishListContext';
import style from './JobWishList.module.scss';
import JobWishListCard from './JobWishListCard';

const JobWishList = () => {
  //Context api

  const { allJobWishList, loadJobWishList } = useJobWishListContext();

  useEffect(() => {
    loadJobWishList();
  }, []);

  return (
    <SubscriberPageLayout>
      <div>{allJobWishList && allJobWishList.map((job) => <JobWishListCard jobwishlist={job} key={job._id} />)}</div>
    </SubscriberPageLayout>
  );
};

export default JobWishList;
