import React, { useEffect, useState } from "react";
import {
    CButton,
    CFormSelect,
    CFormInput,
} from "@coreui/react";
import { AppFooter, AppHeader, AppSidebar } from "../../components";
import { useHistory } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import toast, { Toaster } from "react-hot-toast";
import Styles from "./style.module.scss";
import DataTable from "react-data-table-component";
import CIcon from '@coreui/icons-react';
import { cilPen } from "@coreui/icons";

const Posts = () => {
    const [listPost, setListPost] = useState([]);
    const [isModify, setIsModify] = useState(false);
    const [status, setStatus] = useState("");
    const [title, setTitle] = useState("");
    const history = useHistory();

    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            maxWidth: '10px',
            sortable: true,
        },
        {
            name: "Thumbnail",
            maxWidth: '150px',
            selector: (row) => (
                <img
                    src={row.thumnailUrl}
                    width={120}
                    alt='thumbnail'
                />
            ),
            sortable: false,
        },
        {
            name: "Post title",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Brief info",
            selector: (row) => {
                let brief = row.body;
                brief = brief.substring(3, brief.indexOf("</p>"));
                while (brief.search("</") !== -1 || brief.search("<") !== -1) {
                    brief = brief.replace("</", " ");
                    brief = brief.replace("<", "");
                }
                while (brief.search("strong") !== -1) {
                    brief = brief.replace("strong>", "");
                }
                return brief;
            },
            sortable: true,
        },
        {
            name: "Status",
            maxWidth: '160px',
            selector: (row) => (
                <>
                    <div className={` ${row?.status !== 4 ? Styles.active : Styles.inactive}`} style={{ textAlign: 'center' }}>
                        {/* {row.status ? "Active" : "Inactive"} */}
                        {(() => {
                            if (row?.status === 0) {
                                return (<>Draft</>)
                            } else if (row?.status === 1) {
                                return (<>Submitted</>)
                            } else if (row?.status === 2) {
                                return (<>Published</>)
                            } else if (row?.status === 3) {
                                return (<>Achieved</>)
                            } else if (row?.status === 4) {
                                return (<>Rejected</>)
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
                        if (row?.status === 1) {
                            return (<CButton
                                className="mb-2"
                                color="success"
                                onClick={() =>
                                    handleUpdateStatus(row, 0)
                                }
                            >
                                Approve
                            </CButton>)
                        } else {
                            return (<CButton
                                className="mb-2"
                                href={`/react/admin/posts/${row?.id}`} color="primary"
                            >
                                <CIcon icon={cilPen}/>
                            </CButton>)
                        }
                    })()}

                    <br />
                    <CButton
                        // style={{ width: "135px", height: '37px' }}
                        color={row?.status === 1 ? "danger" : "warning"}
                        onClick={() =>
                            handleUpdateStatus(row, 1)
                        }
                    >{(() => {
                        if (row?.status === 0) {
                            return (<>Submit</>)
                        } else if (row?.status === 1) {
                            return (<>Reject</>)
                        } else if (row?.status === 2) {
                            return (<>Achieve</>)
                        } else if (row?.status === 3) {
                            return (<>Publish</>)
                        } else if (row?.status === 4) {
                            return (<>Submit</>)
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
            if (type === 0) {
                statusChange = 2;
            } else {
                statusChange = 4;
            }
        } else if (status === 2) {
            statusChange = 3;
        } else if (status === 3) {
            statusChange = 2;
        } else if (status === 4) {
            statusChange = 1;
        }
        console.log(id, status);
        try {
            const params = {
                status: statusChange,
            };

            const response = await adminApi.updatePost(params, id);
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

    const getListPost = async () => {
        try {
            const response = await adminApi.getAllPost(title, status);
            setListPost(Object.values(response));
            console.log(Object.values(response));
        } catch (responseError) {
            console.log(responseError);
        }
    };
    // const handleUpdateStatus = async (e) => {
    //     try {
    //         const params = {
    //             status: e.status,
    //         };
    //         if (e.status === 'Draft') {

    //         } else {

    //         }
    //         const response = await adminApi.updateStatusPost(params, e?.id);
    //         toast.success(response?.message, {
    //             duration: 2000,
    //         });
    //         setIsModify(!isModify);
    //     } catch (responseError) {
    //         toast.error(responseError, {
    //             duration: 2000,
    //         });
    //     }
    // };
    const onSearch = (e) => {
        setTitle(e.target.value);
    }

    const optionStatus = [
        { status: 0, label: "Draft" },
        { status: 1, label: "Submitted" },
        { status: 2, label: "Published" },
        { status: 3, label: "Achieved" },
        { status: 4, label: "Rejected" },
    ];

    useEffect(() => {
        getListPost();
    }, [isModify, status]);

    return (
        <div>
            <AppSidebar />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />

                <div className={Styles.searchParams}>
                    {/* <div className={Styles.showEntry}>
                        <div>Show</div>
                        <CFormSelect
                            aria-label="Default select example"
                            style={{ height: "35px", margin: "0px 10px" }}
                            onChange={(e) => {
                                // setSize(e.target.value);
                            }}
                        >
                            <option></option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </CFormSelect>
                        <div>entries</div>
                    </div> */}
                    <div className={Styles.showEntry}>
                        <CFormSelect
                            aria-label="Default select example"
                            style={{ margin: "0px 0px", width: "140px" }}
                            onChange={(e) => {
                                // setStatus(e.target.value);
                            }}
                        >
                            <option value="">Category</option>
                            <option value={true}>Active</option>
                            <option value={false}>Inactive</option>
                        </CFormSelect>
                        <CFormSelect
                            aria-label="Default select example"
                            style={{ margin: "0px 10px", width: "140px" }}
                            onChange={(e) => {
                                setStatus(e.target.value);
                            }}
                        >
                            <option >Status</option>
                            {optionStatus?.map((item, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={item?.status}
                                    >
                                        {item?.label}
                                    </option>
                                );
                            })}
                        </CFormSelect>
                        <CFormInput
                            type="text"
                            id="exampleInputPassword1"
                            placeholder="Search..."
                            onChange={onSearch}
                            style={{ width: "350px" }}
                        />
                    </div>
                    <div className={Styles.inputSearch}>
                        <button
                            style={{ backgroundColor: "#7367f0", border: "none", float: 'right' }}
                            onClick={() =>
                                history.push(
                                    "/admin/posts/create"
                                )
                            }
                        >
                            Create New Post
                        </button>
                    </div>
                </div>
                <div className="body flex-grow-1 px-3">
                    <DataTable columns={columns} data={listPost} pagination />
                </div>
                {/* <CTable
                    align="middle"
                    className="mb-0 border"
                    hover
                    responsive
                >
                    <CTableHead color="light">
                        <CTableRow>
                            <CTableHeaderCell className="text-center">ID</CTableHeaderCell>
                            <CTableHeaderCell>Thumbnail</CTableHeaderCell>
                            <CTableHeaderCell>Post Title</CTableHeaderCell>
                            <CTableHeaderCell>Brief Info</CTableHeaderCell>
                            <CTableHeaderCell>Status</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                                Action
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {listPost?.map((item, index) => (
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
                                    <CImage rounded thumbnail src={item?.thumnailUrl} width={200} height={200} />
                                </CTableDataCell>
                                <CTableDataCell
                                    style={{
                                        verticalAlign: "inherit",
                                    }}
                                >
                                    <div>{item?.post}</div>
                                </CTableDataCell>
                                <CTableDataCell
                                    style={{
                                        verticalAlign: "inherit",
                                    }}
                                >
                                    <div>{item?.briefInfo}</div>
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
                                        {(() => {
                                            if (item?.status === 'Submitted') {
                                                return (<CButton
                                                    className="mb-2"
                                                    style={{ width: "135px", height: '37px' }}
                                                    color="warning"
                                                    onClick={() =>
                                                        handleUpdateStatus(item)
                                                    }
                                                >
                                                    Approve
                                                </CButton>)
                                            } else {
                                                if (item?.status === 'Draft') {
                                                    return (<CButton
                                                        className="mb-2"
                                                        style={{ width: "135px", height: '37px' }}
                                                        color="primary"
                                                        onClick={() =>
                                                            history.push(
                                                                "/admin/posts/" +
                                                                item?.id
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </CButton>)
                                                }
                                            }
                                        })()}
                                    </div>
                                    <div>
                                        <CButton
                                            className="mb-2"
                                            style={{ width: "135px", height: '37px' }}
                                            color={item?.status === 'Submitted' ? "danger" : "warning"}
                                            onClick={() =>
                                                handleUpdateStatus(item)
                                            }
                                        >{(() => {
                                            if (item?.status === 'Draft') {
                                                return (<>Submit</>)
                                            } else if (item?.status === 'Submitted') {
                                                return (<>Reject</>)
                                            } else if (item?.status === 'Published') {
                                                return (<>Achieve</>)
                                            } else if (item?.status === 'Achieved') {
                                                return (<>Publish</>)
                                            } else if (item?.status === 'Rejected') {
                                                return (<>Submit</>)
                                            }
                                        })()}
                                        </CButton>
                                    </div>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable> */}

                <AppFooter />
            </div>
        </div>
    );
};

export default Posts;
