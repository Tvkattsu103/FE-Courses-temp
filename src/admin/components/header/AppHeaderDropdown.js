import React, { useState } from "react";
import {
    CAvatar,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from "@coreui/react";

import avatarProfile from '../../../images/icon/avatar.svg'
import Cookies from "js-cookie";
import { Link, useHistory } from 'react-router-dom';

const AppHeaderDropdown = () => {
    const [id, setId] = useState(Cookies.get("id"));
    const user = JSON.parse(Cookies.get("user"));
    const history = useHistory();

    const handleLogout = () => {
        Cookies.remove("id");
        Cookies.remove("username");
        Cookies.remove("access_token");
        Cookies.remove("roles");
        Cookies.remove("user");
        setId(undefined);
        history.push("/");
    }

    return (
        <CDropdown variant="nav-item">
            <CDropdownToggle
                placement="bottom-end"
                className="py-0"
                caret={false}
            >
                <CAvatar src={
                    user?.avatar ?
                        user?.avatar.substr("http://localhost:8080/api/account/downloadFile/".length) !== "null"
                            ? user?.avatar
                            : avatarProfile : avatarProfile}
                    size="md"
                />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end" >
                <CDropdownItem>
                    <Link to="/">
                        <li>
                            Home
                        </li>
                    </Link>
                </CDropdownItem>
                <CDropdownItem>
                    <Link to="/profile">User Profile</Link>
                </CDropdownItem>
                <CDropdownItem>
                    <Link to="/profile">Change Password</Link>
                </CDropdownItem>
                <CDropdownItem onClick={handleLogout} style={{ cursor: 'pointer  ' }}>
                    Logout
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    );
};

export default AppHeaderDropdown;
