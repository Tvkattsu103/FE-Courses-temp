import React, { Component, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Tab } from "react-bootstrap";

// Layout
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer1";

// Elements
import Courses from "../elements/profile-content/courses";
import QuizResults from "../elements/profile-content/quiz-results";
import EditProfile from "../elements/profile-content/edit-profile";
import ChangePassword from "../elements/profile-content/change-password";

// Images
import bannerImg from "../../images/banner/banner1.jpg";
import profilePic1 from "../../images/profile/pic1.jpg";
import avatarProfile from '../../images/icon/avatar.svg'
import { userApi } from "../../api/userApi";

function Profile(props) {
    const [user, setUser] = useState({});
    const [state, setState] = useState(false);

    const getUsetProfile = async () => {
        try {
            const response = await userApi.getUserDetail();
            setUser(response);

        } catch (responseError) {
            console.log(responseError);
        }
    };

    useEffect(() => {
        getUsetProfile();
    }, [state]);

    return (
        <>
            <Header />
            <div className="page-content">
                <div
                    className="page-banner ovbl-dark"
                    style={{ backgroundImage: "url(" + bannerImg + ")" }}
                >
                    <div className="container">
                        <div className="page-banner-entry">
                            <h1 className="text-white">Profile</h1>
                        </div>
                    </div>
                </div>
                <div className="breadcrumb-row">
                    <div className="container">
                        <ul className="list-inline">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>Profile</li>
                        </ul>
                    </div>
                </div>

                <div className="content-block">
                    <div className="section-area section-sp1">
                        <div className="container">
                            <Tab.Container defaultActiveKey="tabOne">
                                <Tab.Content>
                                    <div className="row">
                                        <div className="col-lg-4 col-md-5 col-sm-12 m-b30">
                                            <div className="profile-bx text-center">
                                                <div className="user-profile-thumb ">
                                                    <img
                                                        src={
                                                            user?.avatar ?
                                                                user?.avatar.substr("http://localhost:8080/api/account/downloadFile/".length) !== "null"
                                                                    ? user?.avatar
                                                                    : avatarProfile : avatarProfile
                                                        }
                                                        className="w-100 h-100"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="profile-info">
                                                    <h4>{user?.fullname}</h4>
                                                    <span>{user?.email}</span>
                                                </div>
                                                <div className="profile-social">
                                                    <ul className="list-inline m-a0">
                                                        <li>
                                                            <Link to="#">
                                                                <i className="fa fa-facebook"></i>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="#">
                                                                <i className="fa fa-twitter"></i>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="#">
                                                                <i className="fa fa-linkedin"></i>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="#">
                                                                <i className="fa fa-google-plus"></i>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="profile-tabnav">
                                                    <Nav className="nav-tabs">
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="tabOne">
                                                                <i className="ti-book"></i>
                                                                Courses
                                                            </Nav.Link>
                                                        </Nav.Item>
                                                        {/* <Nav.Item>
                                                            <Nav.Link eventKey="tabTwo">
                                                                <i className="ti-bookmark-alt"></i>
                                                                Quiz Results
                                                            </Nav.Link>
                                                        </Nav.Item> */}
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="tabThree">
                                                                <i className="ti-pencil-alt"></i>
                                                                Edit Profile
                                                            </Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="tabFour">
                                                                <i className="ti-lock"></i>
                                                                Change Password
                                                            </Nav.Link>
                                                        </Nav.Item>
                                                    </Nav>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-8 col-md-7 col-sm-12 m-b30">
                                            <div className="profile-content-bx">
                                                <div className="tab-content">
                                                    <Tab.Pane eventKey="tabOne">
                                                        <Courses />
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="tabTwo">
                                                        <QuizResults />
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="tabThree">
                                                        <EditProfile
                                                            user={user}
                                                            stateChanger={
                                                                setState
                                                            }
                                                            state={state}
                                                        />
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="tabFour">
                                                        <ChangePassword />
                                                    </Tab.Pane>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Content>
                            </Tab.Container>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Profile;
