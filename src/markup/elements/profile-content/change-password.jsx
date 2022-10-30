import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { userApi } from "../../../api/userApi";

function ChangePassword(props) {
    const [password, setPassword] = useState();
    const [rePassword, setRePassword] = useState();
    const [alertMessage, setAlertMessage] = useState();
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setPopupAlertType] = useState("primary");

    const handleChangeProfile = async () => {
        if ((password !== "") & (password !== rePassword)) {
            setAlertMessage("re input password wrong");
            setAlertVisible(true);
            setPopupAlertType("danger");
            return;
        }

        try {
            const param = {
                password: password,
            };
            const response = await userApi.updateInfo(param);
            setAlertMessage(response?.message);
            setAlertVisible(true);
            setPopupAlertType("success");
            toast.success(response?.message, {
                duration: 2000,
            });
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    return (
        <>
            <div className="profile-head">
                <h5>Change Password</h5>
            </div>
            <form className="edit-profile">
                <div className="">
                    <div className="form-group row">
                        <div className="col-12 col-sm-8 col-md-8 col-lg-9 ml-auto">
                            <h3>Password</h3>
                        </div>
                    </div>
                    <Toaster position="top-right" reverseOrder={true} />
                    <div
                        className={`alert alert-${alertType} fade show`}
                        role="alert"
                        style={{ display: `${alertVisible ? "" : "none"}` }}
                    >
                        {alertMessage}
                    </div>
                    <div className="form-group row">
                        <label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">
                            New Password
                        </label>
                        <div className="col-12 col-sm-8 col-md-8 col-lg-7">
                            <input
                                className="form-control"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">
                            Re Type New Password
                        </label>
                        <div className="col-12 col-sm-8 col-md-8 col-lg-7">
                            <input
                                className="form-control"
                                type="password"
                                onChange={(e) => setRePassword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-4 col-md-4 col-lg-3"></div>
                    <div className="col-12 col-sm-8 col-md-8 col-lg-7 d-flex align-items-center">
                        <span
                            onClick={() => handleChangeProfile()}
                            className="btn m-r10"
                        >
                            Save changes
                        </span>
                        <button type="reset" className="btn-secondry">
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default ChangePassword;
