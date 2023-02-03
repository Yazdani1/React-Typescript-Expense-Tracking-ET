import React, { useState } from "react";
import { toast } from "react-toastify";
import signInPageStyle from "./SignIn.module.scss";
import { UserRegistrationProps, userRegistration } from "../../services/API";

const SignUp = () => {
  /****************************************/
  /*********User Registration *************/
  /****************************************/
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const onSubmitUserRegistration = async (e: any) => {
    e.preventDefault();

    try {
      const payload: UserRegistrationProps = {
        name: userName,
        email: userEmail,
        password: userPassword,
      };

      const res = await userRegistration(payload);

      if (res.data) {
        toast.success("You have Loged In Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
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
          <h5>Sign Up</h5>

          <div className={signInPageStyle.inputFormArea}>
            <div className="form-group">
              <input
                type="text"
                name="Name"
                className={signInPageStyle.formControlEmail}
                placeholder="Your Name *"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="Name"
                className={signInPageStyle.formControlEmail}
                placeholder="Your E-mail *"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                className={signInPageStyle.formControlPassword}
                placeholder="Your Password*"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </div>

            <button
              className={signInPageStyle.signInButton}
              onClick={(e) => onSubmitUserRegistration(e)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
