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
import { userApi } from "../../../api/userApi";
import {
    AppFooter,
    AppHeader,
    AppSidebar,
    DocsExample,
} from "../../components";

function ContactDetail(props) {
    const [listCategory, setListCategory] = useState([]);
    const [contact, setContact] = useState();
    const [fullname, setFullname] = useState();
    const [email, setEmail] = useState();
    const [categoryId, setCategoryId] = useState();
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
        setContact(response.data?.filter((item) => item?.id == id)[0]);
    };

    const getListCategory = async () => {
        try {
            const response = await userApi.getListCategoryWebContact();
            setListCategory(response);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    const handleUpdateContact = async () => {
        try {
            const params = {
                fullName: fullname,
                email: email,
                phoneNumber: phone,
                message: comment,
                categoryId: categoryId,
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
        getListCategory();
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
                                <CRow className="g-3 mb-3">
                                    <CCol sm={6}>
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
                                                defaultValue={contact?.fullName}
                                                onChange={(e) =>
                                                    setFullname(e.target.value)
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Category
                                            </CFormLabel>
                                            <CFormSelect
                                                id="autoSizingSelect"
                                                onChange={(e) => setCategoryId(e.target.value)}
                                            >
                                                <option value="">Select category</option>
                                                {listCategory?.map((item, index) => {
                                                    return contact?.setting_id ===
                                                        item?.setting_id ? (
                                                        <option
                                                            key={index}
                                                            value={item?.setting_id}
                                                            selected
                                                        >
                                                            {item?.setting_title}
                                                        </option>
                                                    ) : (
                                                        <option
                                                            key={index}
                                                            value={item?.setting_id}
                                                        >
                                                            {item?.setting_title}
                                                        </option>
                                                    );

                                                })}
                                            </CFormSelect>
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
                                                defaultValue={contact?.phoneNumber}
                                                onChange={(e) =>
                                                    setPhone(e.target.value)
                                                }
                                            />
                                        </div>
                                    </CCol>
                                </CRow>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                        Message
                                    </CFormLabel>
                                    <CFormTextarea
                                        id="exampleFormControlTextarea1"
                                        defaultValue={
                                            contact?.message
                                        }
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                        rows="3"
                                    >
                                    </CFormTextarea>
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
