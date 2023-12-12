import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './NavbarHome.module.scss';

const NavbarHome = () => {
	const userProfileDetails = useSelector(
		(state: any) => state.user.currentUser
	);
	return (
		<nav className={styles.navContainer}>
			<div className={styles.navbar}>
				<div className={styles.logo}>Logo</div>

				<div className={styles.navItems}>

					<li>
						{userProfileDetails?.name} - {userProfileDetails?.role}
					</li>
					
					<Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
						<li>Home</li>
					</Link>

					<Link
						to={'/search-nationalid-details'}
						style={{ textDecoration: 'none', color: 'white' }}
					>
						<li>National ID </li>
					</Link>

					<Link
						to={'/job-posts'}
						style={{ textDecoration: 'none', color: 'white' }}
					>
						<li>Job Posts </li>
					</Link>
					<Link
						to={'/company-dashboard'}
						style={{ textDecoration: 'none', color: 'white' }}
					>
						<li>Company Dashboard</li>
					</Link>

					{!userProfileDetails && (
						<Link
							to={'/signin'}
							style={{ textDecoration: 'none', color: 'white' }}
						>
							<li> Login </li>
						</Link>
					)}

					{userProfileDetails?.role === 'Subscriber' && (
						<li className='nav-item'>
							<Link
								to={'/dashboard'}
								style={{ textDecoration: 'none', color: 'white' }}
							>
								Subscriber Dashboard
							</Link>
						</li>
					)}
					{userProfileDetails?.role === 'Instructor' && (
						<li className='nav-item'>
							<Link
								to={'/instructor-dashboard'}
								style={{ textDecoration: 'none', color: 'white' }}
							>
								Instructor Dashboard
							</Link>
						</li>
					)}
					{userProfileDetails?.role === 'Admin' && (
						<li className='nav-item'>
							<Link
								to={'/admin'}
								style={{ textDecoration: 'none', color: 'white' }}
							>
								Admin Dashboard
							</Link>
						</li>
					)}
					{userProfileDetails?.role === 'Employer' && (
						<li className='nav-item'>
							<Link
								to={'/employer-dashboard'}
								style={{ textDecoration: 'none', color: 'white' }}
							>
								Employer Dashboard
							</Link>
						</li>
					)}
				</div>
			</div>
		</nav>
	);
};

export default NavbarHome;
