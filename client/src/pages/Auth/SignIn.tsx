import { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

import signInPageStyle from "./SignIn.module.scss";
import { userLogin, UserLoginProps } from "../../services/API";
import { UserContext } from "../../contextapi/UserContext";
import { useUserContext } from "../../contextapi/UserContextCookies";
import { UserProtectedRouteContext } from "../../contextapi/UserProtectedRouteContext";
import HomePageLayout from "../../layouts/HomePageLayout";
import TextField from "../../components/Input/TextField";

const SignIn = () => {
  let navigate = useNavigate();

  // Old Used Context API
  // const [state, setState]:any = useContext(UserContext);

  // This is the context api that has cookies and store user detials when user login
  const { setUser } = useUserContext();

  // Context API to show user protected route.
  const [userInfo, setUserInfo]: any = useContext(UserProtectedRouteContext);

  /****************************************/
  /*********  User Login      *************/
  /****************************************/

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // to show blocked user error message

  const [error, setError] = useState<string>("");

  const onSubmitUserSignIn = async (e: any) => {
    e.preventDefault();

    try {
      const payload: UserLoginProps = {
        email: email,
        password: password,
      };

      const res = await userLogin(payload);

      if (res.data) {
        /////////////////////////////////////////////////////////////
        // save user info in local storage
        // localStorage.setItem("tokenLogin", JSON.stringify(res.data));
        // update user information to context api
        // setState({
        //   user: res.data.user,
        //   token: res.data.token,
        // });
        ///////////////////////////////////////////////////////////////
        // This token is for protected route that is required to pass in the header
        window.localStorage.setItem("token", res.data.token);
        // To test user protected route user context api
        localStorage.setItem(
          "userInforProtectedRoute",
          JSON.stringify(res.data.user?.date)
        );
        setUserInfo(res.data.user?.date);
        ////////////////// end
        //To set User cookie context api.
        // As soon as user login - we need to store user info in this context api can
        //used any component to show user data. it also encrypt
        setUser(res.data.user);

        // To clean the state as soon as user loged in
        setEmail("");
        setPassword("");

        if (res.data.user?.blockUser) {
          setError("Your account is blocked. Please contact with the support1");
        } else {
          toast.success("You have Loged In Successfully!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          if (res.data.user?.role === "Admin") {
            navigate("/admin");
          } else {
            navigate("/dashboard");
          }
        }
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <HomePageLayout>
      <div className="container">
        <div className={signInPageStyle.signInContainer}>
          <div className={signInPageStyle.signInFormDesign}>
            <h5>Sign In</h5>
            {error && <h6 style={{ color: "red" }}>{error}</h6>}
            <div className={signInPageStyle.inputFormArea}>
              <div className="form-group">
                <input
                  type="text"
                  name="Name"
                  className={signInPageStyle.formControlEmail}
                  placeholder="Your E-mail *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="email"
                  className={signInPageStyle.formControlPassword}
                  placeholder="Your Password*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className={signInPageStyle.signInButton}
                onClick={(e) => onSubmitUserSignIn(e)}
              >
                Sign In
              </button>
              <Link
                to={"/signup"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className={signInPageStyle.signUpHereOption}>
                  <p>Don't have an account? Sign Up here</p>
                </span>
              </Link>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={8000} />
      </div>
    </HomePageLayout>
  );
};

export default SignIn;
