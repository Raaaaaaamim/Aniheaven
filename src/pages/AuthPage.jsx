/**
 * Page for handling authentication.
 * @returns {React.ReactElement} The component representing the page.
 */

import { useRecoilValue } from "recoil";
import Login from "../components/auth/Login.jsx";
import Signup from "../components/auth/Signup.jsx";
import { authAtom } from "../store/atoms/authAtom.js";

const AuthPage = () => {
  const authState = useRecoilValue(authAtom);

  return <>{authState === "login" ? <Login /> : <Signup />}</>;
};

export default AuthPage;
