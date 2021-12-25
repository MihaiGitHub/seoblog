import React, { useState, useEffect } from "react";
import { signup, isAuth, preSignup } from "../../actions/auth";
import Router from "next/router";

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { name, email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && Router.push("/");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, loading: true, error: false });

    const user = { name, email, password };

    preSignup(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          loading: false,
          message: data.message,
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

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={name}
            className="form-control"
            type="text"
            placeholder="Type your name"
            onChange={handleChange("name")}
          />
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
          Signup
        </button>
      </form>
    );
  };
  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signupForm()}
      <br />
      <Link href="/auth/password/forgot">
        <a className="btn btn-outline-danger btn-small">Forgot password</a>
      </Link>
    </React.Fragment>
  );
};

export default SignupComponent;
