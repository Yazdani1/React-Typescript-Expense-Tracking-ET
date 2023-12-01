import React, { FC } from 'react';

import { Lecture } from '../../services/DataProvider';
import style from './InstructorDashboard.module.scss';
import CardLayout from '../../components/CardLayout/CardLayout';

interface LectureCardProps {
	lecture: Lecture;
	indexDrag: number;
	indexDrop: number;
}

const LectureCard: FC<LectureCardProps> = ({
	lecture,
	indexDrag,
	indexDrop,
}) => {
	const handleDrag = (e: any, indexDrag: number) => {
		console.log('Drag ' + e, indexDrag);
	};
	const handleDrop = (e: any, indexDrop: number) => {
		console.log('Drop' + e, indexDrop);
	};

	return (
		<div onDragOver={(e) => e.preventDefault}>
			<CardLayout>
				<div
					draggable
					onDragStart={(e) => handleDrag(e, indexDrag)}
					onDragEnd={(e) => handleDrop(e, indexDrop)}
				>
					<h6>{lecture.lectureTitle}</h6>

					<p>{lecture.lectureDes}</p>

					<p>{lecture.postedBy?.name}</p>
					<p>{lecture.postedBy?.name}</p>
					<p>{lecture.courseId?.title}</p>

					<p>{indexDrag}</p>
					<p>fff{lecture._id}</p>
				</div>
			</CardLayout>
		</div>
	);
};

export default LectureCard;
