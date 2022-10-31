import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CImage,
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
    const [slider, setSlider] = useState();
    const [validTo, setValidTo] = useState();
    const [status, setStatus] = useState(0);
    const [preview, setPreview] = useState();
    const [image, setImage] = useState();
    const location = useLocation();
    const history = useHistory();
    const id = location.pathname.substring(
        "/admin/sliders/".length,
        location.pathname.length
    );
    const type = id !== "create" ? 1 : 0;
    const img = "https://i.fbcd.co/products/resized/resized-750-500/563d0201e4359c2e890569e254ea14790eb370b71d08b6de5052511cc0352313.jpg";

    const getSliderById = async () => {
        try {
            const response = await adminApi.getSliderById(id);
            setSlider(response);
            setValidTo(response?.validTo);
            setStatus(response.status);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    const handleUpdateSlider = async () => {
        try {
            const params = {
                validTo: validTo,
                status: status,
            };
            console.log(image, params);
            const response =
                type === 1
                    ? await adminApi.updateSlider(id, image, params)
                    : await adminApi.createSlider(image, params);
            toast.success(response?.message, {
                duration: 2000,
            });
            history.push("/admin/sliders");
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    const handleThumbnail = (e) => {
        const fileDropped = e.target.files[0];
        setImage(fileDropped)
        const previewUrl = URL.createObjectURL(fileDropped);
        setPreview(previewUrl);
    }

    const optionStatus = [
        { status: 0, label: "Draft" },
        { status: 1, label: "Published" },
        { status: 2, label: "Achieved" },
    ];

    useEffect(() => {
        if (type === 1) {
            getSliderById();
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
                                <strong>Slider Details</strong>
                            </CCardHeader>
                            <CCardBody>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                        Image (
                                        <span style={{ color: "red" }}>*</span>)
                                    </CFormLabel>
                                    <br />
                                    <CImage
                                        rounded
                                        thumbnail
                                        src={!preview ? slider?.imageUrl ? slider?.imageUrl : img : preview}
                                        width={1200}
                                        style={{ maxHeight: '450px', display: 'block', margin: 'auto' }}
                                        onLoad={() => URL.revokeObjectURL(preview)}
                                    />
                                    <CFormInput
                                        className="form-control"
                                        type="file"
                                        accept=".jpg, .png, .jpeg"
                                        onChange={(e) => handleThumbnail(e)}
                                    />
                                </div>
                                <CRow className="g-3 mb-3">
                                    <CCol sm={4}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Valid To (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            {/* <DatePicker selected={validTo} onChange={(date) => setValidTo(new Date(date))} /> */}
                                            <CFormInput
                                                type="date"
                                                id="exampleFormControlInput1"
                                                placeholder=""
                                                value={
                                                    validTo
                                                        ? new Date(
                                                            validTo
                                                        ).toLocaleDateString("en-CA")
                                                        : new Date(
                                                            ""
                                                        ).toLocaleDateString("en-CA")
                                                }
                                                onChange={(e) =>
                                                    setValidTo(
                                                        new Date(e.target.value)
                                                    )
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={4} className="offset-sm-4">
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Status
                                            </CFormLabel>
                                            <CFormSelect
                                                id="autoSizingSelect"
                                                onChange={(e) => setStatus(e.target.value)}
                                                disabled={type !== 1}
                                            >
                                                {optionStatus?.map((item, index) => {
                                                    if (type === 1) {
                                                        return slider?.status ===
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
