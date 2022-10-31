import React, { useEffect, useState, useRef } from "react";
import { CButton } from "@coreui/react";
import { AppFooter, AppHeader, AppSidebar } from "../../components";
import { adminApi } from "../../../api/adminApi";
import toast, { Toaster } from "react-hot-toast";
import Styles from "./style.module.scss";
import DataTable from "react-data-table-component";
import { AiOutlineUser, AiOutlineDatabase } from "react-icons/ai";
import { FaDatabase } from "react-icons/fa";
import {
  CFormInput,
  CFormSelect,
} from "@coreui/react";

const Users = () => {
  const [active, setActive] = useState();
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setActive("");
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const columns = [
    {
      name: "ID",
      selector: (row) => row?.id,
      sortable: true,
    },
    {
      name: "User",
      selector: (row) => row?.username || row?.email,
      sortable: true,
    },
    {
      name: "Fullname",
      selector: (row) => row?.fullname,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row?.phoneNumber,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => (
        <div className="d-flex align-items-center justify-content-center">
          {row?.role?.replace("ROLE_", "") === "ADMIN" && (
            <AiOutlineDatabase color="#EA5455" />
          )}
          {row?.role?.replace("ROLE_", "") === "MANAGER" ||
          row?.role?.replace("ROLE_", "") === "EXPERT" ? (
            <FaDatabase color="#28C76F" />
          ) : (
            <></>
          )}
          {row?.role?.replace("ROLE_", "") === "GUEST" && (
            <AiOutlineUser color="#7367F0" />
          )}
          <div style={{ marginLeft: "5px" }}>
            {" "}
            {row?.role?.replace("ROLE_", "")}
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <div className="d-flex align-items-center justify-content-center">
          <div className={`${row?.active ? Styles.active : Styles.inactive}`}>
            <strong>{row?.active ? "Active" : "Inactive"}</strong>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row, index) => (
        <div className="my-2 d-flex justify-content-space-between">
          <CButton
            href={"/react/admin/users/" + row?.id}
            style={{ width: "100px" }}
            color="primary"
          >
            Edit
          </CButton>
          <div className="p-1"></div>
          <CButton
            color="warning"
            style={{ width: "100px" }}
            onClick={() => handleUpdateActiveUser(row)}
          >
            {row?.active ? "Deactive" : "Active"}
          </CButton>
        </div>
      ),
    },
  ];
  const [listUser, setListUser] = useState([]);
  const [isModify, setIsModify] = useState(false);
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [size, setSize] = useState(10);
  const [name, setName] = useState("");
  const getListUser = async () => {
    try {
      const response = await adminApi.getListUser(name, status, role, size);
      setListUser(response);
      console.log(response);
    } catch (responseError) {
      console.log(responseError);
    }
  };
  const handleUpdateActiveUser = async (e) => {
    try {
      const params = {
        username: e?.username,
        status: e?.active,
      };
      const response = await adminApi.updateActiveUser(params);
      toast.success(response?.message, {
        duration: 2000,
      });
      setIsModify(!isModify);
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 7000,
    });
    }
  };
  useEffect(() => {
    getListUser();
  }, [isModify, name, size, status, role]);
  const onSearchUser = async (e) => {
    setName(e.target.value)
    // try {
    //   const res = await adminApi.getListUser(
    //     e.target.value,
    //     status,
    //     role,
    //     size
    //   );
    //   setListUser(res);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <div>
      <AppSidebar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className={Styles.filters}>
          <div style={{ marginBottom: "10px" }}>Filters</div>
          <div className={Styles.listFilter}>
            <div className={Styles.filterItem}>
              <label>Role</label>
              <CFormSelect
                aria-label="Default select example"
                style={{ height: "50px" }}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option></option>
                <option value="ROLE_ADMIN">ADMIN</option>
                <option value="ROLE_GUEST">GUEST</option>
                <option value="ROLE_MANAGER">MANAGER</option>
              </CFormSelect>
            </div>
            <div className={Styles.filterItem}>
              <label>Status</label>
              <CFormSelect
                aria-label="Default select example"
                style={{ height: "50px" }}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
               <option value=""></option>
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </CFormSelect>
            </div>
          </div>
        </div>
        <div className={Styles.searchParams}>
          <div className={Styles.showEntry}>
            <div>Show</div>
            <CFormSelect
              aria-label="Default select example"
              style={{ height: "35px", margin: "0px 10px" }}
              onChange={(e) => {
                setSize(e.target.value)
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
            <CFormInput
              type="text"
              id="exampleInputPassword1"
              placeholder="Search..."
              onChange={onSearchUser}
              style={{ width: "550px" }}
            />
            <button style={{ backgroundColor: "#7367f0", border: "none" }}>
              Add User
            </button>
          </div>
        </div>
        <div className="body flex-grow-1 px-3">
          <DataTable columns={columns} data={listUser} pagination />
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default Users;
