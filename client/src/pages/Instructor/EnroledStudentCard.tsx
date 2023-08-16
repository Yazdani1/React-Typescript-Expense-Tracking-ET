import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { CourseEnrolmentItems } from '../../services/DataProvider';
import style from './InstructorDashboard.module.scss';
import CardLayout from '../../components/CardLayout/CardLayout';

interface EnroledStudentCardProps {
  student: CourseEnrolmentItems;
}

const EnroledStudentCard: FC<EnroledStudentCardProps> = ({ student }) => {
  return (
    <CardLayout>
      <h6>{student.enrolledBy?.name}</h6>
      <p>{student.enrolledBy?.email}</p>
      <p>{student.coupon}</p>
    </CardLayout>
  );
};

export default EnroledStudentCard;
