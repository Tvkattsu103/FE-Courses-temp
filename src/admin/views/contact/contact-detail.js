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
import { useHistory, useLocation } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import { userApi } from "../../../api/userApi";
import {
    AppFooter,
    AppHeader,
    AppSidebar,
    DocsExample,
} from "../../components";

function ContactDetail(props) {
    const [contact, setContact] = useState();
    const [fullname, setFullname] = useState();
    const [email, setEmail] = useState();
    const [category, setCategory] = useState();
    const [phone, setPhone] = useState();
    const [comment, setComment] = useState();
    const history = useHistory();
    const location = useLocation();
    const id = location.pathname.substring(
        "/admin/contact/".length,
        location.pathname.length
    );

    const getContactById = async () => {
        const response = await adminApi.getAllContact();
        setContact(response?.filter((item) => item?.id == id)[0]);
    };

    const handleUpdateContact = async () => {
        try {
            const params = {
                fullName: fullname,
                email: email,
                phoneNumber: phone,
                message: comment,
                category: category,
            };
            const response = await adminApi.updateContact(params, id);
            toast.success(response?.message, {
                duration: 2000,
            });
            history.push('/admin/contact');
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    useEffect(() => {
        getContactById();
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
                                <strong>Change Contact Info</strong>
                            </CCardHeader>
                            <CCardBody>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                        Email
                                    </CFormLabel>
                                    <CFormInput
                                        type="email"
                                        id="exampleFormControlInput1"
                                        defaultValue={contact?.email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
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
                                        defaultValue={contact?.fullName}
                                        onChange={(e) =>
                                            setFullname(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                        Category
                                    </CFormLabel>
                                    <CFormInput
                                        type="email"
                                        id="exampleFormControlInput1"
                                        defaultValue={contact?.category}
                                        onChange={(e) =>
                                            setCategory(e.target.value)
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
                                        defaultValue={contact?.phoneNumber}
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                        Message
                                    </CFormLabel>
                                    <CFormInput
                                        type="email"
                                        id="exampleFormControlInput1"
                                        defaultValue={contact?.message}
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <CButton
                                        onClick={() => handleUpdateContact()}
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

export default ContactDetail;
