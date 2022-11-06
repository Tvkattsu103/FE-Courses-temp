import React, { useEffect, useState } from "react";
import {
    CButton,
    CFormSelect,
} from "@coreui/react";
import { AppFooter, AppHeader, AppSidebar } from "../../components";
import { useHistory } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import Styles from "./style.module.scss";
import toast, { Toaster } from "react-hot-toast";
import DataTable from "react-data-table-component";
import CIcon from '@coreui/icons-react';
import { cilLibraryAdd, cilPen } from "@coreui/icons";

const Settings = () => {
    const [listSetting, setListSetting] = useState([]);
    const [status, setStatus] = useState("");
    const history = useHistory();

    const columns = [
        {
            name: "ID",
            selector: (row) => row?.setting_id,
            minWidth: '10px',
            maxWidth: '40px',
            sortable: true,
        },
        {
            name: "Description",
            selector: (row) => row?.desciption,
            sortable: true,
        },
        {
            name: "Display Order",
            selector: (row) => row?.display_order,
            sortable: true,
        },
        {
            name: "Title",
            selector: (row) => row?.setting_title,
            sortable: true,
        },
        {
            name: "Value",
            selector: (row) => row?.setting_value,
            sortable: true,
        },
        {
            name: "Status",
            maxWidth: '160px',
            selector: (row) => (
                <div className={`${row?.status ? Styles.active : Styles.inactive}`}>
                    {row.status ? "Active" : "Deactivate"}
                </div>
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
                            href={`/react/admin/settings/${row?.setting_id}`} color="primary"
                        >
                            <CIcon icon={cilPen} />
                        </CButton>)
                    })()}

                    <br />
                </>

            ),
        },
    ];

    const getListSetting = async () => {
        try {
            // const settingRequest = {
            //     "type_id": "1",
            //     "top": 4,
            //     "skip": 1,
            // };
            const response = await adminApi.getAllSetting();
            setListSetting(response);
            console.log(response);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    useEffect(() => {
        getListSetting();
    }, [status]);

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
                            <option value="">All Status</option>
                            <option value={true}>Active</option>
                            <option value={false}>Deactivate</option>
                        </CFormSelect>
                    </div>
                    <div className={Styles.inputSearch}>
                        <button
                            style={{ backgroundColor: "#7367f0", border: "none", float: 'right' }}
                            onClick={() =>
                                history.push(
                                    "/admin/settings/create"
                                )
                            }
                        >
                            <CIcon icon={cilLibraryAdd} />
                        </button>
                    </div>
                </div>
                <div className="body flex-grow-1 px-3">
                    <DataTable columns={columns} data={listSetting} pagination />
                </div>

                <AppFooter />
            </div>
        </div>
    );
};

export default Settings;
