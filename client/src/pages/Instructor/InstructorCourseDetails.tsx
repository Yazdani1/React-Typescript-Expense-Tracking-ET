import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import InstructorPageLayout from '../../layouts/InstructorPageLayout';
import { getSingleCourseLectures, CreateLectureProps, createLecture } from '../../services/API';
import { Course, Lecture } from '../../services/DataProvider';
import CardLayout from '../../components/CardLayout/CardLayout';
import LectureCard from './LectureCard';
import ModalBox from '../../components/Modal/ModalBox';
import TextField from '../../components/Input/TextField';

const InstructorCourseDetails = () => {
  const { slug } = useParams();

  /****************************************/
  /* Course details and lectures   ********/
  /****************************************/

  const [courseDetails, setCourseDetails] = useState<Course>();
  const [lectures, setLectures] = useState<Lecture[]>([]);

  const loadCourseDetailsLectures = async () => {
    try {
      const res = await getSingleCourseLectures(slug!);

      if (res) {
        setCourseDetails(res.singleCourse);
        setLectures(res.lectureLists);
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

      {lectures && lectures.map((lecture) => <LectureCard lecture={lecture} />)}

      {/* Modal box to create lectures */}

      <ModalBox open={open} onCloseModal={onCloseModal} title="Add lecture" onResetButton={resetLectureInput} onSaveButton={onSubmitCreateLectures}>
        <TextField label="Lecture title" value={lectureTitle} setValue={setLectureTitle} />
        <TextField label="Lecture description" value={lectureDes} setValue={setLectureDes} />
      </ModalBox>
    </InstructorPageLayout>
  );
};

export default InstructorCourseDetails;
