import React from "react";
import CIcon from "@coreui/icons-react";
import { cilContact, cilGrid, cilSpeedometer, cilTextSquare, cilUser, cilViewColumn } from "@coreui/icons";
import { CNavItem } from "@coreui/react";

const _nav = [
    {
        component: CNavItem,
        name: "Dashboard",
        to: "/admin/dashboard",
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        badge: {
            color: "info",
            text: "NEW",
        },
    },
    {
        component: CNavItem,
        name: "Users",
        to: "/admin/users",
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: "Contact",
        to: "/admin/contact",
        icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: "Subjects",
        to: "/admin/subjects",
        icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: "Class",
        to: "/admin/class",
        icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: "Posts",
        to: "/admin/posts",
        icon: <CIcon icon={cilTextSquare} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: "Sliders",
        to: "/admin/sliders",
        icon: <CIcon icon={cilViewColumn} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: "Products",
        to: "/admin/products",
        icon: <CIcon icon={cilGrid} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: "Combo",
        to: "/admin/combo",
        icon: <CIcon icon={cilGrid} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: "Setting",
        to: "/admin/settings",
        icon: <CIcon icon={cilGrid} customClassName="nav-icon" />,
    },
];

export default _nav;
