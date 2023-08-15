import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import style from './CourseEnrolment.module.scss';
import SubscriberPageLayout from '../../layouts/SubscriberPageLayout';
import { getEnroledCourseLists } from '../../services/API';
import { CourseEnrolmentItems } from '../../services/DataProvider';
import CourseEnrolmentCard from './CourseEnrolmentCard';
import CardLayout from '../../components/CardLayout/CardLayout';
import { useEnroledCoursesContext } from '../../contextapi/EnroledCoursesContext';

const CourseEnrolment = () => {
  /****************************************/
  /*********  Course Enrolment  ***********/
  /****************************************/

  const { allEnroledCourses, loadEnroledCourses } = useEnroledCoursesContext();

  useEffect(() => {
    loadEnroledCourses();
  }, []);

  return (
    <SubscriberPageLayout>
      <CardLayout>
        <h6>Enrolled Courses</h6>
        <div className="row">
          {allEnroledCourses &&
            allEnroledCourses.map((course) => (
              <div className="col-xl-4 col-lg-4">
                <CourseEnrolmentCard course={course} />
              </div>
            ))}
        </div>
      </CardLayout>
    </SubscriberPageLayout>
  );
};

export default CourseEnrolment;
