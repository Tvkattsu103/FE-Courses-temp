import {
  CButton,
  CFormInput,
  CFormSelect,
} from "@coreui/react";
import Styles from "./style.module.scss";
import Cookies from "js-cookie";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import toast, { Toaster } from "react-hot-toast";
import { adminApi } from "../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../../components";
import { FaDatabase } from "react-icons/fa";
import { useHistory } from "react-router-dom";

function Subjects() {
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Subject Code",
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    // {
    //   name: "Price",
    //   selector: (row) => row.price,
    //   sortable: true,
    // },
    {
      name: "Manager",
      selector: (row) => (
        <>
          {" "}
          <FaDatabase color="#28C76F" style={{ marginRight: "5px" }} />
          {row.manager?.username}
        </>
      ),
      sortable: true,
    },
    {
      name: "Expert",
      selector: (row) => row.expert?.username,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <div className={`${row?.status ? Styles.active : Styles.inactive}`}>
          {row.status ? "Active" : "Inactive"}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <CButton href={`/react/admin/subjects/${row?.id}`} color="primary">
          Edit
        </CButton>
      ),
    },
  ];
  const [listSubject, setListSubject] = useState([]);
  const [nameSearch, setNameSearch] = useState();
  const [codeSearch, setCodeSearch] = useState();
  console.log(Cookies?.get("access_token"));
  const role = JSON.parse(Cookies.get("user"))?.role;
  const [status, setStatus] = useState('');
  const [size, setSize] = useState(10);
  const [name, setName] = useState('');
  const history = useHistory();
  const isNotAdmin = role !== "ROLE_ADMIN" ? true : false;

  const getAllSubject = async () => {
    try {
      const response = await adminApi.getAllSubject(name, status);
      setListSubject(response);
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
    getAllSubject();
  }, [name, status]);

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
              <option value=""></option>
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
                //   dispatch(setValueFilter(e.target.value));
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
              style={{ width: "550px" }}
              onChange={onSearch}
            />
            <button style={{ backgroundColor: "#7367f0", border: "none" }}
              onClick={() =>
                history.push(
                  "/admin/subjects/create"
                )
              }
            >
              Create New Subject
            </button>
          </div>
        </div>
        <div className="body flex-grow-1 px-3">
          <DataTable columns={columns} data={listSubject} pagination />
        </div>
        <AppFooter />
      </div>
    </div>
  );
}

export default Subjects;
