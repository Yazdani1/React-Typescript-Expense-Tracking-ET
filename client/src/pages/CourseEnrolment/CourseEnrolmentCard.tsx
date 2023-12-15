import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { CourseEnrolmentItems } from '../../services/DataProvider';
import style from './CourseEnrolment.module.scss';

interface CourseEnrolmentCardProps {
	course: CourseEnrolmentItems;
}

const CourseEnrolmentCard: FC<CourseEnrolmentCardProps> = ({ course }) => {
	return (
		<Link
			to={'' + course.slug}
			style={{ textDecoration: 'none', color: 'inherit' }}
		>
			<div className={style.courseContainer}>
				<h6>{course.courseId?.title}</h6>
				<p style={{ color: 'green', fontWeight: 'bold' }}>
					{course.courseInstructorId?.name}
				</p>
				<hr />
				<p>{course.courseId?.des.substring(0, 50)}</p>

				<div className={style.itemRow}>
					<p>Enrolled:{course.courseId?.enrolledStudents}</p>
					<p>Seats:{course.courseId?.maxStudents}</p>
					<p>{course.enrolledBy?.name}</p>
				</div>
			</div>
		</Link>
	);
};

export default CourseEnrolmentCard;
