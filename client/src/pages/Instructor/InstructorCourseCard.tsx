import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Course } from '../../services/DataProvider';
import style from './InstructorDashboard.module.scss';

interface InstructorCourseCardProps {
  course: Course;
}

const InstructorCourseCard: FC<InstructorCourseCardProps> = ({ course }) => {
  return (
    <Link to={'/instructor-dashboard/course-details/' + course.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className={style.courseContainer}>
        <h6>{course.title}</h6>
        <p>{course.des}</p>
        <div className={style.itemRow}>
          <p>Enrolled:{course.enrolledStudents}</p>
          <p>Seats:{course.maxStudents}</p>
        </div>
      </div>
    </Link>
  );
};

export default InstructorCourseCard;
