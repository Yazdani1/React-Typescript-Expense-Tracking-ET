import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { logOut } from '../../redux/userSlice';
import { CgProfile } from 'react-icons/cg';
import style from './SubscriberSidebar.module.scss';

const InstructorSidebar = () => {
	// to use redux toolkit
	const userProfileDetails = useSelector(
		(state: any) => state.user.currentUser
	);
	const dispatch = useDispatch();
	let navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logOut());
		window.localStorage.removeItem('tokenLogin');
		window.localStorage.removeItem('token');
		window.localStorage.removeItem('userInforProtectedRoute');
		navigate('/signin');
	};

	return (
		<div className={style.subscriberSidebar}>
			<div className={style.sideBarList}>
				<ul>
					<div className={style.profileContainer}>
						{userProfileDetails?.imageUrl ? (
							<div className={style.profilePicture}>
								<img src={userProfileDetails?.imageUrl} alt='Profile' />
							</div>
						) : (
							<div className={style.profilePictureAvatar}>
								<CgProfile size={80} />
							</div>
						)}
					</div>
					<li className={style.username}>{userProfileDetails?.name}</li>
					<li className={style.username}>{userProfileDetails?.role}</li>
					<hr />
					<li>
						<NavLink
							to={'/'}
							style={({ isActive }) =>
								isActive
									? {
											color: 'white',
											textDecoration: 'none',
											borderBottom: '3px solid yellow',
									  }
									: { color: 'white', textDecoration: 'none' }
							}
						>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							to={'/instructor-dashboard'}
							style={({ isActive }) =>
								isActive
									? {
											color: 'white',
											textDecoration: 'none',
											borderBottom: '3px solid yellow',
									  }
									: { color: 'white', textDecoration: 'none' }
							}
						>
							Dashboard
						</NavLink>
					</li>
					<li>
						<NavLink
							to={'/photo-library'}
							style={({ isActive }) =>
								isActive
									? {
											color: 'white',
											textDecoration: 'none',
											borderBottom: '3px solid yellow',
											marginTop: '5px',
									  }
									: { color: 'white', textDecoration: 'none' }
							}
						>
							Photo Library
						</NavLink>
					</li>
					<li>
						<NavLink
							to={'/profile'}
							style={({ isActive }) =>
								isActive
									? {
											color: 'white',
											textDecoration: 'none',
											borderBottom: '3px solid yellow',
									  }
									: { color: 'white', textDecoration: 'none' }
							}
						>
							Profile
						</NavLink>
					</li>
				</ul>
				<span className={style.logoutButton} onClick={handleLogout}>
					Log Out
				</span>
			</div>
		</div>
	);
};

export default InstructorSidebar;
