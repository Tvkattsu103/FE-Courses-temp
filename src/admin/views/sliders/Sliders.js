import React, { useEffect, useState } from "react";
import {
    CButton,
    CFormSelect,
    CFormInput,
} from "@coreui/react";
import { AppFooter, AppHeader, AppSidebar } from "../../components";
import { Link, useHistory } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import Styles from "./style.module.scss";
import toast, { Toaster } from "react-hot-toast";
import DataTable from "react-data-table-component";
import CIcon from '@coreui/icons-react';
import { cilPen } from "@coreui/icons";

const Sliders = () => {
    const [listSlider, setListSlider] = useState([]);
    const [isModify, setIsModify] = useState(false);
    const [status, setStatus] = useState("");
    const [validTo, setValidTo] = useState("");
    const history = useHistory();

    const columns = [
        {
            name: "ID",
            selector: (row) => row?.id,
            maxWidth: '10px',
            sortable: true,
        },
        {
            name: "ImageUrl",
            selector: (row) => (
                <img
                    src={row?.imageUrl}
                    width={120}
                    alt='thumbnail'
                />
            ),
            sortable: false,
        },
        {
            name: "Valid To",
            maxWidth: '160px',
            selector: (row) => row?.validTo.substring(0,10),
            sortable: true,
        },
        {
            name: "Status",
            maxWidth: '160px',
            selector: (row) => (
                <>
                    <div className={` ${row?.status !== 2 ? Styles.active : Styles.inactive}`} style={{ textAlign: 'center', width: '100px' }}>
                        {(() => {
                            if (row?.status === 0) {
                                return (<>Draft</>)
                            } else if (row?.status === 1) {
                                return (<>Published</>)
                            } else if (row?.status === 2) {
                                return (<>Achieved</>)
                            }
                        })()}
                    </div>
                    <br />
                    <div>{row?.createDate}</div>
                </>
            ),
            sortable: true,
        },
        {
            name: "Action",
            maxWidth: '140px',
            selector: (row) => (
                <>
                    {(() => {
                        return (<CButton
                            className="mb-2"
                            href={`/react/admin/sliders/${row?.id}`} color="primary"
                        >
                            <CIcon icon={cilPen}/>
                        </CButton>)
                    })()}

                    <br />
                    <CButton
                        color={row?.status === 1 ? "danger" : "warning"}
                        onClick={() =>
                            handleUpdateStatus(row, 1)
                        }
                    >{(() => {
                        if (row?.status === 0) {
                            return (<>Publish</>)
                        } else if (row?.status === 1) {
                            return (<>Achieve</>)
                        } else if (row?.status === 2) {
                            return (<>Publish</>)
                        }
                    })()}
                    </CButton>
                </>

            ),
        },
    ];

    const handleUpdateStatus = async (row, type) => {
        let id = row.id;
        let status = row.status;
        let statusChange = -1;
        if (status === 0) {
            statusChange = 1;
        } else if (status === 1) {
            statusChange = 2;
        } else if (status === 2) {
            statusChange = 1;
        }
        try {
            const params = {
                status: statusChange,
            };

            const response = await adminApi.updateSlider(id, null, params);
            setIsModify(!isModify);
            toast.success(response?.message, {
                duration: 2000,
            });
        } catch (responseError) {
            toast.error(responseError, {
                duration: 2000,
            });
        }
    }

    const getListSlider = async () => {
        try {
            const response = await adminApi.getAllSlider(status, validTo);
            setListSlider(response);
        } catch (responseError) {
            console.log("error:", responseError);
        }
    };

    useEffect(() => {
        getListSlider();
    }, [isModify, status]);

    return (
        <div>
            <AppSidebar />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />

                <div className={Styles.searchParams}>
                    <div className={Styles.showEntry}>
                        <CFormSelect
                            aria-label="Default select example"
                            style={{ margin: "0px 10px", width: "140px" }}
                            onChange={(e) => {
                                setStatus(e.target.value);
                            }}
                        >
                            <option >Status</option>
                            <option value="0">Draft</option>
                            <option value="1">Published</option>
                            <option value="2">Achieved</option>
                        </CFormSelect>
                    </div>
                    <div className={Styles.inputSearch}>
                        <button
                            style={{ backgroundColor: "#7367f0", border: "none", float: 'right' }}
                            onClick={() =>
                                history.push(
                                    "/admin/sliders/create"
                                )
                            }
                        >
                            Create New Slider
                        </button>
                    </div>
                </div>
                <div className="body flex-grow-1 px-3">
                    <DataTable columns={columns} data={listSlider} pagination />
                </div>

                <AppFooter />
            </div>
        </div>
    );
};

export default Sliders;
