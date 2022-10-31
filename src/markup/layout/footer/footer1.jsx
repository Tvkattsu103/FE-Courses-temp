import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import GoogleMapReact from "google-map-react";

// Images
import logo from "../../../images/logo-white.png";
import galleryPic1 from "../../../images/gallery/pic1.jpg";
import galleryPic2 from "../../../images/gallery/pic2.jpg";
import galleryPic3 from "../../../images/gallery/pic3.jpg";
import galleryPic4 from "../../../images/gallery/pic4.jpg";
import galleryPic5 from "../../../images/gallery/pic5.jpg";
import galleryPic6 from "../../../images/gallery/pic6.jpg";
import galleryPic7 from "../../../images/gallery/pic7.jpg";
import galleryPic8 from "../../../images/gallery/pic8.jpg";
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

const content = [
  {
    thumb: galleryPic1,
  },
  {
    thumb: galleryPic2,
  },
  {
    thumb: galleryPic3,
  },
  {
    thumb: galleryPic4,
  },
  {
    thumb: galleryPic5,
  },
  {
    thumb: galleryPic6,
  },
  {
    thumb: galleryPic7,
  },
  {
    thumb: galleryPic8,
  },
];

const options = {
  settings: {
    overlayColor: "rgba(0,0,0,0.9)",
    backgroundColor: "#FDC716",
    slideAnimationType: "slide",
  },
  buttons: {
    backgroundColor: "#f7b205",
    iconColor: "rgba(255, 255, 255, 1)",
    showDownloadButton: false,
    showAutoplayButton: false,
    showThumbnailsButton: false,
  },
  caption: {
    captionColor: "#232eff",
    captionFontFamily: "Raleway, sans-serif",
    captionFontWeight: "300",
    captionTextTransform: "uppercase",
  },
};

function GalleryImg() {
  return (
    <>
      <SimpleReactLightbox>
        <SRLWrapper options={options}>
          <ul className="magnific-image">
            {content.map((item, index) => (
              <li key={index}>
                <img src={item.thumb} alt="" />
              </li>
            ))}
          </ul>
        </SRLWrapper>
      </SimpleReactLightbox>
    </>
  );
}
const AnyReactComponent = ({ text }) => <div>{text}</div>;
function Footer1(props) {
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [comment, setComment] = useState();
  const [alertMessage, setAlertMessage] = useState("Please input field");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("primary");
  const defaultProps = {
    center: { lat: 21.027763, lng: 105.83416 },
    zoom: 18,
  };
  const handleSendContact = async () => {
    try {
      const params = {
        fullName: fullname,
        email: email,
        address: address,
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
                {/* <div style={{ height: "240px", width: "100%" }}>
                  <h5 style={{ color: "white" }}>Education & Courses</h5>
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: "" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                  >
                    <AnyReactComponent
                      lat={21.027763}
                      lng={105.83416}
                      text="My Marker"
                    />
                  </GoogleMapReact>
                </div> */}
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
                        }}
                      >
                        <option>Category</option>
                        <option value="1">Math</option>
                        <option value="2">English</option>
                        <option value="3">Photography</option>
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
