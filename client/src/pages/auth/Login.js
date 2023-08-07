import React from "react";
import Forms from "../../components/shared/form/Forms.js";
import { useSelector } from "react-redux/es/hooks/useSelector.js";
import Spinner from "../../components/shared/Spinner.js";

export const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="row g-0">
          <div className="col-md-8 form-banner">
            <img src="./assets/images/banner1.jpg" alt="login_image"></img>
          </div>
          <div className="col-md-4 form-container">
            <Forms
              submitBtn={"Login"}
              formTitle={"Login Page"}
              formType={"login"}
            />
          </div>
        </div>
      )}
    </>
  );
};
