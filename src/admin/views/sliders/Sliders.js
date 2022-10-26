import React, { useEffect, useState } from "react";
import {
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CAvatar,
    CButton,
    CImage,
    CFormSelect,
    CInputGroup,
    CCol,
    CForm,
    CRow,
    CFormInput,
    CInputGroupText,
} from "@coreui/react";
import { AppFooter, AppHeader, AppSidebar } from "../../components";
import CIcon from "@coreui/icons-react";
import { cibCcMastercard, cifUs, cilPeople, cilSearch } from "@coreui/icons";
import avatar1 from "../../assets/images/avatars/1.jpg";
import { Link, useHistory } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import toast, { Toaster } from "react-hot-toast";

const Sliders = () => {
    const [listSlider, setListSlider] = useState([]);
    const [isModify, setIsModify] = useState(false);
    const history = useHistory();

    //fakedata
    const listslider = [
        {
            id: 1,
            image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
            slider: '123aaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa',
            dueDate: '10/03/2000',
            status: 'Draft',
            createDate: '10-03-2000 12:12:12'
        },
        {
            id: 2,
            image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
            slider: '123',
            dueDate: '123',
            status: 'Published',
            createDate: '10-03-2000 12:12:12'
        }
    ]

    const getListSlider = async () => {
        try {
            // const response = await adminApi.getAllSlider();
            // setListSlider(Object.values(response));
        } catch (responseError) {
            console.log(responseError);
        }
        //fakedata
        setListSlider(listslider);
    };
    const handleUpdateStatus = async (e) => {
        try {
            const params = {
                status: e.status,
            };
            if (e.status === 'Draft') {

            } else {

            }
            const response = await adminApi.updateStatusSlider(params, e?.id);
            toast.success(response?.message, {
                duration: 2000,
            });
            setIsModify(!isModify);
        } catch (responseError) {
            toast.error(responseError, {
                duration: 2000,
            });
        }
    };

    const handleDeleteSlider = async (e) => {
        try {
            const response = await adminApi.deleteSlider(e?.id);
            toast.success(response?.message, {
                duration: 2000,
            });
            setIsModify(!isModify);
        } catch (responseError) {
            toast.error(responseError, {
                duration: 2000,
            });
        }
    };

    useEffect(() => {
        getListSlider();
    }, [isModify]);

    return (
        <div>
            <AppSidebar />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow-1 px-3">
                    <h3>Slider list</h3>
                    <CRow className="g-3 mb-3">
                        <CCol sm={2}>
                            <CFormSelect id="autoSizingSelect">
                                <option>All statuses</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </CFormSelect>
                        </CCol>
                        <CCol sm={3}>
                            <CInputGroup className="flex-nowrap" >
                                <CFormInput placeholder="Type subject name to search" aria-label="Username" aria-describedby="addon-wrapping" style={{ width: '20px' }} />
                                <CIcon icon={cilSearch} customClassName="nav-icon" style={{ width: '20px', transform: 'translate(-30px, 0px)', zIndex: '10' }} />
                            </CInputGroup>
                        </CCol>
                        <CCol sm className="offset-sm-3">
                            <button
                                className="btn2 btn-secondary"
                                style={{ backgroundColor: '#6c757d', float: 'right' }}
                                onClick={() =>
                                    history.push(
                                        "/admin/sliders/new"
                                    )
                                }
                            >
                                Add new
                            </button>
                        </CCol>
                    </CRow>
                    <CTable
                        align="middle"
                        className="mb-0 border"
                        hover
                        responsive
                    >
                        <CTableHead color="light">
                            <CTableRow>
                                <CTableHeaderCell className="text-center">ID</CTableHeaderCell>
                                <CTableHeaderCell>Image</CTableHeaderCell>
                                <CTableHeaderCell>Slider</CTableHeaderCell>
                                <CTableHeaderCell>Due Date</CTableHeaderCell>
                                <CTableHeaderCell>Status</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">
                                    Action
                                </CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {listSlider?.map((item, index) => (
                                <CTableRow
                                    v-for="item in tableItems"
                                    key={index}
                                >
                                    <CTableDataCell
                                        className="text-center"
                                        style={{
                                            verticalAlign: "inherit",
                                        }}
                                    >
                                        {item?.id}
                                    </CTableDataCell>
                                    <CTableDataCell
                                        style={{
                                            verticalAlign: "inherit",
                                        }}
                                    >
                                        <CImage rounded thumbnail src={item?.image} width={200} height={200} />
                                    </CTableDataCell>
                                    <CTableDataCell
                                        style={{
                                            verticalAlign: "inherit",
                                        }}
                                    >
                                        <div>{item?.slider}</div>
                                    </CTableDataCell>
                                    <CTableDataCell
                                        style={{
                                            verticalAlign: "inherit",
                                        }}
                                    >
                                        <div>{item?.dueDate}</div>
                                    </CTableDataCell>
                                    <CTableDataCell
                                        style={{
                                            verticalAlign: "inherit",
                                        }}
                                    >
                                        <div>{item?.status}</div>
                                        <br />
                                        <div>{item?.createDate}</div>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center"
                                        style={{
                                            verticalAlign: "inherit",
                                        }}
                                    >
                                        <div>
                                            <CButton
                                                className="mb-2"
                                                style={{ width: "135px", height: '37px' }}
                                                color="primary"
                                                onClick={() =>
                                                    history.push(
                                                        "/admin/sliders/" +
                                                        item?.id
                                                    )
                                                }
                                            >
                                                Edit
                                            </CButton>
                                        </div>
                                        <div>
                                            <CButton
                                                className="mb-2"
                                                style={{ width: "135px", height: '37px' }}
                                                color="warning"
                                                onClick={() =>
                                                    handleUpdateStatus(item)
                                                }
                                            >{(() => {
                                                if (item?.status === 'Draft') {
                                                    return (<>Publish</>)
                                                } else if (item?.status === 'Published') {
                                                    return (<>Achieve</>)
                                                } else if (item?.status === 'Achieved') {
                                                    return (<>Publish</>)
                                                }
                                            })()}
                                            </CButton>
                                        </div>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                </div>
                <AppFooter />
            </div>
        </div>
    );
};

export default Sliders;
