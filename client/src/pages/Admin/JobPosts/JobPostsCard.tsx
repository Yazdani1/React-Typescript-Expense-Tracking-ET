import React, { FC, useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { CgExpand } from 'react-icons/cg';
import { toast } from 'react-toastify';
import { IoMdClose } from 'react-icons/io';

import ModalBox from '../../../components/Modal/ModalBox';
import TextField from '../../../components/Input/TextField';
import {
	updateAnyEmployerJobPosts,
	UpdateAnyEmployerJobPostProps,
} from '../../../services/API';
import { JobPosts, Visibility, Status } from '../../../services/DataProvider';
import style from './JobPosts.module.scss';

interface JobPostsCardProps {
	jobpost: JobPosts;
	loadJobposts: () => void;
}

const JobPostsCard: FC<JobPostsCardProps> = ({ jobpost, loadJobposts }) => {
	/****************************************/
	/******Modal Box to show preview   ******/
	/****************************************/

	const [open, setOpen] = useState<boolean>(false);

	const onOpenModal = () => {
		setOpen(true);
	};

	const onCloseModal = () => {
		setOpen(false);
	};

	/****************************************/
	/******Modal Box to Edit Job Post   ***/
	/****************************************/

	const [editOpenModal, setEditOpenModal] = useState<boolean>(false);

	const onOpenEditModal = () => {
		setEditOpenModal(true);
	};

	const onCloseEditModal = () => {
		setEditOpenModal(false);
	};

	/****************************************/
	/****** Update job post   ***************/
	/****************************************/

	const [title, setTitle] = useState<string>('');
	const [des, setDes] = useState<string>('');
	const [jobCity, setJobCity] = useState<string>('');
	const [visibility, setVisibility] = useState<Visibility>(Visibility.Public);
	const [status, setStatus] = useState<Status>();

	const [addjobSkills, setAddJobSkills] = useState<string>('');
	const [jobSkillsList, setJobSkillsList] = useState<string[]>([]);

	const addJobSkills = () => {
		setJobSkillsList([...jobSkillsList, addjobSkills]);
		setAddJobSkills('');
	};

	const removeJobSkills = (skillIndex: string) => {
		const skills = jobSkillsList.filter((item) => item !== skillIndex);
		setJobSkillsList(skills);
	};

	const onSubmitUpdateSingleJob = async () => {
		try {
			const payload: UpdateAnyEmployerJobPostProps = {
				title: title,
				des: des,
				jobCity: jobCity,
				jobSkills: jobSkillsList,
				visibility: visibility,
				status: status,
			};

			const res = await updateAnyEmployerJobPosts(jobpost._id, payload);

			if (res) {
				toast.success('Job post updated successfully', {
					position: toast.POSITION.TOP_RIGHT,
				});
				loadJobposts();
			}
		} catch (error: any) {
			toast.error(error.response && error.response.data.error, {
				position: toast.POSITION.BOTTOM_CENTER,
			});
		}
	};

	const onResetJobPostInputField = () => {
		setTitle(jobpost?.title);
		setDes(jobpost?.des);
		setJobCity(jobpost?.jobCity);
		setVisibility(jobpost?.visibility);
		setJobSkillsList(jobpost?.jobSkills);
		setStatus(jobpost?.status);
	};

	useEffect(() => {
		setTitle(jobpost?.title);
		setDes(jobpost?.des);
		setJobCity(jobpost?.jobCity);
		setVisibility(jobpost?.visibility);
		setJobSkillsList(jobpost?.jobSkills);
		setStatus(jobpost?.status);
	}, []);

	return (
		<div className={style.jobpost_container}>
			<h6>{jobpost.title}</h6>
			<p>{jobpost.visibility}</p>

			{jobpost.status === 'Approved' && (
				<p style={{ color: 'green', fontWeight: 'bold' }}>{jobpost.status}</p>
			)}
			{jobpost.status === 'Panding' && (
				<p style={{ color: 'red', fontWeight: 'bold' }}>{jobpost.status}</p>
			)}

			<p>{jobpost.jobCity}</p>

			<p>{jobpost.totalApplication}</p>
			<p>{jobpost.postedBy?.name}</p>

			<p onClick={onOpenEditModal} style={{ cursor: 'pointer' }}>
				<MdEdit size={30} color='Green' />
			</p>

			<p onClick={onOpenModal} style={{ cursor: 'pointer' }}>
				<CgExpand size={30} color='orange' />
			</p>

			{/* To edit a single job */}
			<ModalBox
				open={editOpenModal}
				onCloseModal={onCloseEditModal}
				title='Update job post'
				onSaveButton={onSubmitUpdateSingleJob}
				onResetButton={onResetJobPostInputField}
			>
				<TextField label='Title' value={title} setValue={setTitle} />
				<TextField label='City' value={jobCity} setValue={setJobCity} />
				<TextField label='Description' value={des} setValue={setDes} />

				<div className={style.visibility_drop_down_container}>
					<label>Visibility</label>
					<select
						value={visibility}
						className={style.visiblity_item}
						onChange={(e) => setVisibility(e.target.value as Visibility)}
					>
						{Object.keys(Visibility).map((vtype) => (
							<option value={vtype}>{vtype}</option>
						))}
					</select>
				</div>

				<div className={style.visibility_drop_down_container}>
					<label>Status</label>
					<select
						value={status}
						className={style.visiblity_item}
						onChange={(e) => setStatus(e.target.value as Status)}
					>
						{Object.keys(Status).map((vtype) => (
							<option value={vtype}>{vtype}</option>
						))}
					</select>
				</div>

				<TextField
					label='Job skills'
					value={addjobSkills}
					setValue={setAddJobSkills}
				/>
				<div className={style.skills_container}>
					{jobSkillsList.map((skill, index) => (
						<div key={index} className={style.skill_item}>
							<p className={style.skill}>{skill}</p>
							<p
								className={style.close_icon}
								onClick={() => removeJobSkills(skill)}
							>
								<IoMdClose />
							</p>
						</div>
					))}
				</div>
				<button className='btn btn-warning' onClick={addJobSkills}>
					Add Skills
				</button>
			</ModalBox>

			{/* To preview a single job post modal*/}

			<ModalBox open={open} onCloseModal={onCloseModal} title='Job preview'>
				<h6>{jobpost.title}</h6>
				<p>{jobpost.des}</p>
				<p>{jobpost.jobCity}</p>
				<p>{jobpost.visibility}</p>
				<p>{jobpost.status}</p>
				<p>{jobpost.totalApplication}</p>
				<p>Approved By: {jobpost.approvedBy?.name}</p>
			</ModalBox>
		</div>
	);
};

export default JobPostsCard;
