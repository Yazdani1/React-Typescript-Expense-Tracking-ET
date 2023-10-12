import React from 'react';

const IdleAutoLogout = () => {
  return <div>IdleAutoLogout</div>;
};

export default IdleAutoLogout;

// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logOut } from '../../redux/userSlice';
// import { UserProtectedRouteContext } from '../../contextapi/UserProtectedRouteContext';
// import { useIdleTimer } from 'react-idle-timer';

// const AutoLogout: React.FC = () => {
//   let navigate = useNavigate();
//   // to use redux toolkit
//   const userProfileDetails = useSelector((state: any) => state.user.currentUser);
//   const dispatch = useDispatch();

//   const [state, setState] = useState<string>('Active');
//   const [count, setCount] = useState<number>(0);
//   const [remaining, setRemaining] = useState<number>(0);
//   const [idleMessageShown, setIdleMessageShown] = useState(false);

//   const onIdle = () => {
//     dispatch(logOut());
//     window.localStorage.removeItem('tokenLogin');
//     window.localStorage.removeItem('token');
//     window.localStorage.removeItem('userInforProtectedRoute');
//     window.localStorage.removeItem('userData');

//     navigate('/signin');

//     console.log('User is idle.not active user');
//     setState('Idle');
//     setIdleMessageShown(false); // Reset the flag when user becomes idle
//   };

//   const onActive = () => {
//     setState('Active');
//   };

//   const onAction = () => {
//     setCount(count + 1);
//   };

//   const { getRemainingTime } = useIdleTimer({
//     onIdle,
//     onActive,
//     onAction,
//     timeout: 10_000, // Set the timeout to 10 seconds (adjust as needed)
//     throttle: 500,
//   });

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setRemaining(Math.ceil(getRemainingTime() / 1000));
//       if (!idleMessageShown && remaining <= 5) {
//         console.log('User is idle'); // Log the message when user is inactive for 5 seconds
//         setIdleMessageShown(true);
//       }
//     }, 500);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [remaining, idleMessageShown]);

//   return (
//     <>
//       {/* <h1>React Idle Timer</h1>
//       <h2>useIdleTimer</h2>
//       <br />
//       <p>Current State: {state}</p>
//       <p>Action Events: {count}</p>
//       <p>{remaining} seconds remaining</p> */}
//     </>
//   );
// };

// export default AutoLogout;

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { logOut } from '../../redux/userSlice';
// import { useIdleTimer } from 'react-idle-timer';

// const AutoLogout: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const onIdle = () => {
//     dispatch(logOut());
//     window.localStorage.removeItem('tokenLogin');
//     window.localStorage.removeItem('token');
//     window.localStorage.removeItem('userInforProtectedRoute');
//     window.localStorage.removeItem('userData');
//     navigate('/signin');
//   };

//   const { getRemainingTime } = useIdleTimer({
//     onIdle,
//     timeout: 10_000, // Set the timeout to 10 seconds (adjust as needed)
//     throttle: 500,
//   });

//   useEffect(() => {

//     const interval = setInterval(() => {
//       const remaining = Math.ceil(getRemainingTime() / 1000);
//       if (remaining <= 5) {
//         console.log('User is idle. Not active for 5 seconds.');
//       }
//     }, 500);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [getRemainingTime]);

//   return null; // No need to render anything
// };

// export default AutoLogout;




// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { logOut } from '../../redux/userSlice';
// import { useIdleTimer } from 'react-idle-timer';
// import { ToastContainer, toast } from 'react-toastify';

// const AutoLogout: React.FC = () => {
//   // Token from localstorage
//   const tokenData = localStorage.getItem('token');

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // This function is only for the testing purpose
//   const handleGetTestData = () => {
//     toast.error('You are not active', {
//       position: toast.POSITION.TOP_CENTER,
//     });
//   };

//   //////////////////////////////////////////////

//   const onIdle = () => {
//     if (tokenData) {
//       handleGetTestData();
//       dispatch(logOut());
//       window.localStorage.removeItem('tokenLogin');
//       window.localStorage.removeItem('token');
//       window.localStorage.removeItem('userInforProtectedRoute');
//       window.localStorage.removeItem('userData');
//       navigate('/signin');
//     }
//   };

//   //900_000 ==  15 minutes

//   useIdleTimer({
//     onIdle,
//     timeout: 10_000, // Set the timeout to 10 seconds (adjust as needed)
//     throttle: 500,
//   });

//   return null;
// };

// export default AutoLogout;
