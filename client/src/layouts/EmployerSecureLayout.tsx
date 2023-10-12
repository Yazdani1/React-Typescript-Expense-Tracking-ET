import { ReactNode, FC, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { getEmployerRole } from '../services/API';

interface EmployerSecureLayoutProps {
  children: ReactNode;
}

const EmployerSecureLayout: FC<EmployerSecureLayoutProps> = ({ children }) => {
  let location = useLocation();
  let navigate = useNavigate();

  // to use redux toolkit
  const userProfileDetails = useSelector((state: any) => state.user.currentUser);

  const loadEmployerRole = async () => {
    try {
      const res = await getEmployerRole();
    } catch (error: any) {
      navigate('/signin');
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadEmployerRole();
  }, []);

  return userProfileDetails ? <> {children}</> : <Navigate to="/" replace state={{ from: location }} />;
};

export default EmployerSecureLayout;
