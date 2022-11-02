import React, { useEffect, useState } from "react";
import {
    CButton,
} from "@coreui/react";
import { AppFooter, AppHeader, AppSidebar } from "../../components";
import { useHistory } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import Styles from "./style.module.scss";
import toast, { Toaster } from "react-hot-toast";
import DataTable from "react-data-table-component";
import CIcon from '@coreui/icons-react';
import { cilPen } from "@coreui/icons";

const Combo = () => {
    const [listCombo, setListCombo] = useState([]);
    const history = useHistory();

    const columns = [
        {
            name: "ID",
            selector: (row) => row?.id,
            maxWidth: '10px',
            sortable: true,
        },
        {
            name: "Title",
            selector: (row) => row?.title,
            sortable: true,
        },
        {
            name: "Description",
            selector: (row) => row?.description,
            sortable: true,
        },
        {
            name: "Action",
            maxWidth: '140px',
            selector: (row) => (
                <>
                    {(() => {
                        return (<CButton
                            href={`/react/admin/combo/${row?.id}`} color="primary"
                        >
                            <CIcon icon={cilPen} />
                        </CButton>)
                    })()}

                    <br />
                </>

            ),
        },
    ];

    const getListCombo = async () => {
        try {
            const response = await adminApi.getAllCombo();
            setListCombo(response);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    useEffect(() => {
        getListCombo();
    }, []);

    return (
        <div>
            <AppSidebar />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />

                <div className={Styles.searchParams}>
                    <div className={Styles.showEntry}>
                    </div>
                    <div className={Styles.inputSearch}>
                        <button
                            style={{ backgroundColor: "#7367f0", border: "none", float: 'right' }}
                            onClick={() =>
                                history.push(
                                    "/admin/combo/create"
                                )
                            }
                        >
                            Create New Combo
                        </button>
                    </div>
                </div>
                <div className="body flex-grow-1 px-3">
                    <DataTable columns={columns} data={listCombo} pagination />
                </div>

                <AppFooter />
            </div>
        </div>
    );
};

export default Combo;
