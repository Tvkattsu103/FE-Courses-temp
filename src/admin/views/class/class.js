import { cilLibraryAdd, cilNoteAdd, cilPen, cilPlus } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CFormInput, CFormSelect } from "@coreui/react";
import Cookies from "js-cookie";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../../components";
import Styles from "./style.module.scss";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function Class() {
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Class Code",
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "Package",
      selector: (row) => row.packages,
      sortable: true,
    },
    {
      name: "Date From",
      selector: (row) => new Date(row.dateFrom).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Date To",
      selector: (row) => new Date(row.dateTo).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Trainer",
      selector: (row) => row.trainer?.username,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <div className={`${row?.status ? Styles.active : Styles.inactive}`}>
          {row.status ? "Active" : "Deactivate"}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <CButton href={`/react/admin/class/${row?.id}`} color="primary">
          <CIcon icon={cilPen} />
        </CButton>
      ),
    },
  ];
  const [status, setStatus] = useState("");
  const [listClass, setListClass] = useState([]);
  const [name, setName] = useState("");
  const role = JSON.parse(Cookies.get("user"))?.role;
  const history = useHistory();
  const isNotAdminOrManager =
    role !== "ROLE_ADMIN" && role !== "ROLE_MANAGER" ? true : false;

  const getAllClass = async () => {
    try {
      const response = await adminApi.getAllClass(name, status);
      setListClass(response.data);
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 7000,
      });
    }
  };
  const onSearch = async (e) => {
    setName(e.target.value);
  };
  useEffect(() => {
    getAllClass();
  }, [status, name]);

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
                  "/admin/class/create"
                )
              }
            >
              <CIcon icon={cilLibraryAdd}/>
            </button>
          </div>
        </div>
        <div className="body flex-grow-1 px-3">
          <DataTable columns={columns} data={listClass} pagination />
        </div>
        <AppFooter />
      </div>
    </div>
  );
}

export default Class;
