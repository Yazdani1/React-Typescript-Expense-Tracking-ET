import React, { useContext, ReactNode, FC, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { getInstructorRole } from '../services/API';

interface InstructorSecureLayoutProps {
  children: ReactNode;
}

const InstructorSecureLayout: FC<InstructorSecureLayoutProps> = ({ children }) => {
  let location = useLocation();
  let navigate = useNavigate();

  // to use redux toolkit
  const userProfileDetails = useSelector((state: any) => state.user.currentUser);

    const loadInstructorRole = async () => {
      try {
        const res = await getInstructorRole();
      } catch (error: any) {
        navigate('/');
        toast.error(error.response && error.response.data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    useEffect(() => {
      loadInstructorRole();
    }, []);


  return userProfileDetails ? (
    <> {children}</>
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default InstructorSecureLayout;
