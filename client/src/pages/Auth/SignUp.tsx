import { useState, useEffect, MouseEvent } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

import signInPageStyle from "./SignIn.module.scss";
import {
  UserRegistrationProps,
  userRegistration,
  getUserAccountRegistrationLocation,
} from "../../services/API";
import { LocationData } from "../../services/DataProvider";
import TextField from "../../components/Input/TextField";

const SignUp = () => {
  
  let navigate = useNavigate();

  /****************************************/
  /*********To get user location  *********/
  /****************************************/

  const [location, setLocation] = useState<LocationData>({
    city: "",
    countryName: "",
    latitude: 0,
    longitude: 0,
    continent: "",
  });

  const loadUserLocation = async (): Promise<void> => {
    // Get user's geolocation coordinates
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      // To get city, country and other info based on user latitude and longitude
      const locationResponse = await getUserAccountRegistrationLocation(
        latitude,
        longitude
      );
      const locationData: LocationData = locationResponse.data;

      setLocation({
        city: locationData.city,
        countryName: locationData.countryName,
        latitude,
        longitude,
        continent: locationData.continent,
      });
    });
  };

  useEffect(() => {
    loadUserLocation();
  }, []);

  /****************************************/
  /*********User Registration *************/
  /****************************************/

  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");


  const onSubmitUserRegistration = async (e: any): Promise<void> => {
    e.preventDefault();

    try {

      const payload: UserRegistrationProps = {
        name: userName,
        email: userEmail,
        password: userPassword,
        city: location.city,
        countryName: location.countryName,
        continent: location.continent,
        latitude: location.latitude,
        longitude: location.longitude,
      };

      const res = await userRegistration(payload);

      if (res.data) {
        toast.success("Your account created successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/");
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
            <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
              <span className={signInPageStyle.signUpHereOption}>
                <p>Already have an account? Sign In here</p>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
