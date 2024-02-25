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
import EmployerSecureLayout from './layouts/EmployerSecureLayout';

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
import ForgotPassword from './pages/Auth/ForgotPassword';
import Home from './pages/Home/Home';
import EmployerDashboard from './pages/Employer/EmployerDashboard';
import JobPostList from './pages/Admin/JobPosts/JobPostList';
import JobPostsPublic from './pages/Home/JobPostsPublic/JobPostsPublic';
import JobMatch from './pages/JobMatch/JobMatch';
import JobWishList from './pages/JobWishList/JobWishList';
import JobPostDetails from './pages/Home/JobPostsPublic/JobPostDetails';
import JobApplication from './pages/JobApplication/JobApplication';
import EmployerJobDetails from './pages/Employer/EmployerJobDetails';
import CompanyDashboard from './pages/Company/CompanyDashboard';
import CompanyProfile from './pages/Company/CompanyProfile';
import AutoLogout from './pages/Auth/AutoLogout';
import TermsPrivacy from './pages/TermsPrivacy/TermsPrivacy';

//Context API
import { UserProfileDetailsProvider } from './contextapi/UserProfileDetailsContext';
import { UserContextCookieProvider } from './contextapi/UserContextCookies';
import { HomeRentalProvider } from './contextapi/HomeRentalContext';
import { IncomeRecordProvider } from './contextapi/IncomeRecordContext';
import { UserProtectedRouteProvider } from './contextapi/UserProtectedRouteContext';
import { EnroledCoursesProvider } from './contextapi/EnroledCoursesContext';
import { JobWishListProvider } from './contextapi/JobWishListContext';
import { JobApplicationProvider } from './contextapi/JobApplicationContext';

const App = () => {
	return (
		<JobApplicationProvider>
			<JobWishListProvider>
				<EnroledCoursesProvider>
					<IncomeRecordProvider>
						<UserProtectedRouteProvider>
							<HomeRentalProvider>
								<UserContextCookieProvider>
									<UserProfileDetailsProvider>
										<UserProvider>
											<BrowserRouter>
												<AutoLogout />
												<Routes>
													<Route path='/' element={<Home />} />
													<Route path='/terms' element={<TermsPrivacy />} />
													<Route path='/signin' element={<SignIn />} />
													<Route path='/signup' element={<SignUp />} />
													<Route
														path='/forgot-password'
														element={<ForgotPassword />}
													/>
													<Route
														path='/search-nationalid-details'
														element={<NationalId />}
													/>
													<Route
														path='/job-posts'
														element={<JobPostsPublic />}
													/>
													<Route
														path='/job-details/:slug'
														element={<JobPostDetails />}
													/>
													{/* Protected route for subscriber*/}
													<Route
														path='/dashboard'
														element={
															<SecureLayout>
																<ExpenseBook />
															</SecureLayout>
														}
													/>
													<Route
														path='/profile'
														element={
															<SecureLayout>
																<Profile />
															</SecureLayout>
														}
													/>
													<Route
														path='/job-match'
														element={
															<SecureLayout>
																<JobMatch />
															</SecureLayout>
														}
													/>
													<Route
														path='/job-wishlist'
														element={
															<SecureLayout>
																<JobWishList />
															</SecureLayout>
														}
													/>
													<Route
														path='/expense-details/:slug'
														element={
															<SecureLayout>
																<ExpenseBookDetails />
															</SecureLayout>
														}
													/>
													<Route
														path='/courses'
														element={
															<SecureLayout>
																<Courses />
															</SecureLayout>
														}
													/>
													<Route
														path='/course-details-page/:slug'
														element={
															<SecureLayout>
																<CourseDetails />
															</SecureLayout>
														}
													/>
													<Route
														path='/enroled-courses'
														element={
															<SecureLayout>
																<CourseEnrolment />
															</SecureLayout>
														}
													/>

													<Route
														path='/job-application'
														element={
															<SecureLayout>
																<JobApplication />
															</SecureLayout>
														}
													/>

													{/* This route is for Home renatal app api and its only for testing purpose... */}

													<Route
														path='/home-rental'
														element={
															<SecureLayout>
																<HomeRentalPost />
															</SecureLayout>
														}
													/>

													<Route
														path='/home-rental-offline-data'
														element={
															<SecureLayout>
																<HomeRentalOfflineData />
															</SecureLayout>
														}
													/>
													<Route
														path='/income-record'
														element={
															<SecureLayout>
																<Income />
															</SecureLayout>
														}
													/>
													{/* End of Home rental platform */}
													{/* Protected route for only admin*/}
													<Route
														path='/admin'
														element={
															<AdminSecureLayout>
																<Admin />
															</AdminSecureLayout>
														}
													/>
													<Route
														path='/user-list'
														element={
															<AdminSecureLayout>
																<UserListPagination />
															</AdminSecureLayout>
														}
													/>
													<Route
														path='/allemployer-job-posts'
														element={
															<AdminSecureLayout>
																<JobPostList />
															</AdminSecureLayout>
														}
													/>
													{/* Protected route for only Instructor*/}
													<Route
														path='/instructor-dashboard'
														element={
															<InstructorSecureLayout>
																<InstructorDashboard />
															</InstructorSecureLayout>
														}
													/>
													<Route
														path='/instructor-dashboard/course-details/:slug'
														element={
															<InstructorSecureLayout>
																<InstructorCourseDetails />
															</InstructorSecureLayout>
														}
													/>
													{/* Protected route for only Employer*/}
													<Route
														path='/employer-dashboard'
														element={
															<EmployerSecureLayout>
																<EmployerDashboard />
															</EmployerSecureLayout>
														}
													/>
													<Route
														path='/employer-job-details-application/:slug'
														element={
															<EmployerSecureLayout>
																<EmployerJobDetails />
															</EmployerSecureLayout>
														}
													/>
													{/* Company route - only for testing new dashboard design */}
													<Route
														path='/company-dashboard'
														element={<CompanyDashboard />}
													/>
													<Route
														path='/company-profile'
														element={<CompanyProfile />}
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
				</EnroledCoursesProvider>
			</JobWishListProvider>
		</JobApplicationProvider>
	);
};

export default App;
