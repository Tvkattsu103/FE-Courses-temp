import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

// Elements
import BackToTop from "./elements/back-top";
import PageScrollTop from "./elements/page-scroll-top";

// Home Pages
import Index2 from "./pages/index-2";

// About Us
import About2 from "./pages/about-2";

// Events
import Events from "./pages/event";
import EventsDetails from "./pages/events-details";

// Faq
import Faq2 from "./pages/faq-2";

// Other Pages
import Portfolio from "./pages/portfolio";
import Profile from "./pages/profile";
import Membership from "./pages/membership";
import Error404 from "./pages/error-404";
import Register from "./pages/register";
import Login from "./pages/login";
import ForgetPassword from "./pages/forget-password";

// Courses
import Courses from "./pages/courses";
import CoursesDetails from "./pages/courses-details";

// Blog Pages
import BlogClassicSidebar from "./pages/blog-classic-sidebar";
import BlogDetails from "./pages/blog-details";

// Contact Us
import Contact1 from "./pages/contact-1";

import ForgetPasswordInput from "./pages/forget-password-input";

import Users from "../admin/views/users/Users";
import Dashboard from "../admin/views/dashboard/Dashboard";
import UserDetail from "../admin/views/users/UserDetail";
import DefaultLayout from "../admin/layout/DefaultLayout";
import Cookies from "js-cookie";
import Error401 from "./pages/error-401";
import Contact from "../admin/views/contact/contact";
import ContactDetail from "../admin/views/contact/contact-detail";
import Subjects from "../admin/views/subjects/subjects";
import { useState } from "react";
import SubjectDetail from "../admin/views/subjects/subject-detail";
import Class from "../admin/views/class/class";
import ClassDetail from "../admin/views/class/class-detail";
import Posts from "../admin/views/posts/Posts";
import PostDetail from "../admin/views/posts/PostDetail";
import Sliders from "../admin/views/sliders/Sliders";
import SliderDetail from './../admin/views/sliders/SliderDetail';

class Markup extends Component {
    render() {
        return (
            <>
                <BrowserRouter basename={"/react/"}>
                    <Switch>
                        {/* Home Pages */}
                        <Route path="/" exact component={Index2} />

                        {/* About Us */}
                        <Route path="/about" exact component={About2} />

                        {/* Events */}
                        <Route path="/events" exact component={Events} />
                        <Route
                            path="/events-details"
                            exact
                            component={EventsDetails}
                        />

                        {/* Faq */}
                        <Route path="/faq" exact component={Faq2} />

                        {/* Other Pages */}
                        <Route path="/portfolio" exact component={Portfolio} />
                        <Route path="/profile" exact component={Profile} />
                        <Route
                            path="/membership"
                            exact
                            component={Membership}
                        />
                        <Route path="/error-404" exact component={Error404} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/login" exact component={Login} />
                        <Route
                            path="/forget-password"
                            exact
                            component={ForgetPassword}
                        />
                        <Route
                            path="/reset-password/:token"
                            exact
                            component={ForgetPasswordInput}
                        />
                        <Route path="/profile" exact component={Profile} />

                        {/* Courses */}
                        <Route path="/courses" exact component={Courses} />
                        <Route
                            path="/courses-details"
                            exact
                            component={CoursesDetails}
                        />

                        {/* Blog Pages */}
                        <Route
                            path="/blog"
                            exact
                            component={BlogClassicSidebar}
                        />
                        <Route
                            path="/blog/:id"
                            exact
                            component={BlogDetails}
                        />

                        {/* Contact Us */}
                        <Route path="/contact-us" exact component={Contact1} />

                        {/* admin  */}
                        <PrivateRoute path="/admin/dashboard" exact>
                            <Dashboard />
                        </PrivateRoute>
                        <PrivateRoute path="/admin/users" exact>
                            <Users />
                        </PrivateRoute>
                        <PrivateRoute path="/admin/users/:username" exact>
                            <UserDetail />
                        </PrivateRoute>
                        <PrivateRoute path="/admin/contact" exact>
                            <Contact />
                        </PrivateRoute>
                        <PrivateRoute path="/admin/contact/:username" exact>
                            <ContactDetail />
                        </PrivateRoute>
                        <PrivateRoute path="/admin/subjects" exact>
                            <Subjects />
                        </PrivateRoute>
                        <PrivateRoute path="/admin/subjects/:id" exact>
                            <SubjectDetail />
                        </PrivateRoute>
                        <PrivateRoute path="/admin/class" exact>
                            <Class />
                        </PrivateRoute>
                        <PrivateRoute path="/admin/class/:id" exact>
                            <ClassDetail />
                        </PrivateRoute>
                        <PrivateRoute path="/admin/posts" exact>
                            <Posts />
                        </PrivateRoute>
                        <PrivateRoute path="/admin/posts/create" exact>
                            <PostDetail />
                        </PrivateRoute>
                        <PrivateRoute path="/admin/posts/:id" exact>
                            <PostDetail />
                        </PrivateRoute>
                        <PrivateRoute path="/admin/sliders" exact>
                            <Sliders />
                        </PrivateRoute>
                        <PrivateRoute path="/admin/sliders/create" exact>
                            <SliderDetail />
                        </PrivateRoute>
                        <PrivateRoute path="/admin/sliders/:id" exact>
                            <SliderDetail />
                        </PrivateRoute>

                        <Route path="/error-401" exact component={Error401} />
                    </Switch>

                    <PageScrollTop />
                </BrowserRouter>

                <BackToTop />
            </>
        );
    }
}

function PrivateRoute({ children, ...rest }) {
    let isAuthenticated = false;
    if (Cookies.get("roles") === "ROLE_ADMIN") isAuthenticated = true;
    else {
        if (
            rest?.path?.includes("contact") &&
            Cookies.get("roles") === "ROLE_SUPPORTER"
        )
            isAuthenticated = true;
        else if (
            rest?.path?.includes("subjects") &&
            Cookies.get("roles") === "ROLE_MANAGER"
        )
            isAuthenticated = true;
        else if (
            rest?.path?.includes("class") &&
            (Cookies.get("roles") === "ROLE_MANAGER" ||
                Cookies.get("roles") === "ROLE_TRAINER")
        )
            isAuthenticated = true;
    }
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/error-401",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}

export default Markup;
