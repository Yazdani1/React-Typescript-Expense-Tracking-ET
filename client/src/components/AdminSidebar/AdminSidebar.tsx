import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { useSelector } from 'react-redux';

import { logOut } from '../../redux/userSlice';
import { UserContext } from '../../contextapi/UserContext';
import style from './AdminSidebar.module.scss';

const AdminSidebar = () => {
  let navigate = useNavigate();
  const userProfileDetails = useSelector((state: any) => state.user.currentUser);

  const dispatch = useDispatch();

  // to use context api
  const [state, setState] = useContext(UserContext);

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
              to={'/admin'}
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
              Admin Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to={'/allemployer-job-posts'}
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
              Job Posts
            </NavLink>
          </li>

          <li>
            <NavLink
              to={'/user-list'}
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
              User Lists
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

export default AdminSidebar;
