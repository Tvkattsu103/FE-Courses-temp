import React, { Component } from "react";
import { Link } from "react-router-dom";
import Sticky from "react-stickynode";

// Images
import logo from "../../../images/logo.png";
import adv from "../../../images/adv/adv.jpg";
import Cookies from "js-cookie";
import { CAvatar } from "@coreui/react";
import avatar1 from "../../../admin/assets/images/avatars/1.jpg";
import avatarProfile from '../../../images/icon/avatar.svg'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: Cookies.get("id"),
      user: Cookies.get("user"),
      role: Cookies.get("roles"),
      isExpand: false,
      acceptRole: ["ROLE_ADMIN", "ROLE_SUPPORTER", "ROLE_MANAGER"],
    };
  }
  componentDidMount() {
    // Search Form Popup
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
    if (this.state.user !== undefined) {
      this.setState({ user: JSON.parse(this.state.user) });
    }
    console.log(this.state.user);
  }

  handleLogout() {
    Cookies.remove("id");
    Cookies.remove("username");
    Cookies.remove("access_token");
    Cookies.remove("roles");
    Cookies.remove("user");
    this.setState({
      id: undefined,
    });
  }

  render() {
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
                    {this.state.id ? (
                      <li className="is-logged-in">
                        <div
                          onClick={() =>
                            this.setState({
                              isExpand: !this.state.isExpand,
                            })
                          }
                          className="mb-0"
                        >
                          <CAvatar src={this.state.user?.avatar || avatarProfile} />
                        </div>
                        <ul
                          className="sub-menu"
                          style={
                            this.state.isExpand
                              ? {
                                  visibility: "visible",
                                  opacity: "1",
                                  width:'200px'
                                }
                              : {
                                  visibility: "hidden",
                                  opacity: "0",
                                }
                          }
                        >
                          {this.state.role === "ROLE_ADMIN" ? (
                            <li>
                              <Link to="/admin/dashboard">Dashboard</Link>
                            </li>
                          ) : this.state.role === "ROLE_SUPPORTER" ? (
                            <li>
                              <Link to="/admin/contact">Admin</Link>
                            </li>
                          ) : this.state.role === "ROLE_MANAGER" ? (
                            <li>
                              <Link to="/admin/subjects">Admin</Link>
                            </li>
                          ) : (
                            ""
                          )}
                          <li>
                            <Link to="/profile">User Profile</Link>
                          </li>
                          <li>
                            <Link to="/profile">Change Password</Link>
                          </li>
                          <li onClick={this.handleLogout.bind(this)}>Logout</li>
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
}

export default Header;
