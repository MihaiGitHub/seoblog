import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import GoogleLogin from "react-google-login";
import { loginWithGoogle } from "../../actions/auth";
import { GOOGLE_CLIENT_ID } from "../../config";

const LoginGoogle = () => {
  return (
    <div className="login-with-google-div">
      <GoogleLogin
        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        theme="dark"
      />
    </div>
  );
};

export default LoginGoogle;
