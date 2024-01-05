import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import InstructorPageLayout from '../../layouts/InstructorPageLayout';
import CardLayout from '../../components/CardLayout/CardLayout';
import {
	getCourseLists,
	createCourse,
	CreateCourseProps,
	filterInstructorCourse,
} from '../../services/API';
import { Course, FilterCourseByTitle } from '../../services/DataProvider';
import InstructorCourseCard from './InstructorCourseCard';
import ModalBox from '../../components/Modal/ModalBox';
import TextField from '../../components/Input/TextField';
import style from './InstructorDashboard.module.scss';

const InstructorDashboard = () => {
	/****************************************/
	/***********  Create course *************/
	/****************************************/
	const [title, setTitle] = useState<string>('');
	const [des, setDes] = useState<string>('');
	const [coupon, setCoupon] = useState<string>('');
	const [maxStudents, setMaxStudents] = useState<string>('');

	const onSubmitCreateCourse = async () => {
		try {
			const payload: CreateCourseProps = {
				title: title,
				des: des,
				coupon: coupon,
				maxStudents: parseInt(maxStudents),
			};
			const res = await createCourse(payload);
			if (res) {
				toast.success('Course created', {
					position: toast.POSITION.TOP_CENTER,
				});
				loadCourses();
			}
		} catch (error: any) {
			toast.error(error.response && error.response.data.error, {
				position: toast.POSITION.TOP_CENTER,
			});
		}
	};

	const resetCourseInput = () => {
		setTitle('');
		setDes('');
		setCoupon('');
		setMaxStudents('');
	};

	/****************************************/
	/***********  Load courses **************/
	/****************************************/

	const [courses, setCourses] = useState<Course[]>([]);

	const loadCourses = async () => {
		try {
			const res = await getCourseLists();
			if (res) {
				setCourses(res);
			}
		} catch (error: any) {
			toast.error(error.response && error.response.data.error, {
				position: toast.POSITION.TOP_CENTER,
			});
		}
	};

	//Filter courses

	const [sortCoursesByTitle, setSortCoursesByTitle] =
		useState<FilterCourseByTitle>(FilterCourseByTitle.Ascending);

	// This to get integer number from enum
	const filterCourseOptions = {
		Ascending: FilterCourseByTitle.Ascending,
		Descending: FilterCourseByTitle.Descending,
	};
	const onSubmitsortCoursesByTitle = async () => {
		try {
			const res = await filterInstructorCourse(sortCoursesByTitle);

			if (res) {
				setCourses(res);
			}
		} catch (error: any) {
			toast.error(error.response && error.response.data.error, {
				position: toast.POSITION.TOP_CENTER,
			});
		}
	};

	/****************************************/
	/******Modal Box to Create Courses   ***/
	/****************************************/

	const [open, setOpen] = useState<boolean>(false);
	const onOpenModal = () => {
		setOpen(true);
	};
	const onCloseModal = () => {
		setOpen(false);
	};

	useEffect(() => {
		loadCourses();
	}, []);

	return (
		<InstructorPageLayout>
			<CardLayout>
				<h6>Instructor dashboard</h6>
			</CardLayout>
			<CardLayout>
				<button className='btn btn-primary' onClick={onOpenModal}>
					Create Course
				</button>
			</CardLayout>
			<CardLayout>
				<div>
					<h6>Sort By Title:{sortCoursesByTitle}</h6>
					<div className='selected-dropdownlist'>
						<select
							className={style.expenseCategorySelect}
							value={sortCoursesByTitle}
							onChange={(e) => setSortCoursesByTitle(parseInt(e.target.value))}
						>
							{Object.keys(filterCourseOptions).map((key) => (
								<option
									value={
										filterCourseOptions[key as keyof typeof filterCourseOptions]
									}
									key={key}
								>
									{key}
								</option>
							))}
						</select>
					</div>
					<button
						className='btn btn-success'
						onClick={onSubmitsortCoursesByTitle}
					>
						Filter
					</button>
				</div>
				<hr />
				<div className='row'>
					{courses &&
						courses.map((course) => (
							<div className='col-xl-4 col-lg-4'>
								<InstructorCourseCard course={course} key={course._id} />
							</div>
						))}
				</div>
			</CardLayout>

			{/* Modal box to create course */}

			<ModalBox
				open={open}
				onCloseModal={onCloseModal}
				title='Create course'
				onResetButton={resetCourseInput}
				onSaveButton={onSubmitCreateCourse}
			>
				<TextField label='Title' value={title} setValue={setTitle} />
				<TextField label='Coupon' value={coupon} setValue={setCoupon} />
				<TextField
					label='Max students'
					value={maxStudents}
					setValue={setMaxStudents}
				/>
				<TextField label='Description' value={des} setValue={setDes} />
			</ModalBox>
		</InstructorPageLayout>
	);
};

export default InstructorDashboard;
