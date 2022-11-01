import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// Images
import logo from "../../../images/logo-white.png";
import {
  CAlert,
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
} from "@coreui/react";
import { useState } from "react";
import { userApi } from "../../../api/userApi";
import toast, { Toaster } from "react-hot-toast";

function Footer1(props) {
  const [listCategory, setListCategory] = useState([]);
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [categoryId, setCategoryId] = useState();
  const [comment, setComment] = useState();
  const [alertMessage, setAlertMessage] = useState("Please input field");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("primary");

  const getListCategory = async () => {
    try {
      const response = await userApi.getListCategoryWebContact();
      setListCategory(response);
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 7000,
      });
    }
  };

  const handleSendContact = async () => {
    try {
      const params = {
        fullName: fullname,
        email: email,
        categoryId: categoryId,
        phoneNumber: phone,
        message: comment,
      };

      const response = await userApi.sendContact(params);
      console.log(response);
      setAlertMessage(response?.message);
      setAlertVisible(true);
      setAlertType("success");
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 7000,
      });
    }
  };

  useState(() => {
    getListCategory();
  }, [])

  return (
    <>
      <footer>
        <div className="footer-top">
          <div className="pt-exebar">
            <div className="container">
              <div className="d-flex align-items-stretch">
                <div className="pt-logo mr-auto">
                  <Link to="/">
                    <img src={logo} alt="" />
                  </Link>
                </div>
                <div className="pt-social-link">
                  <ul className="list-inline m-a0">
                    <li>
                      <Link to="#" className="btn-link">
                        <i className="fa fa-facebook"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="btn-link">
                        <i className="fa fa-twitter"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="btn-link">
                        <i className="fa fa-linkedin"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="btn-link">
                        <i className="fa fa-google-plus"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="pt-btn-join">
                  <Link to="/contact-1" className="btn">
                    Join Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12 footer-col-4">
                <h5 style={{ color: "white" }}>Education & Courses</h5>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.4854095316514!2d105.52487561540214!3d21.01325499368218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345b465a4e65fb%3A0xaae6040cfabe8fe!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBGUFQ!5e0!3m2!1svi!2s!4v1665753625139!5m2!1svi!2s"
                  width={"100%"}
                  height={300}
                ></iframe>
              </div>
              <div className="col-12 col-lg-6 col-md-7 col-sm-12">
                <CForm>
                  <h5 className="footer-title">Contact Us</h5>
                  <CAlert color={alertType} visible={alertVisible}>
                    {alertMessage}
                  </CAlert>
                  <div className="row pb-3">
                    <div className="w-50">
                      <CFormInput
                        type="text"
                        id="floatingInput"
                        placeholder="name@example.com"
                        floatingLabel="Fullname"
                        onChange={(e) => setFullname(e.target.value)}
                      />
                    </div>
                    <div className="w-50">
                      <CFormInput
                        type="text"
                        id="floatingInput"
                        floatingLabel="Phone Number"
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="name@example.com"
                      />
                    </div>
                  </div>
                  <div className="row pb-3">
                    <div className="w-50">
                      <CFormSelect
                        aria-label="Default select example"
                        style={{ height: "55px" }}
                        placeholder="Category"
                        onChange={(e) => {
                          //   dispatch(setValueFilter(e.target.value));
                          setCategoryId(e.target.value);
                        }}
                      >
                        <option value="">Select Category</option>
                        {listCategory.map((item, index) => {
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
                    </div>
                    <div className="w-50">
                      <CFormInput
                        type="email"
                        id="floatingInput"
                        placeholder="name@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                        floatingLabel="Email"
                      />
                    </div>
                  </div>
                  <CFormTextarea
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    floatingLabel="Message"
                    onChange={(e) => setComment(e.target.value)}
                  ></CFormTextarea>
                  <div className="p-2"></div>
                  <CButton
                    style={{ float: "right" }}
                    onClick={() => handleSendContact()}
                    className="mb-3"
                  >
                    Send
                  </CButton>
                  <div className="p-2"></div>
                </CForm>
              </div>
              {/* <div className="col-12 col-lg-3 col-md-5 col-sm-12 footer-col-4">
                                <div className="widget widget_gallery gallery-grid-4">
                                    <h5 className="footer-title">
                                        Our Gallery
                                    </h5>
                                    <GalleryImg />
                                </div>
                            </div> */}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                {" "}
                © 2021 <span className="text-white">EduChamp</span> All Rights
                Reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer1;
