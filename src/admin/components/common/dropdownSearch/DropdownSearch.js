import React, { useEffect } from "react";
import {
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
} from "@coreui/react";
import { CFormSelect } from "@coreui/react";
import { setValueFilter } from "../../../../redux/reducers/user";
import { useDispatch, useSelector } from "react-redux";

function DropdownSearch() {
  useEffect(() => {
    dispatch(setValueFilter("all"));
  }, []);
  const dispatch = useDispatch();
  const valueFilter = useSelector((state) => state.userReducers);
  return (
    <div>
      <CFormSelect
        aria-label="Default select example"
        onChange={(e) => {
          dispatch(setValueFilter(e.target.value));
        }}
      >
        <option>All</option>
        <option value="1">User</option>
        <option value="2">Fullname</option>
        <option value="3">Phone</option>
      </CFormSelect>
    </div>
  );
}

export default DropdownSearch;
