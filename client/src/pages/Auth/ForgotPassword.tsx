import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import HomePageLayout from '../../layouts/HomePageLayout';
import signInPageStyle from './SignIn.module.scss';
import TextField from '../../components/Input/TextField';

const ForgotPassword = () => {
  /****************************************/
  /*********  Forgot Password *************/
  /****************************************/

  const [email, setEmail] = useState<string>('');

  return (
    <HomePageLayout>
      <div className="container">
        <div className={signInPageStyle.signInContainer}>
          <div className={signInPageStyle.signInFormDesign}>
            <h5>Forgot password</h5>
            <div className={signInPageStyle.inputFormArea}>
              <TextField label="Email" value={email} setValue={setEmail} />
              {email}

              <input type="datetime-local" id="publishDateTime" value={email} onChange={(e) => setEmail(e.target.value)} />

              <button className={signInPageStyle.signInButton}>Forgot Password</button>

              <Link to={'/signup'} style={{ textDecoration: 'none', color: 'inherit' }}>
                <span className={signInPageStyle.signUpHereOption}>
                  <p>Don't have an account? Sign Up here</p>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </HomePageLayout>
  );
};

export default ForgotPassword;
