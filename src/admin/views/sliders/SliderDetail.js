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
    const [title, setTitle] = useState();
    const [category, setCategory] = useState();
    const [status, setStatus] = useState();
    const [author, setAuthor] = useState();
    const [brief, setBrief] = useState();
    const [content, setContent] = useState();
    const [hasUpdate, setHasUpdate] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const location = useLocation();
    const id = location.pathname.substring(
        "/admin/sliders/".length,
        location.pathname.length
    );

    const getSliderById = async () => {
        // const response = await adminApi.getAllSlider();
        // setSlider(response?.filter((item) => item?.id == id)[0]);
    };

    const handleUpdateSlider = async () => {
        try {
            const params = {
                slider: slider,
                title: title,
                category: category,
                status: status,
                author: author,
                brief: brief,
                content: content
            };
            const response = await adminApi.updateSlider(params, id);
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
                                    <CImage rounded thumbnail src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" width={1200} style={{ maxHeight: '450px', display: 'block', margin: 'auto' }} />
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                        Title
                                    </CFormLabel>
                                    <CFormInput
                                        type="title"
                                        id="exampleFormControlInput1"
                                        placeholder="Title"
                                        defaultValue={slider?.title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                        Back Link
                                    </CFormLabel>
                                    <CFormInput
                                        type="title"
                                        id="exampleFormControlInput1"
                                        placeholder="Back link"
                                        defaultValue={slider?.title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                </div>
                                <CRow className="g-3 mb-3">
                                    <CCol sm={4}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Due Date
                                            </CFormLabel>
                                            {/* <CFormInput
                                                type="date"
                                                id="exampleFormControlInput1"
                                                disabled={isNotAdmin}
                                                placeholder=""
                                                value={
                                                    type === 1
                                                        ? new Date(
                                                            dueDate
                                                        ).toLocaleDateString("en-CA")
                                                        : ""
                                                }
                                                onChange={(e) =>
                                                    setDateTo(new Date(e.target.value))
                                                }
                                            /> */}
                                        </div>
                                    </CCol>
                                    <CCol sm={4} className="offset-sm-4">
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Status
                                            </CFormLabel>
                                            <CFormSelect id="autoSizingSelect">
                                                <option value="1">Draft</option>
                                                <option value="2">Published</option>
                                                <option value="3">Achieved</option>
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
