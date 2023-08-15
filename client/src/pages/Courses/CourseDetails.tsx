import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import SubscriberPageLayout from '../../layouts/SubscriberPageLayout';
import { getSingleCourseDetailsForSubscriber, createCourseEnrolment, CreateCourseEnrolmentProps } from '../../services/API';
import { Course } from '../../services/DataProvider';
import CardLayout from '../../components/CardLayout/CardLayout';
import TextField from '../../components/Input/TextField';
import { useEnroledCoursesContext } from '../../contextapi/EnroledCoursesContext';

const CourseDetails = () => {
  const { slug } = useParams();

  /****************************************/
  /*********** Course Details *************/
  /****************************************/

  const [courseDetails, setCourseDetails] = useState<Course>();

  const loadCourseDetailsForSubscriber = async () => {
    try {
      const res = await getSingleCourseDetailsForSubscriber(slug!);

      if (res) {
        setCourseDetails(res);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  // Conttext API for Enroled Courses
  const { allEnroledCourses } = useEnroledCoursesContext();
  const isCourseEnrolled = allEnroledCourses && allEnroledCourses.some((enrollment) => enrollment.courseId?._id === courseDetails?._id);

  /****************************************/
  /*********** Enroll Course **************/
  /****************************************/

  const [courseCoupon, setCourseCoupon] = useState<string>('');

  const onSubmitCreateCourseEnrolment = async () => {
    try {
      const payload: CreateCourseEnrolmentProps = {
        courseId: courseDetails?._id!,
        courseInstructorId: courseDetails?.postedBy?._id!,
        coupon: courseCoupon,
      };

      const res = await createCourseEnrolment(payload);

      if (res) {
        toast.success('You have enroled to this course!', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const [error, setError] = useState<string>('');
  const handleEnrollClick = () => {
    if (courseDetails?.coupon === courseCoupon) {
      setError('');
      // Add logic here to enroll the user in the course
      // You can display a success message or take other actions
    } else {
      setError('Invalid coupon. Please enter a valid coupon.');
    }
  };

  useEffect(() => {
    loadCourseDetailsForSubscriber();
  }, []);

  //To check if user added correct coupon else show the error message
  useEffect(() => {
    if (courseCoupon && courseCoupon !== courseDetails?.coupon) {
      setError('Invalid coupon. Please enter a valid coupon.');
    } else {
      setError('');
    }
  }, [courseCoupon, courseDetails]);

  return (
    <SubscriberPageLayout>
      <div className="row">
        <div className="col-xl-8 col-lg-8">
          <CardLayout>
            <h6>{courseDetails?.title}</h6>
            <p>{courseDetails?.des}</p>
            <p>{courseDetails?.coupon}</p>
            <p>Max students: {courseDetails?.maxStudents}</p>
            <p>Enrolled students: {courseDetails?.enrolledStudents}</p>
            <p>{courseDetails?.postedBy?.name}</p>
          </CardLayout>
        </div>

        <div className="col-xl-4 col-lg-4">
          <CardLayout>
            <p>{error}</p>
            <TextField label="Coupon" value={courseCoupon} setValue={setCourseCoupon} />

            {isCourseEnrolled ? (
              <button className="btn btn-success">You already enroled</button>
            ) : (
              <button className="btn btn-primary" onClick={onSubmitCreateCourseEnrolment}>
                Enroll
              </button>
            )}
          </CardLayout>
        </div>
      </div>
    </SubscriberPageLayout>
  );
};

export default CourseDetails;
