import React, { FC } from 'react';

import { CourseEnrolmentItems } from '../../services/DataProvider';
// import style from './InstructorDashboard.module.scss';
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
			<p>{student.date}</p>
		</CardLayout>
	);
};

export default EnroledStudentCard;
