import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import InstructorPageLayout from '../../layouts/InstructorPageLayout';
import { getSingleCourseLectures } from '../../services/API';
import { Course, Lecture } from '../../services/DataProvider';
import CardLayout from '../../components/CardLayout/CardLayout';
import LectureCard from './LectureCard';

const CourseDetails = () => {
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

   

      {lectures && lectures.map((lecture) => <LectureCard lecture={lecture} />)}
    </InstructorPageLayout>
  );
};

export default CourseDetails;
