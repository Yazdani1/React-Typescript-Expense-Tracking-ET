import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import SubscriberPageLayout from '../../layouts/SubscriberPageLayout';
import { getMatchedJob } from '../../services/API';
import { JobPosts } from '../../services/DataProvider';
import JobPostsPublicCard from '../Home/JobPostsPublic/JobPostsPublicCard';

const JobMatch = () => {
	/****************************************/
	/****** To load matched jobs   **********/
	/****************************************/

	const [matchedJobs, setMatchedJobs] = useState<JobPosts[]>([]);
	const loadMatchedJobs = async () => {
		try {
			const res = await getMatchedJob();
			if (res) {
				setMatchedJobs(res);
			}
		} catch (error: any) {
			toast.error(error.response && error.response.data.error, {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};
	useEffect(() => {
		loadMatchedJobs();
	}, []);

	return (
		<SubscriberPageLayout>
			<div>
				{matchedJobs &&
					matchedJobs.map((job) => (
						<JobPostsPublicCard jobpost={job} key={job._id} />
					))}
			</div>
		</SubscriberPageLayout>
	);
};

export default JobMatch;
