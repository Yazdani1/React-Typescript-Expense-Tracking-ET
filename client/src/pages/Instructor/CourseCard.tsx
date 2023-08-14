import React, { FC } from 'react';

import { Course } from '../../services/DataProvider';
import style from './InstructorDashboard.module.scss';

interface CourseCardProps {
  course: Course;
}

const CourseCard: FC<CourseCardProps> = ({ course }) => {
  return (
    <div className={style.courseContainer}>
      <h6>{course.title}</h6>
      <p>{course.des}</p>
      <div className={style.itemRow}>
        <p>Enrolled:{course.enrolledStudents}</p>
        <p>Seats:{course.maxStudents}</p>
      </div>
    </div>
  );
};

export default CourseCard;
