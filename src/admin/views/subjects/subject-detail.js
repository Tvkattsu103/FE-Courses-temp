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
import { _ } from "core-js";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../../components";

function SubjectDetail(props) {
    const [listSubject, setListSubject] = useState();
    const [listCategory, setListCategory] = useState([]);
    const [listManager, setListManager] = useState();
    const [listExpert, setListExpert] = useState();
    const [subject, setSubject] = useState();
    const [categoryId, setCategoryId] = useState();
    const [codeSubject, setCodeSubject] = useState();
    const [name, setName] = useState();
    const [status, setStatus] = useState(false);
    const [note, setNote] = useState();
    const [manager, setManager] = useState();
    const [expert, setExpert] = useState();
    const [image, setImage] = useState();
    const [price, setPrice] = useState();
    const role = JSON.parse(Cookies.get("user"))?.role;
    const isNotAdmin = role !== "ROLE_ADMIN" ? true : false;
    const location = useLocation();
    const history = useHistory();
    const id = location.pathname.substring(
        "/admin/subjects/".length,
        location.pathname.length
    );
    const type = id !== "create" ? 1 : 0;

    const getListCategory = async () => {
        try {
            const response = await adminApi.getListCategorySubject();
            setListCategory(response);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    const getSubjectById = async () => {
        try {
            const response = await adminApi.getSubjectDetail(id);
            setSubject(response);
            setStatus(response.status);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    const getListManager = async () => {
        try {
            const response = await adminApi.getListManager();
            setListManager(response);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    const getListExpert = async () => {
        try {
            const response = await adminApi.getListExpert();
            setListExpert(response);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    const handleUpdateSubject = async () => {
        try {
            if (isNotAdmin) {
                const params = {
                    id: id,
                    categoryId: categoryId,
                    status: status,
                    expert: expert,
                };

                const response = await adminApi.managerUpdateSubject(params);
                toast.success(response?.message, {
                    duration: 2000,
                });
            } else {
                const params = {
                    code: codeSubject,
                    name: name,
                    categoryId: categoryId,
                    status: status,
                    note: note,
                    manager: manager,
                    expert: expert,
                    price: price,
                };

                const response =
                    type === 1
                        ? await adminApi.updateSubject(params, id)
                        : await adminApi.addSubject(params);
                console.log(response);
                toast.success(response?.message, {
                    duration: 2000,
                });
            }
            history.push("/admin/subjects");
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    useEffect(() => {
        if (type === 1) {
            getSubjectById();
        }
        if (role === "ROLE_ADMIN") getListManager();
        getListExpert();
        getListCategory();
    }, []);

    const optionStatus = [
        { status: false, label: "Inactive" },
        { status: true, label: "Active" },
    ];

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
                                <strong>
                                    {type === 1
                                        ? "Change Subject Info"
                                        : "Create New Subject"}
                                </strong>
                            </CCardHeader>
                            <CCardBody>
                                <CRow className="g-3 mb-3">
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel>
                                                Code (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                disabled={isNotAdmin}
                                                defaultValue={
                                                    type === 1 ? subject?.code : ""
                                                }
                                                onChange={(e) =>
                                                    setCodeSubject(e.target.value)
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Name (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                disabled={isNotAdmin}
                                                placeholder=""
                                                defaultValue={
                                                    type === 1 ? subject?.name : ""
                                                }
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Category (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormSelect
                                                id="autoSizingSelect"
                                                onChange={(e) => setCategoryId(e.target.value)}
                                            >
                                                <option value="">Select category</option>
                                                {listCategory?.map((item, index) => {
                                                    if (type === 1) {
                                                        return subject?.setting_id ===
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
                                                    } else {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={item?.setting_id}
                                                            >
                                                                {item?.setting_title}
                                                            </option>
                                                        );
                                                    }
                                                })}
                                            </CFormSelect>
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Status (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormSelect
                                                aria-label="Default select example"
                                                onChange={(e) =>
                                                    setStatus(e.target.value)
                                                }
                                            >
                                                {optionStatus?.map((item, index) => {
                                                    if (type === 1) {
                                                        return subject?.status ===
                                                            item?.status ? (
                                                            <option
                                                                key={index}
                                                                value={item?.status}
                                                                selected
                                                            >
                                                                {item?.label}
                                                            </option>
                                                        ) : (
                                                            <option
                                                                key={index}
                                                                value={item?.status}
                                                            >
                                                                {item?.label}
                                                            </option>
                                                        );
                                                    } else {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={item?.status}
                                                            >
                                                                {item?.label}
                                                            </option>
                                                        );
                                                    }
                                                })}
                                            </CFormSelect>
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Price
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                disabled={isNotAdmin}
                                                placeholder=""
                                                defaultValue={
                                                    type === 1 ? subject?.price : ""
                                                }
                                                onChange={(e) =>
                                                    setPrice(e.target.value)
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="formFile">
                                                Manager
                                            </CFormLabel>
                                            <CFormSelect
                                                aria-label="Default select example"
                                                disabled={isNotAdmin}
                                                onChange={(e) =>
                                                    setManager(e.target.value)
                                                }
                                            >
                                                <option>Select manager</option>
                                                {listManager?.map((item, index) => {
                                                    if (type === 1) {
                                                        return subject?.manager
                                                            ?.username ===
                                                            item?.username ? (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    item?.username
                                                                }
                                                                selected
                                                            >
                                                                {item?.username}
                                                            </option>
                                                        ) : (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    item?.username
                                                                }
                                                            >
                                                                {item?.username}
                                                            </option>
                                                        );
                                                    } else {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    item?.username
                                                                }
                                                            >
                                                                {item?.username}
                                                            </option>
                                                        );
                                                    }
                                                })}
                                            </CFormSelect>
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="formFile">
                                                Expert
                                            </CFormLabel>
                                            <CFormSelect
                                                aria-label="Default select example"
                                                onChange={(e) =>
                                                    setExpert(e.target.value)
                                                }
                                            >
                                                <option>Select expert</option>
                                                {listExpert?.map((item, index) => {
                                                    if (type === 1) {
                                                        return subject?.expert
                                                            ?.username ===
                                                            item?.username ? (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    item?.username
                                                                }
                                                                selected
                                                            >
                                                                {item?.username}
                                                            </option>
                                                        ) : (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    item?.username
                                                                }
                                                            >
                                                                {item?.username}
                                                            </option>
                                                        );
                                                    } else {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    item?.username
                                                                }
                                                            >
                                                                {item?.username}
                                                            </option>
                                                        );
                                                    }
                                                })}
                                            </CFormSelect>
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="formFile">
                                                Upload Image Subject
                                            </CFormLabel>
                                            {subject?.image ? (
                                                <div className="mb-3">
                                                    <img
                                                        style={{
                                                            width: "100px",
                                                            height: "100px",
                                                        }}
                                                        src={subject?.image}
                                                        alt=""
                                                    />
                                                </div>
                                            ) : (
                                                ""
                                            )}

                                            <input
                                                className="form-control"
                                                disabled={isNotAdmin}
                                                type="file"
                                                accept=".jpg, .png"
                                                defaultValue={subject?.image}
                                                onChange={(e) =>
                                                    setImage(e.target.files[0])
                                                }
                                            />
                                        </div>
                                    </CCol>
                                </CRow>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                        Note (
                                        <span style={{ color: "red" }}>*</span>)
                                    </CFormLabel>
                                    <CFormTextarea
                                        id="exampleFormControlTextarea1"
                                        disabled={isNotAdmin}
                                        defaultValue={
                                            type === 1 ? subject?.note : ""
                                        }
                                        onChange={(e) =>
                                            setNote(e.target.value)
                                        }
                                        rows="3"
                                    >
                                    </CFormTextarea>
                                </div>
                                <div className="mb-3">
                                    <CButton
                                        onClick={() => handleUpdateSubject()}
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

export default SubjectDetail;
