import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import style from './CourseEnrolment.module.scss';
import SubscriberPageLayout from '../../layouts/SubscriberPageLayout';
import { getEnroledCourseLists } from '../../services/API';
import { CourseEnrolmentItems } from '../../services/DataProvider';
import CourseEnrolmentCard from './CourseEnrolmentCard';
import CardLayout from '../../components/CardLayout/CardLayout';

const CourseEnrolment = () => {
  /****************************************/
  /*********  Course Enrolment  ***********/
  /****************************************/

  const [enroledCourseLists, setEnroledCourseLists] = useState<CourseEnrolmentItems[]>([]);

  const loadEnroledCourses = async () => {
    try {
      const res = await getEnroledCourseLists();
      if (res) {
        setEnroledCourseLists(res);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    loadEnroledCourses();
  }, []);

  return (
    <SubscriberPageLayout>
      <CardLayout>
        <h6>Enrolled Courses</h6>
        <div className="row">
          {enroledCourseLists &&
            enroledCourseLists.map((course) => (
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
