import { FC } from 'react';
import { toast } from 'react-toastify';
import { AiFillHeart } from 'react-icons/ai';

import { deleteJobWishList } from '../../services/API';
import { JobWishList } from '../../services/DataProvider';
import { useJobWishListContext } from '../../contextapi/JobWishListContext';
import style from './JobWishList.module.scss';

interface JobWishListCardProps {
	jobwishlist: JobWishList;
}

const JobWishListCard: FC<JobWishListCardProps> = ({ jobwishlist }) => {

	//Context api
	const { allJobWishList, loadJobWishList } = useJobWishListContext();
	
	/****************************************/
	/****** Delete job wishlist *************/
	/****************************************/

	const handleDeleteJobWishList = async () => {
		try {
			const res = await deleteJobWishList(jobwishlist?._id);
			if (res) {
				toast.success('Job post deleted from your wishlist', {
					position: toast.POSITION.TOP_CENTER,
				});
				loadJobWishList();
			}
		} catch (error: any) {
			toast.error(error.response && error.response.data.error, {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};
	return (
		<div className={style.job_post_container}>
			<h6>{jobwishlist.jobPostId?.title}</h6>
			<p>Published by:{jobwishlist.jobPostPublishedBy?.name}</p>
			<p>{jobwishlist.jobPostId?.des}</p>
			<div className={style.job_skills}>
				{jobwishlist.jobPostId?.jobSkills?.map((skill, index) => (
					<p key={index} className={style.skill_item}>
						{skill}
					</p>
				))}
			</div>
			<div className={style.job_post_bottom_row}>
				<p>{jobwishlist.jobPostId?.jobCity}</p>
				<p>{jobwishlist.jobPostId?.visibility}</p>
				<p>{jobwishlist.jobPostId?.status}</p>
				<p onClick={handleDeleteJobWishList}>
					<AiFillHeart size={25} />
					Unsaved
				</p>
			</div>
		</div>
	);
};

export default JobWishListCard;
