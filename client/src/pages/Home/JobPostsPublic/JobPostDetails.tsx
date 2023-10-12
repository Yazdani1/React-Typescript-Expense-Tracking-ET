import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useNavigate, Link } from 'react-router-dom';

import HomePageLayout from '../../../layouts/HomePageLayout';
import CardLayout from '../../../components/CardLayout/CardLayout';
import { getJobDetails, CreateJobApplicationProps, createJobApplication } from '../../../services/API';
import { JobPosts } from '../../../services/DataProvider';
import JobPostsPublicCard from './JobPostsPublicCard';
import { useJobApplicationContext } from '../../../contextapi/JobApplicationContext';

const JobPostDetails = () => {
  const { slug } = useParams();
  let navigate = useNavigate();

  //Context Api

  const { allJobApplication, loadJobApplication } = useJobApplicationContext();

  // Redux toolkit for user profile details
  const userProfileDetails = useSelector((state: any) => state.user.currentUser);

  /****************************************/
  /****** Job post details  ***************/
  /****************************************/

  const [singleJobDetails, setSingleJobDetails] = useState<JobPosts>();
  const [sameJobLists, setSameJobLists] = useState<JobPosts[]>([]);

  const loadJobDetails = async () => {
    try {
      const res = await getJobDetails(slug!);
      if (res) {
        setSingleJobDetails(res.singleJob);
        setSameJobLists(res.simmilarJobBySameEmployer);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  /****************************************/
  /****** Create Job Application  *********/
  /****************************************/

  const onSubmitCreateJobApplication = async () => {
    try {
      const payload: CreateJobApplicationProps = {
        jobPostOwnerId: singleJobDetails?.postedBy?._id!,
        jobPostId: singleJobDetails?._id!,
      };

      const res = await createJobApplication(payload);
      if (res) {
        toast.success('Successfully applied', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        loadJobApplication();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  useEffect(() => {
    loadJobDetails();
  }, [slug]);

  const viewApplicationPage = () => {
    navigate('/job-application');
  };

  const isJobAlreadyApplied = allJobApplication && allJobApplication.some((job) => job.jobPostId?._id === singleJobDetails?._id);

  let appliedDate = undefined;

  const findDate =
    allJobApplication &&
    allJobApplication.map((job) => {
      if (job.jobPostId?._id === singleJobDetails?._id) {
        appliedDate = job.date;
      }
    });

  return (
    <HomePageLayout>
      <div className="row">
        <div className="col-xl-8 col-lg-8">
          <CardLayout>
            <h6>{singleJobDetails?.title}</h6>
            <p>{singleJobDetails?.jobCity}</p>
            <p>{singleJobDetails?.des}</p>
            <p>{singleJobDetails?._id}</p>
            <p>{singleJobDetails?.postedBy?._id}</p>
            <h5>{singleJobDetails?.postedBy.name}</h5>
          </CardLayout>
          <CardLayout>
            <h6>Our other opening jobs</h6>
          </CardLayout>
          {sameJobLists && sameJobLists.map((job) => <JobPostsPublicCard jobpost={job} key={job._id} />)}
        </div>
        <div className="col-xl-4 col-lg-4">
          {userProfileDetails && (
            <CardLayout>
              <h6 style={{ border: '1px solid black', padding: '10px', borderRadius: '7px' }}>{userProfileDetails.name}</h6>
              <p style={{ border: '1px solid black', padding: '10px', borderRadius: '7px' }}>{userProfileDetails.email}</p>

              {isJobAlreadyApplied && (
                <>
                  <p>Applied on{moment(appliedDate).format('MMM DD, YYYY HH:mm:ss')}</p>
                  <button className="btn btn-warning" onClick={viewApplicationPage}>
                    View application
                  </button>
                </>
              )}
              {!isJobAlreadyApplied && (
                <button className="btn btn-primary" onClick={onSubmitCreateJobApplication}>
                  Apply now
                </button>
              )}
            </CardLayout>
          )}

          {!userProfileDetails && (
            <CardLayout>
              <button className="btn btn-primary" onClick={() => navigate('/signin')}>
                Sign in now?
              </button>
            </CardLayout>
          )}
        </div>
      </div>
    </HomePageLayout>
  );
};

export default JobPostDetails;
