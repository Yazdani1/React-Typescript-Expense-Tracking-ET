import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer} from "react-toastify";

import "./App.css";
import { UserProvider } from "./contextapi/UserContext";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import ExpenseBook from "./pages/ExpenseBook/ExpenseBook";
import SecureLayout from "./layouts/SecureLayout";
import Admin from "./pages/Admin/Admin";
import AdminSecureLayout from "./layouts/AdminSecureLayout";
import Profile from "./pages/SubscriberProfile/Profile";
import ExpenseBookDetails from "./pages/ExpenseBookDetails/ExpenseBookDetails";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

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

          {/* Protected route for only admin*/}

          <Route
            path="/admin"
            element={
              <AdminSecureLayout>
                <Admin />
              </AdminSecureLayout>
            }
          />
        </Routes>
        <ToastContainer autoClose={8000} />
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
