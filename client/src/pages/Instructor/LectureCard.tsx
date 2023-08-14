import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Lecture } from '../../services/DataProvider';
import style from './InstructorDashboard.module.scss';
import CardLayout from '../../components/CardLayout/CardLayout';

interface LectureCardProps {
  lecture: Lecture;
}

const LectureCard: FC<LectureCardProps> = ({ lecture }) => {
  return (
    <CardLayout>
      <h6>{lecture.lectureTitle}</h6>
      <p>{lecture.lectureDes}</p>
    </CardLayout>
  );
};

export default LectureCard;
