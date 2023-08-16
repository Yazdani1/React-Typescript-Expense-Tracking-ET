import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import InstructorPageLayout from '../../layouts/InstructorPageLayout';
import { getSingleCourseLectures, CreateLectureProps, createLecture } from '../../services/API';
import { Course, Lecture, CourseEnrolmentItems } from '../../services/DataProvider';
import CardLayout from '../../components/CardLayout/CardLayout';
import LectureCard from './LectureCard';
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
  const [enroledStudentsList, setEnrolStudentsList] = useState<CourseEnrolmentItems[]>([]);

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

  const handleDrag = (e: any, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDrop = (e: any, dropIndex: number) => {
    e.preventDefault();

    const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (draggedIndex === dropIndex) {
      return; // No change needed if dropped at the same position
    }

    const newLectures = [...lectures];
    const [draggedLecture] = newLectures.splice(draggedIndex, 1);

    if (draggedIndex < dropIndex) {
      // If the dragged lecture was placed before the drop position
      newLectures.splice(dropIndex, 0, draggedLecture);
    } else {
      // If the dragged lecture was placed after the drop position
      newLectures.splice(dropIndex, 0, draggedLecture);
    }

    setLectures(newLectures);
  };

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
        <button className="btn btn-primary" onClick={onOpenModal}>
          Add Lectures
        </button>
      </CardLayout>

      <div className="row">
        <div className="col-xl-8 col-lg-8">
          <div onDragOver={(e) => e.preventDefault()}>
            {lectures &&
              lectures.map((lecture, index) => (
                <CardLayout key={lecture._id}>
                  <div draggable onDragStart={(e) => handleDrag(e, index)} onDrop={(e) => handleDrop(e, index)}>
                    <h5>{index}</h5>
                    <h6>{lecture.lectureTitle}</h6>
                    <p>{lecture.lectureDes}</p>
                    <p>{lecture.courseId.title}</p>
                  </div>
                </CardLayout>
              ))}
          </div>

          {/* {lectures && lectures.map((lecture, index) => <LectureCard lecture={lecture} indexDrag={index} indexDrop={index} />)} */}
        </div>

        <div className="col-xl-4 col-lg-4">
          {enroledStudentsList && enroledStudentsList.map((student) => <EnroledStudentCard student={student} key={student._id} />)}
        </div>
      </div>

      {/* Modal box to create lectures */}

      <ModalBox open={open} onCloseModal={onCloseModal} title="Add lecture" onResetButton={resetLectureInput} onSaveButton={onSubmitCreateLectures}>
        <TextField label="Lecture title" value={lectureTitle} setValue={setLectureTitle} />
        <TextField label="Lecture description" value={lectureDes} setValue={setLectureDes} />
      </ModalBox>
    </InstructorPageLayout>
  );
};

export default InstructorCourseDetails;
