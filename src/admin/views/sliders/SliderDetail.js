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
    CImage,
    CRow,
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SliderDetail(props) {
    const [slider, setSlider] = useState();
    const [validTo, setValidTo] = useState(0);
    const [status, setStatus] = useState(1);
    const [hasUpdate, setHasUpdate] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [dateTo, setDateTo] = useState();
    const [preview, setPreview] = useState();
    const [image, setImage] = useState();
    const location = useLocation();
    const id = location.pathname.substring(
        "/admin/sliders/".length,
        location.pathname.length
    );
    const type = id !== "create" ? 1 : 0;
    const img = "https://i.fbcd.co/products/resized/resized-750-500/563d0201e4359c2e890569e254ea14790eb370b71d08b6de5052511cc0352313.jpg";

    const getSliderById = async () => {
        // const response = await adminApi.getAllSlider();
        // setSlider(response?.filter((item) => item?.id == id)[0]);
    };

    const handleUpdateSlider = async () => {
        try {
            const params = {
                image: image,
                validTo: validTo,
                status: status,
            };
            console.log(id, type);
            const response =
                type === 1
                    ? await adminApi.updateSlider(params, id)
                    : await adminApi.createSlider(image, validTo, status);
            setHasUpdate(!hasUpdate);
            toast.success(response?.message, {
                duration: 2000,
            });
        } catch (responseError) {
            toast.error(responseError, {
                duration: 2000,
            });
        }
    };

    const handleThumbnail = (e) => {
        const fileDropped = e.target.files[0];
        setImage(fileDropped)
        const previewUrl = URL.createObjectURL(fileDropped);
        setPreview(previewUrl);
    }

    useEffect(() => {
        getSliderById();
    }, [hasUpdate]);

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
                                        Picture
                                    </CFormLabel>
                                    <br />
                                    {/* <CImage rounded thumbnail src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" width={1200} style={{ maxHeight: '450px', display: 'block', margin: 'auto' }} /> */}
                                    <CImage
                                        rounded
                                        thumbnail
                                        src={!preview ? slider?.thumnailUrl ? slider?.thumnailUrl : img : preview}
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
                                                Valid To
                                            </CFormLabel>
                                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
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
                                            >
                                                <option value="0">Draft</option>
                                                <option value="1">Published</option>
                                                <option value="2">Achieved</option>
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

export default SliderDetail;
