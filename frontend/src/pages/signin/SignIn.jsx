import React from "react";

import LeftSection from "../../components/SigninPage/LeftSection/LeftSection";
import RightSection from "../../components/SigninPage/RightSection/RightSection";

import "./signin.css";

const SignIn = () => {
  return (
    <div className="flex">
      <LeftSection />
      <RightSection />
    </div>
  );
};

export default SignIn;
