import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './App.css';
import { UserProvider } from './contextapi/UserContext';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import ExpenseBook from './pages/ExpenseBook/ExpenseBook';
import SecureLayout from './layouts/SecureLayout';
import Admin from './pages/Admin/Admin';
import AdminSecureLayout from './layouts/AdminSecureLayout';
import Profile from './pages/SubscriberProfile/Profile';
import ExpenseBookDetails from './pages/ExpenseBookDetails/ExpenseBookDetails';
import UserListPagination from './pages/Admin/UserListPagination';
import HomeRentalPost from './pages/HomeRentalApp/HomeRentalPost';
import NationalId from './pages/NationalId/NationalId';
import Income from './pages/Income/Income';
import HomeRentalOfflineData from './pages/HomeRentalOfflineData/HomeRentalOfflineData';
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
