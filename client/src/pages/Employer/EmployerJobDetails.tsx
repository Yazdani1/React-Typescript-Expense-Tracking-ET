import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MdEdit, MdDelete } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import EmployerPageLayout from '../../layouts/EmployerPageLayout';
import { JobPosts, JobApplication } from '../../services/DataProvider';
import style from './EmployerJobPost.module.scss';

import CardLayout from '../../components/CardLayout/CardLayout';
import { employerJobPostDetails } from '../../services/API';

const EmployerJobDetails = () => {
  const { slug } = useParams();

  /****************************************/
  /**** Employer job post details    ******/
  /****************************************/

  const [jobDetails, setJobDetails] = useState<JobPosts>();
  const [jobApplication, setJobApplication] = useState<JobApplication[]>([]);

  const loadEmployerJobDetails = async () => {
    try {
      const res = await employerJobPostDetails(slug!);

      if (res) {
        setJobDetails(res.singleJobDetails);
        setJobApplication(res.jobApplicationList);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadEmployerJobDetails();
  }, []);

  return (
    <EmployerPageLayout>
      <CardLayout>
        <h6>{jobDetails?.title}</h6>

        <p>{jobDetails?.des}</p>

        <p>{jobDetails?.jobCity}</p>

        <p>{jobDetails?.status}</p>

        <p>Total application: {jobDetails?.totalApplication}</p>
      </CardLayout>

      <CardLayout>
        {jobApplication &&
          jobApplication.map((application) => (
            <div style={{ border: '1px solid black', margin: '10px', padding: '10px', borderRadius: '10px' }}>
              <h6>{application.jobAppliedBy.name}</h6>
              <p>{application.jobAppliedBy.email}</p>
              <h5>{moment(application.date).format('MMM DD, YYYY HH:mm:ss')}</h5>
              <p>{application.status}</p>
            </div>
          ))}
      </CardLayout>
    </EmployerPageLayout>
  );
};

export default EmployerJobDetails;
