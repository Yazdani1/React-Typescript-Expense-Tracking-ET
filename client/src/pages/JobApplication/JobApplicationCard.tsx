import { FC, useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { JobApplication } from '../../services/DataProvider';
import { deleteJobApplication } from '../../services/API';
import style from './JobApplication.module.scss';
import DropDownList from '../../components/DropDown/DropDownList';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { useJobApplicationContext } from '../../contextapi/JobApplicationContext';

interface JobApplicationCardProps {
	job_application: JobApplication;
}

const JobApplicationCard: FC<JobApplicationCardProps> = ({
	job_application,
}) => {
	// Context API
	const { loadJobApplication } = useJobApplicationContext();

	/****************************************/
	/*Confirm modal to delete jobapplication**/
	/****************************************/
	const [open, setOpen] = useState<boolean>(false);
	const onOpenModal = () => {
		setOpen(true);
	};
	const onCloseModal = () => {
		setOpen(false);
	};

	/****************************************/
	/****** To delete job application *******/
	/****************************************/

	const withdrawJobApplication = async () => {
		try {
			const res = await deleteJobApplication(job_application?._id!);
			if (res) {
				toast.success('Job application deleted successfully!', {
					position: toast.POSITION.TOP_CENTER,
				});
				loadJobApplication();
			}
		} catch (error: any) {
			toast.error(error.response && error.response.data.error, {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};

	return (
		<div className={style.job_application_card_container}>
			<div style={{ flex: 2 }}>
				<Link
					to={'/job-details/' + job_application.jobPostId?.slug}
					style={{ textDecoration: 'none', color: 'inherit' }}
				>
					<h6>{job_application.jobPostId?.title}</h6>
				</Link>
				<p>{job_application.jobPostOwnerId?.name}</p>
			</div>
			<p>{moment(job_application.date).format('MMM DD, YYYY HH:mm:ss')}</p>
			<p>{job_application.status}</p>
			<DropDownList
				showJobWithdraw={true}
				withdrawJobApplication={onOpenModal}
			/>
			{/* Modal box to to delete job application */}
			<ConfirmModal
				open={open}
				onCloseModal={onCloseModal}
				deletePost={withdrawJobApplication}
				title='Withdraw job application'
				showDeleteButton
			>
				<h5>Are you sure you want to withdraw this job application?</h5>
			</ConfirmModal>
		</div>
	);
};

export default JobApplicationCard;
