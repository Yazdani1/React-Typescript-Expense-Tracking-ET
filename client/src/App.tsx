import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './App.css';
import { UserProvider } from './contextapi/UserContext';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import ExpenseBook from './pages/ExpenseBook/ExpenseBook';

// Secure Layout
import SecureLayout from './layouts/SecureLayout';
import AdminSecureLayout from './layouts/AdminSecureLayout';
import InstructorSecureLayout from './layouts/InstructorSecureLayout';

//Pages
import Admin from './pages/Admin/Admin';
import Profile from './pages/SubscriberProfile/Profile';
import ExpenseBookDetails from './pages/ExpenseBookDetails/ExpenseBookDetails';
import UserListPagination from './pages/Admin/UserListPagination';
import HomeRentalPost from './pages/HomeRentalApp/HomeRentalPost';
import NationalId from './pages/NationalId/NationalId';
import Income from './pages/Income/Income';
import HomeRentalOfflineData from './pages/HomeRentalOfflineData/HomeRentalOfflineData';
import InstructorDashboard from './pages/Instructor/InstructorDashboard';
import InstructorCourseDetails from './pages/Instructor/InstructorCourseDetails';
import Courses from './pages/Courses/Courses';
import CourseDetails from './pages/Courses/CourseDetails';
import CourseEnrolment from './pages/CourseEnrolment/CourseEnrolment';
//Context API
import { UserProfileDetailsProvider } from './contextapi/UserProfileDetailsContext';
import { UserContextCookieProvider } from './contextapi/UserContextCookies';
import { HomeRentalProvider } from './contextapi/HomeRentalContext';
import { IncomeRecordProvider } from './contextapi/IncomeRecordContext';
import { UserProtectedRouteProvider } from './contextapi/UserProtectedRouteContext';

const App = () => {
  return (
    <IncomeRecordProvider>
      <UserProtectedRouteProvider>
        <HomeRentalProvider>
          <UserContextCookieProvider>
            <UserProfileDetailsProvider>
              <UserProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/search-nationalid-details" element={<NationalId />} />

                    {/* Protected route for subscriber*/}
                    <Route
                      path="/dashboard"
                      element={
                        <SecureLayout>
                          <ExpenseBook />
                        </SecureLayout>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <SecureLayout>
                          <Profile />
                        </SecureLayout>
                      }
                    />
                    <Route
                      path="/expense-details/:slug"
                      element={
                        <SecureLayout>
                          <ExpenseBookDetails />
                        </SecureLayout>
                      }
                    />
                    <Route
                      path="/courses"
                      element={
                        <SecureLayout>
                          <Courses />
                        </SecureLayout>
                      }
                    />
                    <Route
                      path="/course-details/:slug"
                      element={
                        <SecureLayout>
                          <CourseDetails />
                        </SecureLayout>
                      }
                    />

                    <Route
                      path="/enroled-courses"
                      element={
                        <SecureLayout>
                          <CourseEnrolment />
                        </SecureLayout>
                      }
                    />

                    {/* This route is for Home renatal app api and its only for testing purpose... */}
                    <Route
                      path="/home-rental"
                      element={
                        <SecureLayout>
                          <HomeRentalPost />
                        </SecureLayout>
                      }
                    />
                    <Route
                      path="/home-rental-offline-data"
                      element={
                        <SecureLayout>
                          <HomeRentalOfflineData />
                        </SecureLayout>
                      }
                    />
                    <Route
                      path="/income-record"
                      element={
                        <SecureLayout>
                          <Income />
                        </SecureLayout>
                      }
                    />
                    {/* End of Home rental platform */}
                    {/* Protected route for only admin*/}
                    <Route
                      path="/admin"
                      element={
                        <AdminSecureLayout>
                          <Admin />
                        </AdminSecureLayout>
                      }
                    />
                    <Route
                      path="/list"
                      element={
                        <AdminSecureLayout>
                          <UserListPagination />
                        </AdminSecureLayout>
                      }
                    />
                    {/* Protected route for only Instructor*/}
                    <Route
                      path="/instructor-dashboard"
                      element={
                        <InstructorSecureLayout>
                          <InstructorDashboard />
                        </InstructorSecureLayout>
                      }
                    />
                    <Route
                      path="/instructor-dashboard/course-details/:slug"
                      element={
                        <InstructorSecureLayout>
                          <InstructorCourseDetails />
                        </InstructorSecureLayout>
                      }
                    />
                  </Routes>
                  <ToastContainer autoClose={8000} />
                </BrowserRouter>
              </UserProvider>
            </UserProfileDetailsProvider>
          </UserContextCookieProvider>
        </HomeRentalProvider>
      </UserProtectedRouteProvider>
    </IncomeRecordProvider>
  );
};

export default App;
