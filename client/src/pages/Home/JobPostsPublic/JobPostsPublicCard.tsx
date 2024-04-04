import React, { useEffect, useState, FC } from 'react';
import { toast } from 'react-toastify';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import style from './JobPostsPublic.module.scss';
import {
	createJobWishList,
	deleteJobWishList,
	CreateJobWishListProps,
	getSingleJobWishlist,
} from '../../../services/API';
import { JobPosts, JobWishList } from '../../../services/DataProvider';
import { useJobWishListContext } from '../../../contextapi/JobWishListContext';

interface JobPostsPublicCardProps {
	jobpost: JobPosts;
}

const JobPostsPublicCard: FC<JobPostsPublicCardProps> = ({ jobpost }) => {
	let navigate = useNavigate();
	// Redux toolkit for user profile details
	const userProfileDetails = useSelector(
		(state: any) => state.user.currentUser
	);
	//Context api
	const { allJobWishList, loadJobWishList } = useJobWishListContext();

	const isJobPostSaved =
		allJobWishList &&
		allJobWishList.some((job) => job.jobPostId?._id === jobpost?._id);

	/****************************************/
	/****** Create job wishlist *************/
	/****************************************/

	const handleSaveJobWishList = async () => {
		try {
			const payload: CreateJobWishListProps = {
				jobPostPublishedBy: jobpost.postedBy?._id,
				jobPostId: jobpost?._id,
			};

			const res = await createJobWishList(payload);

			if (res) {
				toast.success('You have saved this job post', {
					position: toast.POSITION.TOP_CENTER,
				});

				loadSingleJobWishlist();
				loadJobWishList();
			}
		} catch (error: any) {
			toast.error(error.response && error.response.data.error, {
				position: toast.POSITION.TOP_CENTER,
			});
		}
	};

	/****************************************/
	/****** Get single job wishlist *********/
	/****************************************/

	const [jobWishList, setJobWishList] = useState<JobWishList>();

	const loadSingleJobWishlist = async () => {
		try {
			const res = await getSingleJobWishlist(jobpost?.slug);

			if (res) {
				setJobWishList(res);
			}
		} catch (error: any) {
			toast.error(error.response && error.response.data.error, {
				position: toast.POSITION.TOP_CENTER,
			});
		}
	};

	/****************************************/
	/****** Delete single job wishlist ******/
	/****************************************/

	const handleDeleteJobWishList = async () => {
		try {
			const res = await deleteJobWishList(jobWishList?._id!);

			if (res) {
				toast.success('Job post deleted from your wishlist', {
					position: toast.POSITION.TOP_CENTER,
				});
				loadJobWishList();
				loadSingleJobWishlist();
			}
		} catch (error: any) {
			toast.error(error.response && error.response.data.error, {
				position: toast.POSITION.TOP_CENTER,
			});
		}
	};

	useEffect(() => {
		loadSingleJobWishlist();
	}, []);

	return (
		<div className={style.job_post_container}>
			<Link
				to={'/job-details/' + jobpost.slug}
				style={{ textDecoration: 'none', color: 'inherit' }}
			>
				<h6>{jobpost.title}</h6>
				<p>Published by:{jobpost.postedBy?.name}</p>
				<p>{jobpost.des}</p>
				<div className={style.job_skills}>
					{jobpost.jobSkills.map((skill, index) => (
						<p key={index} className={style.skill_item}>
							{skill}
						</p>
					))}
				</div>
			</Link>

			<div className={style.job_post_bottom_row}>
				<p>{jobpost.jobCity}</p>
				<p>{jobpost.visibility}</p>
				<p>{jobpost.status}</p>
				<p>{jobpost.totalApplication}</p>

				{userProfileDetails && (
					<>
						{isJobPostSaved && (
							<p
								onClick={handleDeleteJobWishList}
								style={{ cursor: 'pointer' }}
							>
								<AiFillHeart size={25} />
								Saved
							</p>
						)}
						{!isJobPostSaved && (
							<p onClick={handleSaveJobWishList} style={{ cursor: 'pointer' }}>
								<AiOutlineHeart size={25} />
								Save
							</p>
						)}
					</>
				)}

				{!userProfileDetails && (
					<p onClick={() => navigate('/signin')} style={{ cursor: 'pointer' }}>
						<AiOutlineHeart size={25} />
						Save
					</p>
				)}
			</div>
		</div>
	);
};

export default JobPostsPublicCard;
