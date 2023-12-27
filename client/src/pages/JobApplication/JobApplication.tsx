import { useEffect } from 'react';

import SubscriberPageLayout from '../../layouts/SubscriberPageLayout';
import { useJobApplicationContext } from '../../contextapi/JobApplicationContext';
import style from './JobApplication.module.scss';
import JobApplicationCard from './JobApplicationCard';

const JobApplication = () => {

	// Context API
	const { allJobApplication, loadJobApplication, loading } =
		useJobApplicationContext();

	useEffect(() => {
		loadJobApplication();
	}, []);

	return (
		<SubscriberPageLayout>
			<div className={style.main_container}>

				{loading && <h3>Loading...</h3>}
				
				{allJobApplication &&
					allJobApplication.map((job) => (
						<JobApplicationCard job_application={job} key={job._id} />
					))}
			</div>
		</SubscriberPageLayout>
	);
};

export default JobApplication;
