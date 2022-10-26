import React, { useState } from "react";
import logoWhite2 from "../../images/logo-white-2.png";
import bannerImg from "../../images/background/bg2.jpg";
import { Link, useHistory, useLocation } from "react-router-dom";
import { userApi } from "../../api/userApi";
import axios from "axios";
import useQuery from "../../hooks/useQuery";
import toast, { Toaster } from "react-hot-toast";

function ForgetPasswordInput(props) {
    const [password, setPassword] = useState();
    const [rePassword, setRePassword] = useState();
    const [alertMessage, setAlertMessage] = useState("Please input field");
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setPopupAlertType] = useState("primary");
    const location = useLocation();
    const history = useHistory();

    const handleResetPass = async () => {
        if (rePassword !== password) {
            setAlertMessage("re password wrong");
            setAlertVisible(true);
            setPopupAlertType("danger");
            return;
        }

        try {
            const param = {
                password: password,
            };

            const token = location.pathname.replace("/reset-password/", "");
            console.log(token);
            toast.success("Change password sucessfully", {
                duration: 2000,
            });
            setTimeout(() => {
                history.push("/login");
            }, 2000);
            const response = await axios.post(
                process.env.REACT_APP_BASE_URL + "/api/account/reset-password",
                param,
                {
                    params: {
                        token,
                    },
                }
            );
            console.log(response);
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
                <div className="account-form-inner">
                    <div className="account-container">
                        <div className="heading-bx left">
                            <h2 className="title-head">Reset your password</h2>
                        </div>
                        <div
                            className={`alert alert-${alertType} alert-dismissible fade show`}
                            role="alert"
                            style={{ display: `${alertVisible ? "" : "none"}` }}
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
                                                name="name"
                                                type="password"
                                                required=""
                                                placeholder="New password"
                                                className="form-control"
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input
                                                name="repassword"
                                                type="password"
                                                className="form-control"
                                                placeholder="Re input password"
                                                required=""
                                                onChange={(e) =>
                                                    setRePassword(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 m-b30">
                                    <p
                                        name="submit"
                                        className="btn button-md"
                                        onClick={() => handleResetPass()}
                                    >
                                        Submit
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </>
    );
}

export default ForgetPasswordInput;
