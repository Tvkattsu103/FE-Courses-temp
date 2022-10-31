import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sticky from "react-stickynode";

// Images
import logo from "../../../images/logo.png";
import adv from "../../../images/adv/adv.jpg";
import Cookies from "js-cookie";
import { CAvatar } from "@coreui/react";
import avatarProfile from '../../../images/icon/avatar.svg'
import { useSelector, useDispatch } from "react-redux";
import { setEditAvatar } from "../../../redux/reducers/user";

function Header() {
  const [id, setId] = useState(Cookies.get("id"));
  const [user, setUser] = useState(Cookies.get("user") === undefined ? Cookies.get("user") : JSON.parse(Cookies.get("user")));
  const [role, setRole] = useState(Cookies.get("roles"));
  const [isExpand, setIsExpand] = useState(false);
  const [acceptRole, setAcceptRole] = useState(["ROLE_ADMIN", "ROLE_SUPPORTER", "ROLE_MANAGER"]);

  const dispatch = useDispatch();
  const editAvatar = useSelector((state) => state.userReducers.editAvatar);

  useEffect(() => {
    var searchBtn = document.getElementById("quik-search-btn");
    var searchForm = document.querySelector(".nav-search-bar");
    var closeBtn = document.getElementById("search-remove");

    searchBtn.addEventListener("click", function () {
      searchForm.classList.add("show");
    });

    closeBtn.addEventListener("click", function () {
      searchForm.classList.remove("show");
    });

    // Mobile Menu sidebar function
    var btn = document.querySelector(".menuicon");
    var nav = document.querySelector(".menu-links");

    function toggleFunc() {
      btn.classList.toggle("open");
      nav.classList.toggle("show");
    }

    btn.addEventListener("click", toggleFunc);

    // Mobile Submenu open close function
    var navMenu = [].slice.call(
      document.querySelectorAll(".menu-links > ul > li")
    );
    for (var y = 0; y < navMenu.length; y++) {
      navMenu[y].addEventListener("click", function () {
        menuClick(this);
      });
    }

    function menuClick(current) {
      const active = current.classList.contains("open");
      navMenu.forEach((el) => el.classList.remove("open"));

      if (active) {
        current.classList.remove("open");
        console.log("active");
      } else {
        current.classList.add("open");
        console.log("close");
      }
    }
  }, [])

  useEffect(()=>{
    setUser(Cookies.get("user") === undefined ? Cookies.get("user") : JSON.parse(Cookies.get("user")));
    dispatch(setEditAvatar(false));
  },[editAvatar])

  const handleLogout = () => {
    Cookies.remove("id");
    Cookies.remove("username");
    Cookies.remove("access_token");
    Cookies.remove("roles");
    Cookies.remove("user");
    setId(undefined);
  }

  return (
    <>
      <header className="header1 rs-nav header-transp arent">
        <div className="top-bar">
          <div className="container">
            <div className="row d-flex justify-content-between align-items-center flex-nowrap">
              <div className="topbar-left w-auto">
                <ul>
                  <li>
                    <Link to="/faq-1">
                      <i className="fa fa-question-circle"></i>
                      Ask a Question
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="fa fa-envelope-o"></i>
                      Support@website.com
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="topbar-right w-auto d-flex">
                <ul className="d-flex align-items-center">
                  <li>
                    <select className="header-lang-bx">
                      <option data-icon="flag flag-uk">English UK</option>
                      <option data-icon="flag flag-us">English US</option>
                    </select>
                  </li>
                  {id ? (
                    <li className="is-logged-in">
                      <div
                        onClick={() =>
                          setIsExpand(!isExpand)
                        }
                        className="mb-0"
                      >
                        <CAvatar src={
                          user?.avatar ?
                            user?.avatar.substr("http://localhost:8080/api/account/downloadFile/".length) !== "null"
                              ? user?.avatar
                              : avatarProfile : avatarProfile}
                        />
                      </div>
                      <ul
                        className="sub-menu"
                        style={
                          isExpand
                            ? {
                              visibility: "visible",
                              opacity: "1",
                              width: '200px'
                            }
                            : {
                              visibility: "hidden",
                              opacity: "0",
                            }
                        }
                      >
                        {role === "ROLE_ADMIN" ? (
                          <Link to="/admin/dashboard">
                            <li>
                              Dashboard
                            </li>
                          </Link>
                        ) : role === "ROLE_SUPPORTER" ? (
                          <Link to="/admin/contact">
                            <li>
                              Admin
                            </li>
                          </Link>
                        ) : role === "ROLE_MANAGER" ? (
                          <Link to="/admin/subjects">
                            <li>
                              Admin
                            </li>
                          </Link>
                        ) : (
                          ""
                        )}
                        <Link to="/profile">
                          <li>
                            User Profile
                          </li>
                        </Link>
                        <Link to="/profile">
                          <li>
                            Change Password
                          </li>
                        </Link>
                        <li onClick={handleLogout}>Logout</li>
                      </ul>
                    </li>
                  ) : (
                    <div>
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                      <li>
                        <Link to="/register">Register</Link>
                      </li>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Sticky enabled={true} className="sticky-header navbar-expand-lg">
          <div className="menu-bar clearfix">
            <div className="container clearfix">
              {/* <!-- Header Logo ==== --> */}
              <div className="menu-logo">
                <Link to="/">
                  <img src={logo} alt="" />
                </Link>
              </div>
              {/* <!-- Mobile Nav Button ==== --> */}
              <button
                className="navbar-toggler collapsed menuicon justify-content-end"
                type="button"
                data-toggle="collapse"
                data-target="#menuDropdown"
                aria-controls="menuDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
              {/* <!-- Author Nav ==== --> */}
              <div className="secondary-menu">
                <div className="secondary-inner">
                  <ul>
                    <li>
                      <Link to="#" className="btn-link">
                        <i className="fa fa-facebook"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="btn-link">
                        <i className="fa fa-google-plus"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="btn-link">
                        <i className="fa fa-linkedin"></i>
                      </Link>
                    </li>
                    {/* <!-- Search Button ==== --> */}
                    <li className="search-btn">
                      <button
                        id="quik-search-btn"
                        type="button"
                        className="btn-link"
                      >
                        <i className="fa fa-search"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <!-- Navigation Menu ==== --> */}
              <div
                className="menu-links navbar-collapse collapse justify-content-start"
                id="menuDropdown"
              >
                <div className="menu-logo">
                  <Link to="/">
                    <img src={logo} alt="" />
                  </Link>
                </div>
                <ul className="nav navbar-nav">
                  <li className="active">
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="#">
                      Pages <i className="fa fa-chevron-down"></i>
                    </Link>
                    <ul className="sub-menu">
                      <li>
                        <Link to="/about">About</Link>
                      </li>
                      <li>
                        <Link to="/faq">FAQ's</Link>
                      </li>
                      <li>
                        <Link to="/portfolio">Portfolio</Link>
                      </li>
                      <li>
                        <Link to="/error-404">404 Page</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/events">Events</Link>
                  </li>
                  <li className="add-mega-menu">
                    <Link to="#">
                      Courses <i className="fa fa-chevron-down"></i>
                    </Link>
                    <ul className="sub-menu add-menu">
                      <li className="add-menu-left">
                        <h5 className="menu-adv-title">Our Courses</h5>
                        <ul>
                          <li>
                            <Link to="/courses">Courses </Link>
                          </li>
                          <li>
                            <Link to="/membership">Membership</Link>
                          </li>
                        </ul>
                      </li>
                      <li className="add-menu-right">
                        <img src={adv} alt="" />
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/blog">Blog</Link>
                  </li>
                </ul>
                <div className="nav-social-link">
                  <Link to="#">
                    <i className="fa fa-facebook"></i>
                  </Link>
                  <Link to="#">
                    <i className="fa fa-google-plus"></i>
                  </Link>
                  <Link to="#">
                    <i className="fa fa-linkedin"></i>
                  </Link>
                </div>
              </div>
              {/* <!-- Navigation Menu END ==== --> */}
            </div>
          </div>
        </Sticky>
        {/* <!-- Search Box ==== --> */}
        <div className="nav-search-bar">
          <form action="#">
            <input
              name="search"
              type="text"
              className="form-control"
              placeholder="Type to search"
            />
            <span>
              <i className="ti-search"></i>
            </span>
          </form>
          <span id="search-remove">
            <i className="ti-close"></i>
          </span>
        </div>
      </header>
    </>
  );
}

export default Header;
