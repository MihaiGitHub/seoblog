import React, { useState } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ name, email, password, error, loading, message, showForm });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

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
        <div className="btn btn-primary">Signup</div>
      </form>
    );
  };
  return <React.Fragment>{signupForm()}</React.Fragment>;
};

export default SignupComponent;
