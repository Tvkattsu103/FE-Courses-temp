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
import CIcon from "@coreui/icons-react";
import { cilPen } from "@coreui/icons";

function Subjects() {
  const columns = [
    {
      name: "ID",
      maxWidth: '10px',
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
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
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
      name: "Category",
      maxWidth: '200px',
      selector: (row) => (
        <>
          <div>
            {listCategory.map((category) => {
              return category?.setting_id === row.categoryId
                ? category.setting_title
                : ""
            })
            }
          </div>
        </>
      ),
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
          <CIcon icon={cilPen} />
        </CButton>
      ),
    },
  ];
  const [listSubject, setListSubject] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [category, setCategory] = useState("");
  const role = JSON.parse(Cookies.get("user"))?.role;
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const history = useHistory();
  const isNotAdmin = role !== "ROLE_ADMIN" ? true : false;

  const getAllSubject = async () => {
    try {
      const response = await adminApi.getAllSubject(name, status);
      setListSubject(response);
      console.log(response);
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 7000,
      });
    }
  };

  const getListCategory = async () => {
    try {
      const response = await adminApi.getListCategorySubject();
      setListCategory(response);
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
  }, [name, status, category]);

  useEffect(() => {
    getListCategory();
  }, []);

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
              style={{ margin: "0px 0px", width: "180px" }}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="">All Category</option>
              {listCategory?.map((item, index) => {
                return (
                  <option
                    key={index}
                    value={item?.setting_id}
                  >
                    {item?.setting_title}
                  </option>
                );
              })}
            </CFormSelect>
            <CFormSelect
              aria-label="Default select example"
              style={{ margin: "0px 10px", width: "140px" }}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option value="">All Status</option>
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
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
