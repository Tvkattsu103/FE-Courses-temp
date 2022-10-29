import React, { Component, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Images
import logoWhite2 from "../../images/logo-white-2.png";
import bannerImg from "../../images/background/bg2.jpg";
import { userApi } from "../../api/userApi";

function Register(props) {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [fullName, setFullName] = useState();
  const [password, setPassword] = useState();
  const [alertMessage, setAlertMessage] = useState();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setPopupAlertType] = useState("primary");
  const [step, setStep] = useState(0);
  const history = useHistory();

  const handleRegister = async () => {
    const regUsername = /^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    const regEmail =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const regPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&_])[A-Za-z\\d@$!%*?&_]{8,20}$/;

    if (!regUsername.test(username)) {
      setAlertMessage("username is invalid");
      setAlertVisible(true);
      setPopupAlertType("danger");
      return;
    } else if (!regEmail.test(email)) {
      setAlertMessage("email is invalid");
      setAlertVisible(true);
      setPopupAlertType("danger");
      return;
    }

    try {
      const param = {
        username: username,
        email: email,
        password: password,
        fullName: fullName,
      };

      const response = await userApi.registerAccount(param);
      console.log(response);
      setStep(1);
    } catch (responseError) {
      setAlertMessage(responseError?.data?.message);
      setAlertVisible(true);
      setPopupAlertType("danger");
    }
  };

  return (
    <>
      <div className="account-form">
        <div
          className="account-head"
          style={{ backgroundImage: "url(" + bannerImg + ")" }}
        >
          <Link to="/">
            <img src={logoWhite2} alt="" />
          </Link>
        </div>
        {step === 0 ? (
          <div className="account-form-inner">
            <div
              className="account-container"
              style={{ maxWidth: "500px", width: "500px" }}
            >
              <div className="heading-bx left">
                <h2 className="title-head">
                  Sign Up <span>Now</span>
                </h2>
                <p>
                  Login Your Account <Link to="/login">Click here</Link>
                </p>
              </div>
              <div
                className={`alert alert-${alertType} alert-dismissible fade show`}
                role="alert"
                style={{
                  display: `${alertVisible ? "" : "none"}`,
                }}
              >
                {alertMessage}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
              <form className="contact-bx">
                <div className="row placeani">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          name="username"
                          type="text"
                          placeholder="Your Username"
                          required=""
                          className="form-control"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          name="fullname"
                          type="text"
                          placeholder="Full Name"
                          required=""
                          className="form-control"
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          name="email"
                          type="email"
                          placeholder="Your Email Address"
                          required=""
                          className="form-control"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          name="password"
                          type="password"
                          placeholder="Your Password"
                          className="form-control"
                          required=""
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 m-b30">
                    <p
                      className="btn button-md"
                      onClick={() => handleRegister()}
                    >
                      Sign up
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="account-form-inner">
            <div className="account-container">
              <div className="heading-bx left">
                <h2 className="title-head">Account Confirmation</h2>
                <p>
                  An email with your account confirmation link has been sent to
                  your email: {email}
                </p>
                <p className="pb-2">Check your email and come back to login!</p>
                <div className="col-lg-12 m-b30 p-0">
                  <p
                    className="btn button-md"
                    onClick={() => history.push("/login")}
                  >
                    Login
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Register;
