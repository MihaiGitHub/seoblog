import { useState, useEffect } from "react";
import jwt from "../../../../components/Layout";
import Layout from "../../../../components/Layout";
import { withRouter } from "next/router";
import { signup } from "../../../../actions/auth";

const ActivateAccount = ({ router }) => {
  const [values, setValues] = useState({
    email: "",
    token: "",
    error: "",
    loading: false,
    success: true,
    showButton: true,
  });

  const { name, token, error, loading, success, showButton } = values;

  useEffect(() => {
    let token = router.query.id;

    if (token) {
      const { name } = jwt.decode(token);
      setValues({ ...values, name, token });
    }
  }, []);

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    signup({ token }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
          showButton: false,
        });
      } else {
        setValues({
          ...values,
          loading: false,
          success: true,
          showButton: false,
        });
      }
    });
  };

  const showLoading = () => (loading ? <h2>Loading...</h2> : "");

  return (
    <Layout>
      <div className="container">
        <h3>Hey {name}, Ready to activate your account?</h3>
        {showLoading()}
        {error && error}
        {success &&
          "You have successfully activated your account. PLease signin."}
        {showButton && (
          <button className="btn btn-outline-primary" onClick={clickSubmit}>
            Activate Account
          </button>
        )}
      </div>
    </Layout>
  );
};

export default withRouter(ActivateAccount);
