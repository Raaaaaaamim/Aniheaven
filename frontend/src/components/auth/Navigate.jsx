import React from "react";
import { Navigate as NavigateReact } from "react-router-dom";
import { useRecoilValue } from "recoil";
import AuthPage from "../../pages/AuthPage.jsx";
import { userAtom } from "../../store/atoms/userAtom.js";

const Navigate = () => {
  const user = useRecoilValue(userAtom);

  return user ? <NavigateReact to="/home" /> : <AuthPage />;
};

export default Navigate;
