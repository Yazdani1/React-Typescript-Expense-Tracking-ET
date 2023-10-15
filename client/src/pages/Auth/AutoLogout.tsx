import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/userSlice';
import { useIdleTimer } from 'react-idle-timer';
import { ToastContainer, toast } from 'react-toastify';

const AutoLogout: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const tokenData = localStorage.getItem('token');
	const lastVisitedRoute = localStorage.getItem('lastVisitedRoute');

	const handleGetTestData = () => {
		toast.error('You are not active', {
			position: toast.POSITION.TOP_CENTER,
		});
	};

	const onIdle = () => {
		if (tokenData) {
			handleGetTestData();
			dispatch(logOut());
			window.localStorage.removeItem('tokenLogin');
			window.localStorage.removeItem('token');
			window.localStorage.removeItem('userInforProtectedRoute');
			window.localStorage.removeItem('userData');

			// Store the current route as the last visited route when user auto logout

			localStorage.setItem('lastVisitedRoute', location.pathname);

			navigate('/signin');
		}
	};

	useIdleTimer({
		onIdle,
		timeout: 10_000, // Set the timeout to 10 seconds
		throttle: 500,
	});

	return null;
};

export default AutoLogout;
