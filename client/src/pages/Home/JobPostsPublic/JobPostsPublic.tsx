import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import style from './JobPostsPublic.module.scss';
import { getApprovedPublicJobPosts } from '../../../services/API';
import { JobPosts } from '../../../services/DataProvider';
import JobPostsPublicCard from './JobPostsPublicCard';
import HomePageLayout from '../../../layouts/HomePageLayout';
import { useJobWishListContext } from '../../../contextapi/JobWishListContext';

const JobPostsPublic = () => {
 
  //Context api

  const { allJobWishList, loadJobWishList } = useJobWishListContext();

  /****************************************/
  /****** Load all job posts   ************/
  /****************************************/

  const [allJobs, setAllJobs] = useState<JobPosts[]>([]);

  const loadAllPublicJobPosts = async () => {
    try {
      const res = await getApprovedPublicJobPosts();

      if (res) {
        setAllJobs(res);
        console.log(res);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  useEffect(() => {
    loadAllPublicJobPosts();
    loadJobWishList();
  }, []);

  return (
    <HomePageLayout>
      <h6>All Jobs</h6>
      {allJobs && allJobs.map((job) => <JobPostsPublicCard jobpost={job} key={job._id} />)}
    </HomePageLayout>
  );
};

export default JobPostsPublic;
