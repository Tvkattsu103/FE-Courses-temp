import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CFormTextarea,
    CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import {
    AppFooter,
    AppHeader,
    AppSidebar,
} from "../../components";

function UserDetail(props) {
    const [listRole, setListRole] = useState([]);
    const [user, setUser] = useState({});
    const [fullname, setFullname] = useState();
    const [phone, setPhone] = useState();
    const [username, setUsername] = useState();
    const location = useLocation();
    const history = useHistory();
    const [option, setOption] = useState();
    const id = location.pathname.substring(
        "/admin/users/".length,
        location.pathname.length
    );
    const type = id !== "create" ? 1 : 0;

    const getListRole = async () => {
        try {
            const response = await adminApi.getListRole();
            setListRole(response);
        } catch (responseError) {
            console.log(responseError);
        }
    };

    const getUserById = async () => {
        try {
            const response = await adminApi.getUserById(id);
            setUser(response);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    const handleUpdateRoleAndProfile = async () => {
        try {
            const params = {
                username: user?.username,
                role: option,
            };
            const paramsProfile = {
                username: username,
                fullname: fullname,
                phoneNumber: phone,
            };
            if (option !== user.role && option !== undefined) {
                await adminApi.updateRoleUser(params);
            }
            const responseProfile = await adminApi.updateUserProfile(
                paramsProfile,
                user?.id
            );
            toast.success(responseProfile?.message, {
                duration: 2000,
            });
            history.push("/admin/users");
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
            console.log(responseError);
        }
    };
    useEffect(() => {
        getListRole();
        if (type === 1) {
            getUserById();
        }
    }, []);

    return (
        <div>
            <AppSidebar />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow-1 px-3">
                    <CCol xs={12}>
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>Change User Info</strong>
                            </CCardHeader>

                            <CCardBody>
                                <CRow className="g-3 mb-3">
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Email
                                            </CFormLabel>
                                            <CFormInput
                                                disabled
                                                type="email"
                                                id="exampleFormControlInput1"
                                                placeholder="name@example.com"
                                                defaultValue={user?.email}
                                            />
                                        </div>

                                    </CCol>
                                    <CCol sm={6}>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="exampleFormControlInput1">
                                            Username
                                        </CFormLabel>
                                        <CFormInput
                                            type="text"
                                            id="exampleFormControlInput1"
                                            placeholder=""
                                            defaultValue={user?.username}
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                        />
                                    </div>
                                    </CCol>
                                    <CCol sm={6}>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="exampleFormControlInput1">
                                            Fullname
                                        </CFormLabel>
                                        <CFormInput
                                            type="text"
                                            id="exampleFormControlInput1"
                                            placeholder=""
                                            defaultValue={user?.fullname}
                                            onChange={(e) =>
                                                setFullname(e.target.value)
                                            }
                                        />
                                    </div>
                                    </CCol>
                                    <CCol sm={6}>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="exampleFormControlInput1">
                                            Phone Number
                                        </CFormLabel>
                                        <CFormInput
                                            type="text"
                                            id="exampleFormControlInput1"
                                            placeholder=""
                                            defaultValue={user?.phoneNumber}
                                            onChange={(e) =>
                                                setPhone(e.target.value)
                                            }
                                        />
                                    </div>
                                    </CCol>
                                    <CCol sm={6}>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="formFile">
                                            Set Roles. Click Ctrl to select multiple
                                        </CFormLabel>
                                        <CFormSelect
                                            aria-label="Default select example"
                                            onChange={(e) =>
                                                setOption(e.target.value)
                                            }
                                            defaultValue={user?.role}
                                        >
                                            {listRole?.map((item, index) => {
                                                return user?.role === item?.setting_value ? (
                                                    <option
                                                        key={index}
                                                        value={item?.setting_value}
                                                        selected
                                                    >
                                                        {item?.setting_value?.replace(
                                                            "ROLE_",
                                                            ""
                                                        )}
                                                    </option>
                                                ) : (
                                                    <option
                                                        key={index}
                                                        value={item?.setting_value}
                                                    >
                                                        {item?.setting_value?.replace(
                                                            "ROLE_",
                                                            ""
                                                        )}
                                                    </option>
                                                );
                                            })}
                                        </CFormSelect>
                                    </div>
                                    </CCol>
                                </CRow>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                        Note (
                                        <span style={{ color: "red" }}>*</span>)
                                    </CFormLabel>
                                    <CFormTextarea id="exampleFormControlTextarea1" rows="3"></CFormTextarea>
                                    {/* <CFormInput
                                        type="text"
                                        id="exampleFormControlInput1"
                                        disabled={isNotAdmin}
                                        placeholder=""
                                        defaultValue={
                                            type === 1 ? subject?.note : ""
                                        }
                                        onChange={(e) =>
                                            setNote(e.target.value)
                                        }
                                    /> */}
                                </div>
                                <div className="mb-3">
                                    <CButton
                                        onClick={() =>
                                            handleUpdateRoleAndProfile()
                                        }
                                    >
                                        Save
                                    </CButton>
                                </div>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </div>
                <AppFooter />
            </div>
        </div>
    );
}

export default UserDetail;
