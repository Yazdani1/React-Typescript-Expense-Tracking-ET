import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import style from './Course.module.scss';
import SubscriberPageLayout from '../../layouts/SubscriberPageLayout';
import { getCourseListsForSubscriber } from '../../services/API';
import { Course } from '../../services/DataProvider';
import CardLayout from '../../components/CardLayout/CardLayout';
import CourseCard from './CourseCard';

const Courses = () => {
  
  /****************************************/
  /*********** Course Lists ***************/
  /****************************************/

  const [courseLists, setCourseLists] = useState<Course[]>([]);

  const loadAllCourses = async () => {
    try {
      const res = await getCourseListsForSubscriber();

      if (res) {
        setCourseLists(res);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    loadAllCourses();
  }, []);

  return (
    <SubscriberPageLayout>
      <CardLayout>
        <div className="row">
          {courseLists &&
            courseLists.map((course) => (
              <div className="col-xl-4 col-lg-4">
                <CourseCard course={course} />
              </div>
            ))}
        </div>
      </CardLayout>
    </SubscriberPageLayout>
  );
};

export default Courses;
