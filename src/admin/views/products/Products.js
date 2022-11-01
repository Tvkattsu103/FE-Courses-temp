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
import { cilPen } from "@coreui/icons";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Products = () => {
    const [listProduct, setListProduct] = useState([]);
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
            selector: (row) => new Date(row?.validTo).toLocaleDateString(),
            sortable: true,
        },
        {
            name: "Status",
            maxWidth: '160px',
            selector: (row) => (
                <div className={`${row?.status ? Styles.active : Styles.inactive}`}>
                    {row.status ? "Active" : "Inactive"}
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
                            className="mb-2"
                            href={`/react/admin/products/${row?.id}`} color="primary"
                        >
                            <CIcon icon={cilPen} />
                        </CButton>)
                    })()}

                    <br />
                    <CButton
                        color={row?.status === 1 ? "danger" : "warning"}
                        onClick={() =>
                            submit(row)
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

    const handleUpdateStatus = async (row) => {
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

            const response = await adminApi.updateProduct(id, params);
            setIsModify(!isModify);
            toast.success(response?.message, {
                duration: 2000,
            });
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    }

    const submit = (row) => {

        confirmAlert({
            title: 'Confirm to change status',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleUpdateStatus(row)
                },
                {
                    label: 'No',
                    //onClick: () => alert('Click No')
                }
            ]
        });
    }


    const getListProduct = async () => {
        try {
            const response = await adminApi.getAllProduct();
            setListProduct(response);
            console.log(response);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    useEffect(() => {
        getListProduct();
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
                                    "/admin/products/create"
                                )
                            }
                        >
                            Create New Product
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
