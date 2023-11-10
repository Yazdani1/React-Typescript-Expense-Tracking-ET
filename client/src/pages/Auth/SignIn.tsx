import { useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import signInPageStyle from './SignIn.module.scss';
import { userLogin, UserLoginProps } from '../../services/API';
import { UserContext } from '../../contextapi/UserContext';
import { useUserContext } from '../../contextapi/UserContextCookies';
import { UserProtectedRouteContext } from '../../contextapi/UserProtectedRouteContext';
import HomePageLayout from '../../layouts/HomePageLayout';
import { loginStart, loginSuccess, loginFailure } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { UserProfileDetails } from '../../services/DataProvider';
import { getLogedInUserProfile } from '../../services/API';
import { useEnroledCoursesContext } from '../../contextapi/EnroledCoursesContext';

const SignIn = () => {
	const location = useLocation();
	let navigate = useNavigate();

	// to use redux toolkit
	const userProfileDetails = useSelector(
		(state: any) => state.user.currentUser
	);

	// to use redux toolkit
	const dispatch = useDispatch();
	
	// Old Used Context API
	// const [state, setState]:any = useContext(UserContext);
	// This is the context api that has cookies and store user detials when user login

	const { setUser } = useUserContext();

	// Context API to show user protected route.
	const [userInfo, setUserInfo]: any = useContext(UserProtectedRouteContext);

	/****************************************/
	/*********  User Login      *************/
	/****************************************/

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	// to show blocked user error message
	const [error, setError] = useState<string>('');

	const [autoLogoutStatusCode, setAutoLogoutStatusCode] = useState<string>('');
	const onSubmitUserSignIn = async (e: any) => {
		dispatch(loginStart());
		e.preventDefault();
		try {
			const payload: UserLoginProps = {
				email: email,
				password: password,
			};
			const res = await userLogin(payload);
			if (res.data) {
				// To clean the state as soon as user loged in
				setEmail('');
				setPassword('');
				if (res.data.user?.blockUser) {
					setError('Your account is blocked. Please contact with the support1');
				} else {
					// To send user to the las visited route when they were auto loged out
					/////////////////////////////////////////////////////////
					// Check if there's a last visited route in local storage
					///////////////////////////////////////////////////////////
					// This token is for protected route that is required to pass in the header
					window.localStorage.setItem('token', res.data.token);
					dispatch(loginSuccess(res.data?.user));
					// setUser(res.data.user);
					toast.success('You have Loged In Successfully!', {
						position: toast.POSITION.TOP_CENTER,
					});

					const lastVisitedRoute = localStorage.getItem('lastVisitedRoute');
					if (lastVisitedRoute) {
						navigate(lastVisitedRoute);
						// Clear the last visited route from local storage
						localStorage.removeItem('lastVisitedRoute');
						// Navigate to the last visited route
					} else {
						if (res.data.user?.role === 'Admin') {
							navigate('/admin');
						} else if (res.data.user?.role === 'Instructor') {
							navigate('/instructor-dashboard');
						} else if (res.data.user?.role === 'Employer') {
							navigate('/employer-dashboard');
						} else {
							navigate('/dashboard');
						}
					}
				}

				/////////////////////////////////////////////////////////////
				// save user info in local storage
				// localStorage.setItem("tokenLogin", JSON.stringify(res.data));
				// update user information to context api
				// setState({
				//   user: res.data.user,
				//   token: res.data.token,
				// });
				///////////////////////////////////////////////////////////////
				//////////////////////////////////////////////////////////////
				// To test user protected route user context api
				// localStorage.setItem(
				//   "userInforProtectedRoute",
				//   JSON.stringify(res.data.user?.date)
				// );
				// setUserInfo(res.data.user?.date);
				///////////////////////////////////// end
				///////////////////////////////////////////////////////////////
				//To set User cookie context api.
				// As soon as user login - we need to store user info in this context api can
				//used any component to show user data. it also encrypt
				//setUser(res.data.user);
				///////////////////////////////////////////////////////////////

				// To store data in redux toolkit
			}
		} catch (error: any) {
			toast.error(error.response && error.response.data.error, {
				position: toast.POSITION.TOP_RIGHT,
			});
			dispatch(loginFailure());
		}
	};

	// To show status code if user auto loged out then we show a message in the signin page
	useEffect(() => {
		const lastVisitedRouteAvailable = localStorage.getItem('lastVisitedRoute');

		if (lastVisitedRouteAvailable) {
			setAutoLogoutStatusCode('Auto logout for inactivity, status code 404');
		}
	}, []);

	return (
		<HomePageLayout>
			<div className='container'>
				<div className={signInPageStyle.signInContainer}>
					<div className={signInPageStyle.signInFormDesign}>
						<h5>Sign In</h5>

						{autoLogoutStatusCode && <h4>{autoLogoutStatusCode}</h4>}

						{error && <h6 style={{ color: 'red' }}>{error}</h6>}
						<div className={signInPageStyle.inputFormArea}>
							<div className='form-group'>
								<input
									type='text'
									name='Name'
									className={signInPageStyle.formControlEmail}
									placeholder='Your E-mail *'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							<div className='form-group'>
								<input
									type='password'
									name='email'
									className={signInPageStyle.formControlPassword}
									placeholder='Your Password*'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<button
								className={signInPageStyle.signInButton}
								onClick={(e) => onSubmitUserSignIn(e)}
							>
								Sign In
							</button>
							<Link
								to={'/forgot-password'}
								style={{ textDecoration: 'none', color: 'inherit' }}
							>
								<span className={signInPageStyle.signUpHereOption}>
									<p>Forgot Password?</p>
								</span>
							</Link>
							<Link
								to={'/signup'}
								style={{ textDecoration: 'none', color: 'inherit' }}
							>
								<span className={signInPageStyle.signUpHereOption}>
									<p>Don't have an account? Sign Up here</p>
								</span>
							</Link>
						</div>
					</div>
				</div>
				<ToastContainer autoClose={8000} />
			</div>
		</HomePageLayout>
	);
};

export default SignIn;
