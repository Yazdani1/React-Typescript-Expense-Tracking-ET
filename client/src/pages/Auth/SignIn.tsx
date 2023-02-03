import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import signInPageStyle from "./SignIn.module.scss";
import { userLogin, UserLoginProps } from "../../services/API";
import { UserContext } from "../../contextapi/UserContext";

const SignIn = () => {

  let navigate = useNavigate();

  const [state, setState] = useContext(UserContext);

  /****************************************/
  /*********  User Login      *************/
  /****************************************/

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmitUserSignIn = async (e: any) => {
    e.preventDefault();

    try {
      const payload: UserLoginProps = {
        email: email,
        password: password,
      };

      const res = await userLogin(payload);

      if (res.data) {
        toast.success("You have Loged In Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        // save user info in local storage
        localStorage.setItem("tokenLogin", JSON.stringify(res.data));
        window.localStorage.setItem("token", res.data.token);

        // update user information to context api
        setState({
          user: res.data.user,
          token: res.data.token,
        });

        setEmail("");
        setPassword("");

        if (res.data.user?.role === "Admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="container">
      <div className={signInPageStyle.signInContainer}>
        <div className={signInPageStyle.signInFormDesign}>
          <h5>Sign In</h5>

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
            <span className={signInPageStyle.signUpHereOption}>
              <p>Don't have an account? Sign Up here</p>
            </span>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={8000} />
    </div>
  );
};

export default SignIn;
