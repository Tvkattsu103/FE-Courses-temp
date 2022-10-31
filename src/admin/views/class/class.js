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
      name: "Package",
      selector: (row) => row.packages,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <div className={`${row?.active ? Styles.active : Styles.inactive}`}>
          {row.status ? "Active" : "Inactive"}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <CButton href={`/react/admin/class/${row?.id}`} color="primary">
          Edit
        </CButton>
      ),
    },
  ];
  const [status, setStatus] = useState("");
  const [size, setSize] = useState();
  const [listClass, setListClass] = useState([]);
  const [packages, setPackages] = useState("");
  const [name, setName] = useState("");
  const role = JSON.parse(Cookies.get("user"))?.role;
  const history = useHistory();
  const isNotAdminOrManager =
    role !== "ROLE_ADMIN" && role !== "ROLE_MANAGER" ? true : false;

  const getAllClass = async () => {
    try {
      const response = await adminApi.getAllClass(name, status);
      setListClass(response);
      console.log(response);
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
            <div>Show</div>
            <CFormSelect
              aria-label="Default select example"
              style={{ height: "35px", margin: "0px 10px" }}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            >
              <option></option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </CFormSelect>
            <div>entries</div>
          </div>
          <div className={Styles.inputSearch}>
            <label>Status</label>
            <CFormSelect
              aria-label="Default select example"
              style={{ margin: "0px 10px", width: "120px" }}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option value=""></option>
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </CFormSelect>
            <CFormInput
              type="text"
              id="exampleInputPassword1"
              placeholder="Search..."
              onChange={onSearch}
              style={{ width: "550px" }}
            />
            <button style={{ backgroundColor: "#7367f0", border: "none" }}
              onClick={() =>
                history.push(
                  "/admin/class/create"
                )
              }
            >
              Create New Class
            </button>
          </div>
        </div>
        {/* <CInputGroup className="px-3 pb-3 d-flex justify-content-between">
          <CButton
            type="button"
            color="primary"
            id="button-addon2"
            disabled={isNotAdminOrManager}
            href="/react/admin/class/create"
          >
            Create New Class
          </CButton>
        </CInputGroup> */}
        <div className="body flex-grow-1 px-3">
          <DataTable columns={columns} data={listClass} pagination />
        </div>
        <AppFooter />
      </div>
    </div>
  );
}

export default Class;
