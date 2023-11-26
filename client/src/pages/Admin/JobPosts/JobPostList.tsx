import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import style from './JobPosts.module.scss';
import AdminPageLayout from '../../../layouts/AdminPageLayout';
import { getAllEmployerJobPosts } from '../../../services/API';
import { JobPosts } from '../../../services/DataProvider';
import JobPostsCard from './JobPostsCard';

const JobPostList = () => {
	/****************************************/
	/******All job posts lists  *************/
	/****************************************/

	const [allJobPosts, setAllJobPosts] = useState<JobPosts[]>([]);
	const loadAllEmployerJobPosts = async () => {
		try {
			const res = await getAllEmployerJobPosts();
			if (res) {
				setAllJobPosts(res);
			}
		} catch (error: any) {
			toast.error(error.response && error.response.data.error, {
				position: toast.POSITION.BOTTOM_CENTER,
			});
		}
	};

	useEffect(() => {
		loadAllEmployerJobPosts();
	}, []);
	return (
		<AdminPageLayout>
			<JobPostItemRow />
			{allJobPosts &&
				allJobPosts.map((job) => (
					<JobPostsCard
						jobpost={job}
						loadJobposts={loadAllEmployerJobPosts}
						key={job._id}
					/>
				))}
		</AdminPageLayout>
	);
};
export default JobPostList;

const JobPostItemRow = () => {
	return (
		<div className={style.jobpost_header_row}>
			<h6>Title</h6>
			<p>Visibility</p>
			<p>Status</p>
			<p>City</p>
			<p>Application</p>
			<p>Published By</p>
			<p>Edit</p>
			<p>Preview</p>
		</div>
	);
};
