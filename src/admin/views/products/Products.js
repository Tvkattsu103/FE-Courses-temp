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

const Products = () => {
    const [listProduct, setListProduct] = useState([]);
    const [status, setStatus] = useState("");
    const history = useHistory();

    const columns = [
        {
            name: "ID",
            selector: (row) => row?.id,
            minWidth: '10px',
            maxWidth: '40px',
            sortable: true,
        },
        {
            name: "Title",
            selector: (row) => row?.title,
            sortable: true,
        },
        {
            name: "Excerpt",
            selector: (row) => row?.excerpt,
            sortable: true,
        },
        {
            name: "Duration",
            selector: (row) => row?.duration,
            sortable: true,
        },
        {
            name: "Description",
            selector: (row) => row?.description,
            sortable: true,
        },
        {
            name: "IsCombo",
            selector: (row) => (
                <div className={`${row?.combo ? Styles.active : Styles.inactive}`}>
                    {row.combo ? "True" : "False"}
                </div>
            ),
            sortable: true,
        },
        {
            name: "Price",
            selector: (row) => (
                <>
                    <span className="strikediag withpadding mr-4">{row?.listPrice}</span>
                    <span>{row?.sale_price}</span>
                </>
            ),
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
                            href={`/react/admin/products/${row?.id}`} color="primary"
                        >
                            <CIcon icon={cilPen} />
                        </CButton>)
                    })()}

                    <br />
                </>

            ),
        },
    ];

    const getListProduct = async () => {
        try {
            const response = await adminApi.getAllProduct();
            setListProduct(response);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    useEffect(() => {
        getListProduct();
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
                                    "/admin/products/create"
                                )
                            }
                        >
                            <CIcon icon={cilLibraryAdd}/>
                        </button>
                    </div>
                </div>
                <div className="body flex-grow-1 px-3">
                    <DataTable columns={columns} data={listProduct} pagination />
                </div>

                <AppFooter />
            </div>
        </div>
    );
};

export default Products;
