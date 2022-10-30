import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormLabel,
    CFormSelect,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import { userApi } from "../../../api/userApi";
import {
    AppFooter,
    AppHeader,
    AppSidebar,
    DocsExample,
} from "../../components";

function UserDetail(props) {
    const [listRole, setListRole] = useState([]);
    const [listUser, setListUser] = useState([]);
    const [user, setUser] = useState({});
    const [fullname, setFullname] = useState();
    const [phone, setPhone] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const location = useLocation();
    const [option, setOption] = useState();

    const getListUser = async () => {
        try {
            const response = await adminApi.getListUser();
            setListUser(response);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    const getListRole = async () => {
        try {
            const response = await adminApi.getListRole();
            setListRole(response);
        } catch (responseError) {
            console.log(responseError);
        }
    };

    const getUserById = async () => {
        const id = location.pathname.substring(
            "/admin/users/".length,
            location.pathname.length
        );
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
                password: password,
            };
            if (option !== user.role && option !== undefined) {
                const response = await adminApi.updateRoleUser(params);
                toast.success(response?.message, {
                    duration: 2000,
                });
            }
            const responseProfile = await adminApi.updateUserProfile(
                paramsProfile,
                user?.id
            );
            toast.success(responseProfile?.message, {
                duration: 2000,
            });
            getUserById();
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };
    useEffect(() => {
        getListUser();
        getListRole();
        getUserById();
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
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                        Password
                                    </CFormLabel>
                                    <CFormInput
                                        type="text"
                                        id="exampleFormControlInput1"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
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
                                <div className="mb-3">
                                    <CFormLabel htmlFor="formFile">
                                        Set Roles. Click Ctrl to select multiple
                                    </CFormLabel>
                                    <CFormSelect
                                        aria-label="Default select example"
                                        onChange={(e) =>
                                            setOption(e.target.value)
                                        }
                                    >
                                        {listRole?.map((item, index) => {
                                            return user?.role === item?.name ? (
                                                <option
                                                    key={index}
                                                    value={item?.name}
                                                    selected
                                                >
                                                    {item?.name?.replace(
                                                        "ROLE_",
                                                        ""
                                                    )}
                                                </option>
                                            ) : (
                                                <option
                                                    key={index}
                                                    value={item?.name}
                                                >
                                                    {item?.name?.replace(
                                                        "ROLE_",
                                                        ""
                                                    )}
                                                </option>
                                            );
                                        })}
                                    </CFormSelect>
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
