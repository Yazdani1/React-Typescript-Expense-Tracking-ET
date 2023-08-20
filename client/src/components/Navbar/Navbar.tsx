import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { logOut } from '../../redux/userSlice';
import navbarStyle from './Navbar.module.scss';
import { UserProfileDetails } from '../../services/DataProvider';

//Context API
import { UserContext } from '../../contextapi/UserContext';
import { UserProfileDetailsContext } from '../../contextapi/UserProfileDetailsContext';

import { useUserContext } from '../../contextapi/UserContextCookies';
import { UserProtectedRouteContext } from '../../contextapi/UserProtectedRouteContext';

const Navbar = () => {
  // to use redux toolkit
  const userProfileDetails = useSelector((state: any) => state.user.currentUser);
  const dispatch = useDispatch();

  let navigate = useNavigate();

  /////////////////////////////////////////////////////////////////////
  // All these are old context api that i used.
  // const [state, setState] = useContext(UserContext);
  // const { userProfileDetails, updateUserProfileDetails } = useContext(
  //   UserProfileDetailsContext
  // );
  // Context API to show user protected route. But this context api is used to show protected route
  // Context api with cookies
  //  const { user, logout } = useUserContext();
  /////////////////////////////////////////////////////////////////////

  const [userInfo, setUserInfo]: any = useContext(UserProtectedRouteContext);

  // const logOut = () => {
  //   window.localStorage.removeItem("tokenLogin");
  //   window.localStorage.removeItem("token");
  //   navigate("/");
  //   // setState("");
  // };

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/');
    window.localStorage.removeItem('tokenLogin');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('userInforProtectedRoute');
    setUserInfo('');
    navigate('/');
    // setState("");
    // Additional logout-related logic, such as redirecting to the login page
  };

  return (
    <nav className={navbarStyle.navbarContainer}>
      <ul>
        <li>Redux:{userProfileDetails?.name}||</li>
        <li>{userProfileDetails?.points} Points</li>
        <li>{userProfileDetails?.role}</li>
        <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
          <li>Home</li>
        </Link>
        <li className="nav-item">
          <Link to={'/dashboard'} style={{ textDecoration: 'none', color: 'white' }}></Link>
        </li>
        <li className="nav-item">
          <Link to={'/dashboard'} style={{ textDecoration: 'none', color: 'white' }}>
            Expense Book
          </Link>
        </li>
        <li className="nav-item">
          <Link to={'/courses'} style={{ textDecoration: 'none', color: 'white' }}>
            Courses
          </Link>
        </li>
        <li className="nav-item">
          <Link to={'/income-record'} style={{ textDecoration: 'none', color: 'white' }}>
            Income Record
          </Link>
        </li>
        <li className="nav-item">
          <Link to={'/home-rental-offline-data'} style={{ textDecoration: 'none', color: 'white' }}>
            Home Rental Offline Data
          </Link>
        </li>
        <li className="nav-item">
          <Link to={'/profile'} style={{ textDecoration: 'none', color: 'white' }}>
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link to={'/enroled-courses'} style={{ textDecoration: 'none', color: 'white' }}>
            Enroled Courses
          </Link>
        </li>

        <li className="nav-item">
          <Link to={'/home-rental'} style={{ textDecoration: 'none', color: 'white' }}>
            Home Rental
          </Link>
        </li>
        <li className="nav-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
          Log Out
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
