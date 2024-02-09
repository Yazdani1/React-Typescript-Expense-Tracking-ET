import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MdEdit, MdDelete } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';

import EmployerPageLayout from '../../layouts/EmployerPageLayout';
import { getEmployerJobPosts } from '../../services/API';
import { JobPosts, Visibility } from '../../services/DataProvider';
import EmployerJobPostCard from './EmployerJobPostCard';
import style from './EmployerJobPost.module.scss';
import ModalBox from '../../components/Modal/ModalBox';
import TextField from '../../components/Input/TextField';
import CardLayout from '../../components/CardLayout/CardLayout';
import {
	CreateJobPostProps,
	createJobPosts,
	JobpostsVisibilityUpdateProps,
	updateJobPostsVisibility,
} from '../../services/API';

const EmployerDashboard = () => {
	/****************************************/
	/*********  Load Job Posts    ***********/
	/****************************************/
	const [jobPosts, setJobPosts] = useState<JobPosts[]>([]);
	const loadJobposts = async () => {
		try {
			const res = await getEmployerJobPosts();

			if (res) {
				setJobPosts(res);
			}
		} catch (error: any) {
			toast.error(error.response && error.response.data.error, {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};

	/****************************************/
	/******Modal Box to Create Job Post   ***/
	/****************************************/

	const [open, setOpen] = useState<boolean>(false);
	const onOpenModal = () => {
		setOpen(true);
	};
	const onCloseModal = () => {
		setOpen(false);
	};

	/****************************************/
	/****** Create job posts ****************/
	/****************************************/
	const [title, setTitle] = useState<string>('');
	const [des, setDes] = useState<string>('');
	const [jobCity, setJobCity] = useState<string>('');
	const [visibility, setVisibility] = useState<Visibility>(Visibility.Public);
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
	const onSubmitCreateJobPosts = async () => {
		try {
			const payload: CreateJobPostProps = {
				title: title,
				des: des,
				jobCity: jobCity,
				jobSkills: jobSkillsList,
				visibility: visibility,
			};
			const res = await createJobPosts(payload);
			if (res) {
				toast.success('Job post created successfully!', {
					position: toast.POSITION.TOP_RIGHT,
				});
				loadJobposts();
				onResetJobPostInputField();
			}
		} catch (error: any) {
			toast.error(error.response && error.response.data.error, {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};
	const onResetJobPostInputField = () => {
		setTitle('');
		setDes('');
		setJobCity('');
		setVisibility(Visibility.Public);
		setAddJobSkills('');
		setJobSkillsList([]);
	};

	/****************************************/
	/* Update all visibility for job post ***/
	/****************************************/
	const [updateJobVisibility, setUpdateJobVisibility] = useState<Visibility>(
		Visibility.Public
	);
	const handleUpdateJobVisibility = async () => {
		try {
			const payload: JobpostsVisibilityUpdateProps = {
				updateVisibility: updateJobVisibility,
			};
			const res = await updateJobPostsVisibility(payload);
			if (res) {
				toast.success('Job post visibility updated successfully!', {
					position: toast.POSITION.TOP_RIGHT,
				});
				loadJobposts();
			}
		} catch (error: any) {
			toast.error(error.response && error.response.data.error, {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};
	useEffect(() => {
		loadJobposts();
	}, []);

	return (
		<EmployerPageLayout>
			<h1>Employer dashboar</h1>
			<CardLayout>
				<button className='btn btn-success' onClick={onOpenModal}>
					Create job post
				</button>
			</CardLayout>
			{/* To update all the job visibility */}
			<CardLayout>
				<div className={style.updateVisibilitycontainer}>
					<div className={style.visibility_drop_down_container}>
						<select
							value={updateJobVisibility}
							className={style.visiblity_item}
							onChange={(e) =>
								setUpdateJobVisibility(e.target.value as Visibility)
							}
						>
							{Object.keys(Visibility).map((vtype) => (
								<option value={vtype}>{vtype}</option>
							))}
						</select>
					</div>
					<button
						className={style.updateVisibilityButton}
						onClick={handleUpdateJobVisibility}
					>
						Update all visibility
					</button>
				</div>
			</CardLayout>
			<JobPostItemRow />
			<div style={{ height: '100vh' }}>
				{jobPosts &&
					jobPosts.map((jobpost) => (
						<EmployerJobPostCard
							jobpost={jobpost}
							key={jobpost._id}
							loadJobposts={loadJobposts}
						/>
					))}
			</div>
			{/* Modal box to create jobpost */}
			<ModalBox
				open={open}
				onCloseModal={onCloseModal}
				title='Create job posts'
				onResetButton={onResetJobPostInputField}
				onSaveButton={onSubmitCreateJobPosts}
			>
				<TextField label='Title' value={title} setValue={setTitle} />
				<TextField label='City' value={jobCity} setValue={setJobCity} />
				<TextField label='Description' value={des} setValue={setDes} />
				<div className={style.visibility_drop_down_container}>
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
		</EmployerPageLayout>
	);
};

export default EmployerDashboard;

const JobPostItemRow = () => {
	return (
		<div className={style.jobpost_header_row}>
			<h6>Title</h6>
			<p>Visibility</p>
			<p>Status</p>
			<p>City</p>
			<p>Application</p>
			{/* <p>Edit</p>
      <p>Delete</p> */}
			<p>Preview</p>
			<p>Action</p>
		</div>
	);
};
