import { useState, useEffect, FC } from 'react';
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from 'react-icons/bs';
import { ImProfile } from 'react-icons/im';
import { AiFillDashboard } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

import style from './CompanyNavSidebar.module.css';

interface CompanySidebarProps {
	show: boolean;
	setShow: (show: boolean) => void;
}

const SIDEBAR_STORAGE_KEY = 'sidebar_view_mode';

const getSidebarViewMode = () => {
	const storedMode = localStorage.getItem(SIDEBAR_STORAGE_KEY);
	return storedMode === 'small';
};
const saveSidebarViewMode = (isSmall: boolean) => {
	localStorage.setItem(SIDEBAR_STORAGE_KEY, isSmall ? 'small' : 'large');
};
const CompanySidebar: FC<CompanySidebarProps> = ({ show, setShow }) => {
	const [isSmall, setIsSmall] = useState(getSidebarViewMode());
	const handleShowLargeSidebar = () => {
		setIsSmall(false);
		setShow(true);
	};
	const handleShowSmallSidebar = () => {
		setIsSmall(true);
		setShow(false);
	};
	useEffect(() => {
		saveSidebarViewMode(isSmall);
	}, [isSmall]);

	return (
		<div>
			{isSmall ? (
				<div className={style.sidebar_small_container}>
					<h6>
						<NavLink
							to={'/company-dashboard'}
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
							<AiFillDashboard size={40} />
						</NavLink>
					</h6>
					<h6>
						<NavLink
							to={'/company-profile'}
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
							<ImProfile size={40} />
						</NavLink>
					</h6>
					<h6>
						<NavLink
							to={'/company-profile'}
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
							<ImProfile size={40} />
						</NavLink>
					</h6>
					<p
						onClick={handleShowLargeSidebar}
						className={style.icon_small_sidebar}
					>
						<BsArrowRightCircleFill size={40} />
					</p>
				</div>
			) : (
				<div className={style.sidebar_large_container}>
					<h6>
						<NavLink
							to={'/company-dashboard'}
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
							Company dashboard
						</NavLink>
					</h6>
					<h6>
						<NavLink
							to={'/company-profile'}
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
					</h6>
					<h6>
						<NavLink
							to={'/setting'}
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
							Setting
						</NavLink>
					</h6>
					<p
						onClick={handleShowSmallSidebar}
						className={style.icon_large_sidebar}
					>
						<BsArrowLeftCircleFill size={40} />
					</p>
				</div>
			)}
		</div>
	);
};

export default CompanySidebar;
