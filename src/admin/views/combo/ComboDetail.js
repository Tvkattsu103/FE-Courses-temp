import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormLabel,
    CFormSelect,
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

function ComboDetail(props) {
    const [combo, setCombo] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const location = useLocation();
    const history = useHistory();
    const id = location.pathname.substring(
        "/admin/combo/".length,
        location.pathname.length
    );
    const type = id !== "create" ? 1 : 0;

    const getComboById = async () => {
        try {
            const response = await adminApi.getComboById(id);
            setCombo(response);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    const handleUpdateSlider = async () => {
        try {
            const params = {
                title: title,
                description: description,
            };
            const response =
                type === 1
                    ? await adminApi.updateCombo(id, params)
                    : await adminApi.createCombo(params);
            toast.success(response?.message, {
                duration: 2000,
            });
            history.push("/admin/combo");
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    const optionIsCombo = [
        { combo: false, label: "False" },
        { combo: true, label: "True" },
    ];

    const optionStatus = [
        { status: false, label: "Inactive" },
        { status: true, label: "Active" },
    ];

    useEffect(() => {
        if (type === 1) {
            getComboById(id);
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
                                <strong>Combo Details</strong>
                            </CCardHeader>
                            <CCardBody>
                                <CRow className="g-3 mb-3">
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel>
                                                Title (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                defaultValue={
                                                    type === 1 ? combo?.title : ""
                                                }
                                                onChange={(e) =>
                                                    setTitle(e.target.value)
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel>
                                                Description (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                defaultValue={
                                                    type === 1 ? combo?.description : ""
                                                }
                                                onChange={(e) =>
                                                    setDescription(e.target.value)
                                                }
                                            />
                                        </div>
                                    </CCol>
                                </CRow>
                                <div className="mb-3">
                                    <CButton
                                        onClick={() => handleUpdateSlider()}
                                    >
                                        Submit
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

export default ComboDetail;
