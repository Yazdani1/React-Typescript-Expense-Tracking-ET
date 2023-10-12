import { useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { logOut } from '../../redux/userSlice';
import { CgProfile } from 'react-icons/cg';
import style from './EmployerSidebar.module.scss';

const EmployerSidebar = () => {
  // to use redux toolkit
  const userProfileDetails = useSelector((state: any) => state.user.currentUser);
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
                <img src={userProfileDetails?.imageUrl} alt="Profile" />
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
              to={'/employer-dashboard'}
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
              Employer Dashboard
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

export default EmployerSidebar;
