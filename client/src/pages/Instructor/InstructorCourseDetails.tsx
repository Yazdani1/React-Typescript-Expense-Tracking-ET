import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import InstructorPageLayout from '../../layouts/InstructorPageLayout';
import {
	getSingleCourseLectures,
	CreateLectureProps,
	createLecture,
	updateLecture,
} from '../../services/API';
import {
	Course,
	Lecture,
	CourseEnrolmentItems,
} from '../../services/DataProvider';
import CardLayout from '../../components/CardLayout/CardLayout';
import ModalBox from '../../components/Modal/ModalBox';
import TextField from '../../components/Input/TextField';
import EnroledStudentCard from './EnroledStudentCard';

const InstructorCourseDetails = () => {
	const { slug } = useParams();

	/****************************************/
	/* Course details and lectures   ********/
	/****************************************/

	const [courseDetails, setCourseDetails] = useState<Course>();
	const [lectures, setLectures] = useState<Lecture[]>([]);
	const [enroledStudentsList, setEnrolStudentsList] = useState<
		CourseEnrolmentItems[]
	>([]);

	const loadCourseDetailsLectures = async () => {
		try {
			const res = await getSingleCourseLectures(slug!);

			if (res) {
				setCourseDetails(res.singleCourse);
				setLectures(res.lectureLists);
				setEnrolStudentsList(res.enroledStudents);
			}
		} catch (error: any) {
			toast.error(error.response && error.response.data.error, {
				position: toast.POSITION.TOP_RIGHT,
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

	/****************************************/
	/************** Create lectures  ********/
	/****************************************/

	const [lectureTitle, setLectureTitle] = useState<string>('');
	const [lectureDes, setLectureDes] = useState<string>('');

	const onSubmitCreateLectures = async () => {
		try {
			const payload: CreateLectureProps = {
				lectureTitle: lectureTitle,
				lectureDes: lectureDes,
				courseId: courseDetails?._id!,
			};

			const res = await createLecture(payload);

			if (res) {
				toast.success('Lecture created', {
					position: toast.POSITION.TOP_CENTER,
				});

				loadCourseDetailsLectures();
			}
		} catch (error: any) {
			toast.error(error.response && error.response.data.error, {
				position: toast.POSITION.TOP_CENTER,
			});
		}
	};

	const resetLectureInput = () => {
		setLectureTitle('');
		setLectureDes('');
	};

	useEffect(() => {
		loadCourseDetailsLectures();
	}, []);

	const handleDragEnd = async (result: any) => {
		if (!result.destination) {
			return;
		}

		const sourceIndex = result.source.index;
		const destinationIndex = result.destination.index;

		if (sourceIndex === destinationIndex) {
			return; // No change needed if dropped at the same position
		}

		const newLectures = Array.from(lectures);
		const [draggedLecture] = newLectures.splice(sourceIndex, 1);
		newLectures.splice(destinationIndex, 0, draggedLecture);

		setLectures(newLectures);

		try {
			// Update the positions in the backend
			const res = await Promise.all(
				newLectures.map(async (lecture, index) => {
					await updateLecture(lecture._id, { position: index });
				})
			);

			if (res) {
				loadCourseDetailsLectures();
			}

			toast.success('Lectures Reordered!', {
				position: toast.POSITION.TOP_CENTER,
			});
		} catch (error) {
			console.error('Error updating lecture positions:', error);
			// Handle error and possibly revert the state change if needed
			setLectures(lectures);
		}
	};

	// To add drag and drop features but its not doen
	// const handleDrag = async (e: any, index: number) => {
	//   e.dataTransfer.setData('text/plain', index);
	//   console.log('From position', index);
	// };

	// const handleDrop = async (e: any, dropIndex: number, lectureId: string, lectureTitle: string, lectureDes: string) => {
	//   e.preventDefault();

	//   const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
	//   if (draggedIndex === dropIndex) {
	//     return; // No change needed if dropped at the same position
	//   }

	//   const newLectures = [...lectures];
	//   const [draggedLecture] = newLectures.splice(draggedIndex, 1);

	//   // Reorder the lectures
	//   newLectures.splice(dropIndex, 0, draggedLecture);

	//   setLectures(newLectures); // Update frontend state immediately for smooth UI experience

	//   // Update the positions of all lectures
	//   const updatedLectures = newLectures.map((lecture, index) => ({
	//     ...lecture,
	//     position: index,
	//   }));

	//   try {
	//     // Send the updated lecture positions to the backend
	//     await Promise.all(
	//       updatedLectures.map(async (lecture) => {
	//         await updateLecture(lecture._id, {
	//           position: lecture.position,
	//           lectureTitle: lecture.lectureTitle, // Add lecture title and description
	//           lectureDes: lecture.lectureDes,
	//         });
	//       })
	//     );

	//     toast.success('Lectures Reordered!', {
	//       position: toast.POSITION.TOP_CENTER,
	//     });
	//   } catch (error) {
	//     console.error('Error updating lecture positions:', error);
	//     // Handle error and possibly revert the state change if needed
	//     setLectures(newLectures); // Revert state change
	//   }
	// };

	// const handleDrop = async (e: any, dropIndex: number, id: string, lectureTitle: string, lectureDes: string) => {
	//   e.preventDefault();

	//   const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
	//   if (draggedIndex === dropIndex) {
	//     return; // No change needed if dropped at the same position
	//   }

	//   const newLectures = [...lectures];
	//   const [draggedLecture] = newLectures.splice(draggedIndex, 1);

	//   // Reorder the lectures
	//   newLectures.splice(dropIndex, 0, draggedLecture);

	//   // Update the lecture's position in the backend
	//   const updatePayload: UpdateLectureProps = {
	//     position: dropIndex,
	//     lectureTitle: lectureTitle,
	//     lectureDes: lectureDes,
	//   };

	//   try {
	//     console.log('Updating lecture position in the backend...');
	//     await updateLecture(id, updatePayload);
	//     console.log('Lecture position updated in the backend.');

	//     // Update the positions of all lectures in the frontend state
	//     const updatedLectures = newLectures.map((lecture, index) => ({
	//       ...lecture,
	//       position: index,
	//     }));

	//     // Update the state with the modified lectures array
	//     setLectures(updatedLectures);

	//     toast.success('Lecture Updated!', {
	//       position: toast.POSITION.TOP_CENTER,
	//     });
	//   } catch (error) {
	//     console.error('Error updating lecture position in the backend:', error);
	//     // Handle error and possibly revert the state change if needed
	//     setLectures(newLectures); // Revert state change
	//   }
	// };

	// const handleDrop = async (e: any, dropIndex: number, id: string, lectureTitle: string, lectureDes: string, position: number) => {
	//   e.preventDefault();

	//   console.log(dropIndex);

	//   const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
	//   if (draggedIndex === dropIndex) {
	//     return; // No change needed if dropped at the same position
	//   }

	//   const newLectures = [...lectures];
	//   const [draggedLecture] = newLectures.splice(draggedIndex, 1);

	//   // Reorder the lectures
	//   newLectures.splice(dropIndex, 0, draggedLecture);

	//   // Update the frontend state with the new order
	//   setLectures(newLectures);

	//   // Update the lecture's position in the backend
	//   const updatePayload: UpdateLectureProps = {
	//     position: dropIndex,
	//     lectureTitle: lectureTitle,
	//     lectureDes: lectureDes,
	//   };

	//   try {
	//     const res = await updateLecture(id, updatePayload);
	//     console.log('Lecture position updated in the backend:', res);

	//     // Assuming `updateLecture` returns the updated lecture object, you can update the state
	//     setLectures((prevLectures) => prevLectures.map((lecture) => (lecture._id === id ? res : lecture)));

	//     toast.success('Lecture Updated!', {
	//       position: toast.POSITION.TOP_CENTER,
	//     });
	//   } catch (error) {
	//     console.error('Error updating lecture position in the backend:', error);
	//     // Handle error and possibly revert the state change if needed
	//   }
	// };

	// const handleDrop = async (e: any, dropIndex: number, id: string) => {
	//   e.preventDefault();

	//   const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
	//   if (draggedIndex === dropIndex) {
	//     return; // No change needed if dropped at the same position
	//   }

	//   const newLectures = [...lectures];
	//   const [draggedLecture] = newLectures.splice(draggedIndex, 1);

	//   if (draggedIndex < dropIndex) {
	//     // If the dragged lecture was placed before the drop position
	//     newLectures.splice(dropIndex, 0, draggedLecture);
	//   } else {
	//     // If the dragged lecture was placed after the drop position
	//     newLectures.splice(dropIndex, 0, draggedLecture);
	//   }

	//   const payload: UpdateLectureProps = {
	//     position: dropIndex,
	//   };

	//   const res = await updateLecture(id!, payload);

	//   if (res) {
	//     setLectures([...newLectures, res]);

	//     toast.success('Lecture Updated!', {
	//       position: toast.POSITION.TOP_CENTER,
	//     });
	//   }
	// };

	// const handleDrop = (e: any, dropIndex: number) => {
	//   e.preventDefault();

	//   const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
	//   const newLectures = [...lectures];

	//   // Remove the dragged lecture from its original position
	//   const [draggedLecture] = newLectures.splice(draggedIndex, 1);

	//   // Insert the dragged lecture at the new drop position
	//   newLectures.splice(dropIndex, 0, draggedLecture);

	//   setLectures(newLectures);
	// };

	//End To add drag and drop features but its not doen

	return (
		<InstructorPageLayout>
			<CardLayout>
				<h6>{courseDetails?.title}</h6>
				<p>{courseDetails?.des}</p>
				<p>{courseDetails?._id}</p>
				<p>Coupon: {courseDetails?.coupon}</p>
				<p>Total seats: {courseDetails?.maxStudents}</p>
				<p>Enrolled students: {courseDetails?.enrolledStudents}</p>
				<p>Instructor: {courseDetails?.postedBy?.name}</p>
			</CardLayout>

			<CardLayout>
				<button className='btn btn-primary' onClick={onOpenModal}>
					Add Lectures
				</button>
			</CardLayout>

			<div className='row'>
				<div className='col-xl-4 col-lg-4'>
					<div className='row'>
						<DragDropContext onDragEnd={handleDragEnd}>
							<Droppable droppableId='lectureList'>
								{(provided) => (
									<div ref={provided.innerRef} {...provided.droppableProps}>
										{lectures
											.sort((a, b) => a.position - b.position)
											.map((lecture, index) => (
												<Draggable
													key={lecture._id}
													draggableId={lecture._id}
													index={index}
												>
													{(provided) => (
														<div
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
														>
															<CardLayout>
																<h5>{index}</h5>
																<h6>{lecture.lectureTitle}</h6>
																<p>{lecture.lectureDes}</p>
																<p>{lecture.courseId.title}</p>
																<p>Position {lecture.position}</p>
															</CardLayout>
														</div>
													)}
												</Draggable>
											))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</DragDropContext>
					</div>
				</div>
				{/* {lectures && lectures.map((lecture, index) => <LectureCard lecture={lecture} indexDrag={index} indexDrop={index} />)} */}

				<div className='col-xl-4 col-lg-4'>
					{lectures &&
						lectures
							.sort((a, b) => a.position - b.position)
							.map((lecture, index) => (
								<CardLayout>
									<h5>{index}</h5>
									<h6>{lecture.lectureTitle}</h6>
									<p>{lecture.lectureDes}</p>
									<p>{lecture.courseId.title}</p>
									<p>Position {lecture.position}</p>
								</CardLayout>
							))}
				</div>

				<div className='col-xl-4 col-lg-4'>
					{enroledStudentsList &&
						enroledStudentsList.map((student) => (
							<EnroledStudentCard student={student} key={student._id} />
						))}
				</div>
			</div>

			{/* Modal box to create lectures */}

			<ModalBox
				open={open}
				onCloseModal={onCloseModal}
				title='Add lecture'
				onResetButton={resetLectureInput}
				onSaveButton={onSubmitCreateLectures}
			>
				<TextField
					label='Lecture title'
					value={lectureTitle}
					setValue={setLectureTitle}
				/>
				<TextField
					label='Lecture description'
					value={lectureDes}
					setValue={setLectureDes}
				/>
			</ModalBox>
		</InstructorPageLayout>
	);
};

export default InstructorCourseDetails;
