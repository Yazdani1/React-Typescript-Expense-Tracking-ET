import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";
import Cookies from "universal-cookie";
import CryptoJS from "crypto-js";

import {UserProfileDetails} from "../services/DataProvider"

const cookies = new Cookies();
const SECRET_KEY = "gdfgdfgdfgdfgdfg";

// Define the type for your user context
interface UserContextType {
  user: UserProfileDetails | null;
  setUser: (user: UserProfileDetails | null) => void;
  logout: () => void;
}

// Create the user context with initial values
export const UserContextCookie = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

// Custom hook to access the user context
export const useUserContext = () => useContext(UserContextCookie);

// User context provider component
interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextCookieProvider: FC<UserContextProviderProps> = ({
  children,
}) => {

  const [user, setUser] = useState<UserProfileDetails | null>(() => {

    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const decryptedUserData = decryptUserData(storedUserData);
        return decryptedUserData;
      } catch (error) {
        console.error("Error decrypting stored user data:", error);
      }
    }
    return null;
  });

  const encryptUserData = (data: UserProfileDetails) => {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      SECRET_KEY
    ).toString();
    return encryptedData;
  };

  const decryptUserData = (encryptedData: string) => {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  };

  const updateUser = (user: UserProfileDetails | null) => {
    setUser(user);
    if (user) {
      const encryptedUserData = encryptUserData(user);
      localStorage.setItem("userData", encryptedUserData);
      cookies.set("sessionId", "dummy-session-id", { path: "/" });
    } else {
      localStorage.removeItem("userData");
      cookies.remove("sessionId", { path: "/" });
    }
  };

  const logout = () => {
    updateUser(null);
    // You may also need to perform other logout-related tasks, such as redirecting the user to the login page or clearing additional data or states.
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const decryptedUserData = decryptUserData(storedUserData);
        setUser(decryptedUserData);
        cookies.set("sessionId", "dummy-session-id", { path: "/" });
      } catch (error) {
        console.error("Error decrypting stored user data:", error);
        setUser(null);
        cookies.remove("sessionId", { path: "/" });
      }
    }
  }, []);

  return (
    <UserContextCookie.Provider value={{ user, setUser: updateUser, logout }}>
      {children}
    </UserContextCookie.Provider>
  );
};












