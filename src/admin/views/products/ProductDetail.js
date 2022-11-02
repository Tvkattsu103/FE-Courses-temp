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

function ProductDetail(props) {
    const [product, setProduct] = useState();
    const [listSubject, setListSubject] = useState();
    const [status, setStatus] = useState(0);
    const [title, setTitle] = useState();
    const [excerpt, setExcerpt] = useState();
    const [duration, setDuration] = useState();
    const [description, setDescription] = useState();
    const [isCombo, setIsCombo] = useState(0);
    const [listPrice, setListPrice] = useState();
    const [salePrice, setSalePrice] = useState();
    const [subjectId, setSubjectId] = useState();
    const location = useLocation();
    const history = useHistory();
    const id = location.pathname.substring(
        "/admin/products/".length,
        location.pathname.length
    );
    const type = id !== "create" ? 1 : 0;

    const getProductById = async () => {
        try {
            const response = await adminApi.getProductById(id);
            setProduct(response);
            setStatus(response.status);
            setIsCombo(response.combo);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    const getAllSubject = async () => {
        try {
            const response = await adminApi.getAllSubject("", 1);
            setListSubject(response);
            console.log(response);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    const handleUpdateSlider = async () => {
        console.log(subjectId);
        try {
            const params = {
                status: status,
                title: title,
                excerpt: excerpt,
                duration: duration,
                description: description,
                isCombo: isCombo,
                listPrice: listPrice,
                salePrice: salePrice,
                subjectId: subjectId,
            };
            const response =
                type === 1
                    ? await adminApi.updateProduct(id, params)
                    : await adminApi.createProduct(params);
            toast.success(response?.message, {
                duration: 2000,
            });
            history.push("/admin/products");
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
            getProductById(id);
        }
        getAllSubject();
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
                                <strong>Product Details</strong>
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
                                                    type === 1 ? product?.title : ""
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
                                                Excerpt (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                defaultValue={
                                                    type === 1 ? product?.excerpt : ""
                                                }
                                                onChange={(e) =>
                                                    setExcerpt(e.target.value)
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel>
                                                Duration (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                defaultValue={
                                                    type === 1 ? product?.duration : ""
                                                }
                                                onChange={(e) =>
                                                    setDuration(e.target.value)
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
                                                    type === 1 ? product?.description : ""
                                                }
                                                onChange={(e) =>
                                                    setDescription(e.target.value)
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel>
                                                List Price (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                defaultValue={
                                                    type === 1 ? product?.listPrice : ""
                                                }
                                                onChange={(e) =>
                                                    setListPrice(e.target.value)
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel>
                                                Sale Price (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                defaultValue={
                                                    type === 1 ? product?.sale_price : ""
                                                }
                                                onChange={(e) =>
                                                    setSalePrice(e.target.value)
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Is Combo (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormSelect
                                                aria-label="Default select example"
                                                onChange={(e) =>
                                                    setIsCombo(e.target.value)
                                                }
                                            >
                                                {optionIsCombo?.map((item, index) => {
                                                    if (type === 1) {
                                                        return product?.combo ===
                                                            item?.combo ? (
                                                            <option
                                                                key={index}
                                                                value={item?.combo}
                                                                selected
                                                            >
                                                                {item?.label}
                                                            </option>
                                                        ) : (
                                                            <option
                                                                key={index}
                                                                value={item?.combo}
                                                            >
                                                                {item?.label}
                                                            </option>
                                                        );
                                                    } else {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={item?.combo}
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
                                                        return product?.status ===
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
                                            <CFormLabel htmlFor="formFile">
                                                Subject (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormSelect
                                                aria-label="Default select example"
                                                onChange={(e) =>
                                                    setSubjectId(e.target.value)
                                                }
                                            >
                                                <option>Select subject</option>
                                                {listSubject?.map((item, index) => {
                                                    if (type === 1) {
                                                        return product?.subjectId === item?.id ? (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    item?.id
                                                                }
                                                                selected
                                                            >
                                                                {item?.name}
                                                            </option>
                                                        ) : (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    item?.id
                                                                }
                                                            >
                                                                {item?.name}
                                                            </option>
                                                        );
                                                    } else {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    item?.id
                                                                }
                                                            >
                                                                {item?.name}
                                                            </option>
                                                        );
                                                    }
                                                })}
                                            </CFormSelect>
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

export default ProductDetail;
