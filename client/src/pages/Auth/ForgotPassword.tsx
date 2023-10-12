import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import HomePageLayout from '../../layouts/HomePageLayout';
import signInPageStyle from './SignIn.module.scss';
import TextField from '../../components/Input/TextField';
import { ForgotPasswordProps, createForgotPassword, createResetPassword, ResetNewPasswordProps } from '../../services/API';

const ForgotPassword = () => {

  
  let navigate = useNavigate();

  /****************************************/
  /*********  Forgot Password *************/
  /****************************************/

  const [email, setEmail] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const onSubmitForgotPassword = async () => {
    try {

      const payload: ForgotPasswordProps = {
        email: email,
      };

      const res = await createForgotPassword(payload);

      if (res) {
        toast.success('Password reset code sent to your email!', {
          position: toast.POSITION.TOP_RIGHT,
        });
        setEmail('');
        setSuccess(true);
        setResetPasswordEmail(email);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  /****************************************/
  /*********  Reset Password **************/
  /****************************************/

  const [resetPasswordEmail, setResetPasswordEmail] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  const onSubmitResetPassword = async () => {
    try {
      const payload: ResetNewPasswordProps = {
        email: resetPasswordEmail,
        verificationCode: verificationCode,
        newPassowrd: newPassword,
      };

      const res = await createResetPassword(payload);

      if (res) {
        toast.success('You have successfully changed your password!', {
          position: toast.POSITION.TOP_RIGHT,
        });

        navigate('/');
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
            <div className={signInPageStyle.inputFormArea}>
              {!success && (
                <>
                  <h5>Forgot password</h5>
                  <TextField label="Email" value={email} setValue={setEmail} />
                  <button className={signInPageStyle.signInButton} onClick={onSubmitForgotPassword}>
                    Forgot Password
                  </button>
                  <Link to={'/signup'} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <span className={signInPageStyle.signUpHereOption}>
                      <p>Don't have an account? Sign Up here</p>
                    </span>
                  </Link>
                </>
              )}
              {success && (
                <>
                  <h5>Reset password</h5>
                  <TextField label="Email" value={resetPasswordEmail} setValue={setResetPasswordEmail} />
                  <TextField label="Verification code" value={verificationCode} setValue={setVerificationCode} />
                  <TextField label="New Password" value={newPassword} setValue={setNewPassword} />
                  <button className={signInPageStyle.signInButton} onClick={onSubmitResetPassword}>
                    Reset new password
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </HomePageLayout>
  );
};

export default ForgotPassword;
{
  /* <input type="datetime-local" id="publishDateTime" value={email} onChange={(e) => setEmail(e.target.value)} /> */
}
