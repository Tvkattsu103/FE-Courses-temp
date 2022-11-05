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
import { cilLibraryAdd, cilPen } from "@coreui/icons";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function Subjects() {
  const columns = [
    {
      name: "ID",
      minWidth: '10px',
      maxWidth: '40px',
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
      maxWidth: '120px',
      selector: (row) => (
        <div className={`${row?.status ? Styles.active : Styles.inactive}`}>
          {row.status ? "Active" : "Deactivate"}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Action",
      minWidth: '210px',
      selector: (row, index) => (
        <div className="my-2 d-flex justify-content-space-between">
          <CButton
            href={"/react/admin/subjects/" + row?.id}
            style={{ width: "auto" }}
            color="primary"
          >
            <CIcon icon={cilPen} />
          </CButton>
          <div className="p-1"></div>
          <CButton
            color="warning"
            style={{ width: "auto", textAlign: 'center' }}
            onClick={() => submit(row)}
          >
            {row?.status ? "Deactivate" : "Active"}
          </CButton>
        </div>
      ),
    },
  ];
  const [listSubject, setListSubject] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [category, setCategory] = useState("");
  const role = JSON.parse(Cookies.get("user"))?.role;
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [isModify, setIsModify] = useState(false);
  const history = useHistory();
  const isNotAdmin = role !== "ROLE_ADMIN" ? true : false;

  const getAllSubject = async () => {
    try {
      const response = await adminApi.getAllSubject(name, status);
      setListSubject(response.data);
      console.log(response);
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 7000,
      });
    }
  };

  const submit = (row) => {

    confirmAlert({
      title: 'Confirm to change status',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleUpdateActiveSubject(row)
        },
        {
          label: 'No',
          //onClick: () => alert('Click No')
        }
      ]
    });
  }

  const handleUpdateActiveSubject = async (row) => {
    try {
      const params = {
        status: !row?.status,
      };
      const response = await adminApi.updateSubject(params, row?.id);
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
  }, [isModify, name, status, category]);

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
                  "/admin/subjects/create"
                )
              }
            >
              <CIcon icon={cilLibraryAdd} />
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
