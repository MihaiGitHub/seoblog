import React, { useState, useEffect } from "react";
import { signin, authenticate, isAuth } from "../../actions/auth";
import Router from "next/router";
import Link from "next/link";

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && Router.push("/");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, loading: true, error: false });

    const user = { email, password };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // save user token to cookie

        // save user info to localstorage

        // authenticate user
        authenticate(data, () => {
          if (isAuth() && isAuth().role == 1) {
            Router.push(`/admin`);
          } else {
            Router.push(`/user`);
          }
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";

  const showError = () =>
    error ? <div className="alert alert-info">{error}</div> : "";

  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={email}
            className="form-control"
            type="email"
            placeholder="Type your email"
            onChange={handleChange("email")}
          />
          <input
            value={password}
            className="form-control"
            type="password"
            placeholder="Type your password"
            onChange={handleChange("password")}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signin
        </button>
      </form>
    );
  };

  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signinForm()}
      <br />
      <Link href="/auth/password/forgot">
        <a className="btn btn-outline-danger btn-small">Forgot password</a>
      </Link>
    </React.Fragment>
  );
};

export default SigninComponent;
