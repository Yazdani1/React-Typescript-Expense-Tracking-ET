import React, { useEffect, useState } from 'react';

import style from './InstructorDashboard.module.scss';
import InstructorPageLayout from '../../layouts/InstructorPageLayout';
import CardLayout from '../../components/CardLayout/CardLayout';
import { getCourseLists } from '../../services/API';
import { Course } from '../../services/DataProvider';
import CourseCard from './CourseCard';

const InstructorDashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const loadCourses = async () => {
    try {
      const res = await getCourseLists();

      if (res) {
        setCourses(res);
      }
    } catch (error: any) {}
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
        <div className="row">
          {courses &&
            courses.map((course) => (
              <div className="col-xl-4 col-lg-4">
                <CourseCard course={course} />
              </div>
            ))}
        </div>
      </CardLayout>
    </InstructorPageLayout>
  );
};

export default InstructorDashboard;
