import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Course } from '../../services/DataProvider';
import style from './Course.module.scss';

interface CourseCardProps {
	course: Course;
}

const CourseCard: FC<CourseCardProps> = ({ course }) => {
	return (
		<Link
			to={'/course-details-page/' + course.slug}
			style={{ textDecoration: 'none', color: 'inherit' }}
		>
			<div className={style.courseContainer}>
				<h6>{course.title}</h6>
				<p>{course.postedBy?.name}</p>

				<hr />
				<p>{course.des.substring(0, 50)}</p>

				<div className={style.itemRow}>
					<p>Enrolled:{course.enrolledStudents}</p>
					<p>Seats:{course.maxStudents}</p>
					{course.enrolledStudents === course.maxStudents && (
						<p
							style={{
								background: 'red',
								padding: '5px',
								color: 'white',
								borderRadius: '20px',
							}}
						>
							No seats!
						</p>
					)}
				</div>
			</div>
		</Link>
	);
};

export default CourseCard;
